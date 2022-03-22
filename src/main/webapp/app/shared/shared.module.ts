import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import {DataViewModule} from 'primeng/dataview';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ChartModule} from 'primeng/chart';
import {DynamicDialogModule} from 'primeng/dynamicdialog';



@NgModule({
  imports: [SharedLibsModule,CardModule,ButtonModule, SidebarModule, DataViewModule, VirtualScrollerModule, CheckboxModule, ChipsModule, 
    ClipboardModule, MessagesModule, MessageModule, RadioButtonModule, BreadcrumbModule, ChartModule, DynamicDialogModule ],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    CardModule,
    ButtonModule,
    SidebarModule,
    DataViewModule,
    VirtualScrollerModule,
    CheckboxModule,
    ChipsModule,
    ClipboardModule,
    MessagesModule, 
    MessageModule,
    RadioButtonModule,
    BreadcrumbModule,
    ChartModule,
    DynamicDialogModule
  ],
})
export class SharedModule {}
