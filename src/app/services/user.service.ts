import { Injectable } from "@angular/core";
import { RoutingConstants } from "../constants/routing.constants";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isLoginScreen() : boolean {
        return ['/' + RoutingConstants.login, '/' + RoutingConstants.signUp].includes(window.location.pathname);
    }
}