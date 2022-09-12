import { InjectionToken } from '@angular/core';
import { InternalValidator } from './validation/models';

export const VALIDATORS = new InjectionToken<Array<Array<InternalValidator>>>('AFF_VALIDATORS');
