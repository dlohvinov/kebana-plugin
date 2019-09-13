/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import './test_vis_params';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { TestVisComponent } from './test_vis_controller';
import  TestVisParamsHTML  from './test_vis_params.html';

// we also need to load the controller and used by the template

const TestVisProvider = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.

  return VisFactory.createReactVisualization({
    name: 'my_test_vis',
    title: 'my_test_vis',
    icon: 'visMetric',
    description: 'Кул нью чарт',
    visConfig: {
      defaults: {
        hideMe: false,
        length: 10
      },
      component: TestVisComponent,
    },
    requiresSearch: false,
    requestHandler: 'none',
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
    },
    editorConfig: {
      // optionsTemplate: '<test-vis-params></test-vis-params>',
      optionsTemplate: TestVisParamsHTML,
    },
  });
};

// export the provider so that the visType can be required with Private()
export default TestVisProvider;

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(TestVisProvider);
