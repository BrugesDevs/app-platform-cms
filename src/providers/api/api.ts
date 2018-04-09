export * from './newsItemController.service';
import { NewsItemControllerService } from './newsItemController.service';
export * from './playerController.service';
import { PlayerControllerService } from './playerController.service';
export * from './teamController.service';
import { TeamControllerService } from './teamController.service';
export const APIS = [NewsItemControllerService, PlayerControllerService, TeamControllerService];
