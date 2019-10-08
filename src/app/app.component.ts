import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '../shared/app-component-base';

import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {
  title =  'angular-zero';
  private viewContainerRef: ViewContainerRef;

  constructor(
      injector: Injector
  ) {
      super(injector);
  }

  ngOnInit(): void {

      SignalRAspNetCoreHelper.initSignalR();

      abp.event.on('abp.notifications.received', userNotification => {
          abp.notifications.showUiNotifyForUserNotification(userNotification);

          // Desktop notification
          Push.create('AbpZeroTemplate', {
              body: userNotification.notification.data.message,
              icon: abp.appPath + 'assets/app-logo-small.png',
              timeout: 6000,
              // tslint:disable-next-line:object-literal-shorthand
              onClick: function() {
                  window.focus();
                  this.close();
              }
          });
      });
  }

  ngAfterViewInit(): void {
      $.AdminBSB.activateAll();
      $.AdminBSB.activateDemo();
  }

  onResize(event) {
      // exported from $.AdminBSB.activateAll
      $.AdminBSB.leftSideBar.setMenuHeight();
      $.AdminBSB.leftSideBar.checkStatuForResize(false);

      // exported from $.AdminBSB.activateDemo
      $.AdminBSB.demo.setSkinListHeightAndScroll();
      $.AdminBSB.demo.setSettingListHeightAndScroll();
  }
}
