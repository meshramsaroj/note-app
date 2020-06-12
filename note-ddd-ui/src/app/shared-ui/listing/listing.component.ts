import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ListingDataSource } from './listing-datasource';
import { ListingService } from './listing.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: ListingDataSource;
  noteUuid;
  displayedColumns = ['uuid', 'title', 'message'];
  model: string;
  search: string = '';

  constructor(
    private listingService: ListingService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.router.events
      .pipe(filter(route => route instanceof NavigationEnd))
      .subscribe((route: NavigationEnd) => {
        // https://[url]/list/[model]
        this.model = route.url.split('/')[2];
      });
  }

  ngOnInit() {
    this.dataSource = new ListingDataSource(this.model, this.listingService);
    this.dataSource.loadItems();
  }

  getUpdate(event) {
    this.dataSource.loadItems(
      this.search,
      this.sort.direction,
      event.pageIndex,
      event.pageSize,
    );
  }

  deleteNote(uuid) {
    this.listingService.delete(uuid).subscribe({
      next: success => {
        this.ngOnInit();
        this.snackBar.open('Note Deleted', 'Close', { duration: 2000 });
      },
      error: error => {},
    });
  }

  proposeNote(uuid) {
    this.snackBar.open('Note Not Proposed', 'Close', { duration: 2000 });

    this.router.navigateByUrl('/note/' + uuid);
  }

  setFilter() {
    this.dataSource.loadItems(
      this.search,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  snakeToTitleCase(string: string) {
    if (!string) return;

    return string
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
