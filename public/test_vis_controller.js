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

import React, { Component } from 'react';

import { TestVisValue } from './components/test_vis_value';

export class TestVisComponent extends Component {


  getRoles() {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://dev.webitel.com/api/roles');
      xhr.setRequestHeader('X-Webitel-Access', 'USER_TOKEN');
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        }
      };
      xhr.send();
    });
  }

  state = {
    roles: [],
  };


  render() {
    const rolesList = this.state.roles.map((role, index) => {
      return (
        <TestVisValue
          key={index}
          role={role.role}
        />
      );
    });

    rolesList.length = this.props.vis.params.length;
    return (
      <div className="mtrVis">
        <h1>test vis</h1>
        <div>
          {!this.props.vis.params.hideMe ? rolesList : 'null'}
        </div>
      </div>

    );
  }

  componentDidMount() {
    this.getRoles().then(response => {
      this.setState({ roles: JSON.parse(response).results });
    });
    this.props.renderComplete();
  }
  componentDidUpdate() {
    this.props.renderComplete();
  }
}
