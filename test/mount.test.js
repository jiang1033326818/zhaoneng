/**
 * 在react.test.js中，我们使用了Shallow渲染模式。
 * 这种模式只渲染“一层深”的组件，之后使用断言对虚拟DOM进行测试，由于不渲染自组件，不会被子组件的行为干扰。
 * 这种模式的有点事不生成实际DOM，不要DOM环境，处理速度极快。
 * 当需要测试组件之间的交互时，就需要使用Full DOM Rending模式了。
 *  这里使用sinon库，对componentDidMount的调用进行计数。
 */
import App from '../src/App';

describe('<App />', () => {
    it('App componentDidMount is called with error.', function () {
        sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);
        expect(App.prototype.componentDidMount.callCount).to.be.equal(1);
    });
});