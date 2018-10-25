/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LogsFilterActions, ActionTypes } from '@app/store/actions/logs-filter.actions';

import { LogsType } from '@app/classes/string';

export interface LogsFilter {
  [key: string]: any;
}

interface Logs {
  serviceLogs?: any;
  auditLogs?: any;
}

export enum LogsFilterChangeSources {
  FORM = 'form',
  URL = 'url'
}

export interface LogsFilterChange {
  source: LogsFilterChangeSources;
  type: LogsType;
  filter: LogsFilter;
}

export interface State {
  [key: string]: {
    source?: LogsFilterChangeSources,
    filter: any
  };
}

export const initialState: State = {
  serviceLogs: {
    filter: {
      timeRangeType: 'LAST',
      timeRangeUnit: 'h',
      timeRangeInterval: '1',
      sortingKey: 'logtime',
      sortingType: 'desc',
      pageSize: '100',
      page: '0'
    }
  },
  auditLogs: {
    filter: {
      timeRangeType: 'LAST',
      timeRangeUnit: 'h',
      timeRangeInterval: '1',
      sortingKey: 'evtTime',
      sortingType: 'desc',
      pageSize: '100',
      page: '0'
    }
  }
};

export function reducer(state = initialState, action: LogsFilterActions): State {
  switch (action.type) {
    case ActionTypes.SET : {
      const payload = action.payload;
      const { type, ...change } = payload;
      if (payload.type !== undefined) {
        return {
          ...state,
          [payload.type]: change
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
