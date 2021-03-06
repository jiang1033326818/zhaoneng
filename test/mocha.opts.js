import React from 'react';
import ReactDOM from 'react-dom';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { expect } from 'chai';
import sinon from 'sinon';

import 'jsdom-global/register';
//require('jsdom-global')();

global.React = React;
global.ReactDOM = ReactDOM;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;