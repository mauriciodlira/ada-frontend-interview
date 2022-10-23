import { InjectionToken } from '@angular/core';

/** API URL injection token */
export const BASE_URL = new InjectionToken<BaseURL>('/api', { factory: () => '/api' });
/** API URL type alias */
export type BaseURL = string;

