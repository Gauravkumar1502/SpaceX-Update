import { Component, input } from '@angular/core';
import { Launch } from '../../models/Launch';
import { SpacexService } from '../../services/spacex.service';
import { Launchpad } from '../../models/Launchpad';
import { Rocket } from '../../models/Rocket';

export interface RadditLinks {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private readonly spacexService: SpacexService) {}

  launchData = input.required<Launch>();
  launchpadData: Launchpad | null = null;
  rocketData: Rocket | null = null;

  ngOnChanges() {
    if (this.launchData().launchpad) {
      this.getLaunchpadDetails(this.launchData().launchpad);
    }
    if (this.launchData().rocket) {
      this.getRocketDetails(this.launchData().rocket);
    }
  }

  getLaunchpadDetails(id: string) {
    this.spacexService.getLaunchpad(id).subscribe((launchpad) => {
      this.launchpadData = launchpad;
    });
  }

  getRocketDetails(id: string) {
    this.spacexService.getRocket(id).subscribe((rocket) => {
      this.rocketData = rocket;
    });
  }

  getKeys(obj: RadditLinks) {
    return Object.keys(obj);
  }
}
