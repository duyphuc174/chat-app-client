import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_model/auth.model';
import { FriendModel } from 'src/app/pages/friends/_models/friend.model';
import { FriendService } from 'src/app/pages/friends/_services/friend.service';
import { ChatService } from '../../_services/chat.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConversationModel } from '../../_models/chat.model';

@Component({
    selector: 'app-chat-conversation-create',
    templateUrl: './chat-conversation-create.component.html',
    styleUrls: ['./chat-conversation-create.component.scss'],
})
export class ChatConversationCreateComponent implements OnInit {
    @Input() conversation: ConversationModel;
    friendsList: { friend: FriendModel; choosen: boolean }[] = [];
    friendsShow: { friend: FriendModel; choosen: boolean }[] = [];
    friendChoosen: FriendModel[];
    imgPreview: string = '';
    imageFile: File;
    form: UntypedFormGroup;
    isAddMember: boolean = false;

    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    constructor(
        private friendService: FriendService,
        private fb: UntypedFormBuilder,
        private chatService: ChatService,
        public bsModalRef: BsModalRef,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadData();
    }

    loadData() {
        // if (this.conversation.id) {
        //     this.form.controls['name'].patchValue(this.conversation.name);
        //     this.imgPreview = this.conversation.image;
        //     this.isAddMember = true;
        // }
        this.isLoadingSubject.next(true);
        this.friendService.getFriends().subscribe((res) => {
            if (res) {
                this.friendsList = this.friendService.friendsList.map((friend) => {
                    return {
                        friend: friend,
                        choosen: false,
                    };
                });
                this.friendsShow = this.friendsList;
                this.isLoadingSubject.next(false);
            }
        });
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
        });
    }

    submit() {
        if (this.isAddMember) {
            let users = this.friendChoosen.map((item) => {
                if (item) {
                    return item.user.id;
                }
            });
            users = users.filter((u) => u !== undefined);
            this.chatService.addMember(this.conversation.id, { users: users }).subscribe((res) => {
                window.location.reload();
            });
        } else {
            const name = this.form.value.name;
            const users = this.friendChoosen.map((item) => item.user.id);
            const formData = new FormData();
            if (this.imageFile) {
                formData.append('file[]', this.imageFile);
            }
            formData.append('name', name);
            formData.append('type', 'group');
            formData.append('status', 'texted');

            for (let i = 0; i < users.length; i++) {
                formData.append(`users[]`, users[i].toString());
            }
            // formData.append('users[]', JSON.stringify(users));

            this.chatService.createConversation(formData).subscribe((res) => {
                this.bsModalRef?.hide();
                window.location.reload();
            });
        }
    }

    selectUser(friend: FriendModel) {
        const index = this.friendsList.findIndex((item) => item.friend === friend);
        this.friendsList[index].choosen = !this.friendsList[index].choosen;
        this.friendsShow = this.friendsList;
        this.friendChoosen = this.friendsList.map((item) => {
            if (item.choosen) {
                return item.friend;
            }
        });
    }

    removeUser(friend: FriendModel) {
        const index = this.friendsList.findIndex((item) => item.friend === friend);
        this.friendsList[index].choosen = false;
        this.friendsShow = this.friendsList;
        this.friendChoosen = this.friendsList.map((item) => {
            if (item.choosen) {
                return item.friend;
            }
        });
    }

    searchUsers(name: string) {
        this.friendsShow = this.friendsList.filter((item) => {
            return item.friend.user.name.toLowerCase().includes(name);
        });
    }

    readURL(event: Event | any) {
        if (event.target.files && event.target.files[0]) {
            this.imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => (this.imgPreview = reader.result as string);
            reader.readAsDataURL(this.imageFile);
        }
    }
}
