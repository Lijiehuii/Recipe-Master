import {
    Button,
    Icon,
    Tabbar,
    TabbarItem,
    Search,
    Loading,
    PullRefresh,
    Toast,
    Swipe,
    SwipeItem,
    NavBar,
    Empty,
    Dialog,
    Lazyload,
    NoticeBar,
    Skeleton,
    Image as VanImage,
    ShareSheet,
    Popup,
    List,
    Checkbox,
    CheckboxGroup
} from "vant"

const vantComponents = [
    Button,
    Icon,
    Tabbar,
    TabbarItem,
    Search,
    Loading,
    PullRefresh,
    Toast,
    Swipe,
    SwipeItem,
    NavBar,
    Empty,
    Dialog,
    Lazyload,
    NoticeBar,
    Skeleton,
    VanImage,
    ShareSheet,
    Popup,
    List,
    Checkbox,
    CheckboxGroup
]

export default {
    install(Vue) {
        vantComponents.forEach(component => {
            Vue.use(component)
        })
    }
}