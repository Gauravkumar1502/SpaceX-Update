import { Component, signal, WritableSignal } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { SpacexService } from './services/spacex.service';
import { Launch } from './models/Launch';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly spacexService: SpacexService) {}
  title = 'SpaceX-Update! 🚀';
  latestLaunch: WritableSignal<Launch> = signal<Launch>({} as Launch);
  pastLaunches: WritableSignal<Launch[]> = signal<Launch[]>([]);
  counter = signal<number>(0);
  isLoading = signal<boolean>(true);
  isError = signal<boolean>(false);

  ngOnInit() {
    this.getLatestLaunchDetails();
    this.getPastLaunches();
  }

  getLatestLaunchDetails() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.spacexService.getLatestLaunch().subscribe({
      next: (launch) => {
        this.latestLaunch.set(launch);
        this.isLoading.set(false);
      },
      error: () => {
        this.isError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  getPastLaunches() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.spacexService.getLaunches().subscribe({
      next: (launches) => {
        this.pastLaunches.set(launches.filter((launch) => !launch.upcoming));
        this.isLoading.set(false);
      },
      error: () => {
        this.isError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  incrementCounter() {
    this.counter.set((this.counter() + 1) % this.pastLaunches().length);
  }

  decrementCounter() {
    this.counter.set(
      (this.counter() - 1 + this.pastLaunches().length) %
        this.pastLaunches().length
    );
  }
}
