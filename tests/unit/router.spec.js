import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
const App = {
  render() {
    return (
      <div id="app">
        <h1>Hello App!</h1>
        <p>
          <router-link to="/foo">Go to Foo</router-link>
          <router-link to="/bar">Go to Bar</router-link>
        </p>
        <router-view></router-view>
      </div>
    );
  },
};
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];

describe("App", () => {
  it("with-router", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter({
      routes,
    });
    const wrapper = shallowMount(App, {
      localVue,
      router,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
