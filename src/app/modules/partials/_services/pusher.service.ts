import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

const PUSHER_KEY = environment.pusher.key;
const PUSHER_CLUSTER = environment.pusher.cluster;

@Injectable({
    providedIn: 'root',
})
export class PusherService {
    pusher: any;
    channel: any;

    constructor() {}

    setChannel(pusherChannelName: string) {
        this.pusher = new Pusher(PUSHER_KEY, {
            cluster: PUSHER_CLUSTER,
        });
        this.channel = this.pusher.subscribe(pusherChannelName);
    }

    bind(eventName: string, callback: any) {
        this.channel.bind(eventName, callback);
    }
}
