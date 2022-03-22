import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from './appconfig';

@Injectable()
export class AppConfigService {

    
    config: AppConfig = {
        theme: 'lara-light-blue',
        dark: false,
        inputStyle: 'outlined',
        ripple: true
    };

    private configUpdate = new Subject<AppConfig>();

    updateConfig(config: AppConfig):void {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig():AppConfig {
        return this.config;
    }

    getConfigUpdate():Observable<AppConfig>{
        return this.configUpdate.asObservable();
    }
}