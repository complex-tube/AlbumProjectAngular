import { createFeatureSelector} from '@ngrx/store';
import { User } from '../models/user.model';

export namespace UserSelectors {
  export const selectUserState = createFeatureSelector<User>('userState');
}
