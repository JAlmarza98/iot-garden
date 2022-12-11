import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { menuOptions } from './side-menu-options';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit{
  @ViewChild('toolbar') toolbar!: MatToolbar;
  @ViewChild(MatSidenav)sidenav!: MatSidenav;
  @ViewChild('sidenavContent')sidenavContent!: ElementRef;

  toolbarHeight!: number;
  contentHeight!: number;
  showFiller = false;
  menuOptions = menuOptions

  constructor(private observer: BreakpointObserver, private router: Router) {}

  async ngAfterViewInit() {
    const element = this.sidenavContent.nativeElement;
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          element.style.marginLeft = '16px'
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          element.style.marginLeft = '32px'
        }
        this.toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;
        this.contentHeight = this.toolbarHeight + 32
      });

    this.router.events
    .pipe(
      untilDestroyed(this),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
  }
}
