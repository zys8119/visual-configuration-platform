import VueRouter from "vue-router"
import Vue from "vue"
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:"*",
            redirect:"/"
        },
        {
            path:"/",
            component:()=>import("@/components/view/Home/Home")
        },
        {
            path:"/home",
            component:()=>import("@/components/view/Home/HomePage"),
            redirect:"/home/module-management",
            children:[
                {
                    path:"module-management",
                    component:()=>import("@/components/view/Home/ModuleManagement"),
                },
                {
                    path:"template-management",
                    component:()=>import("@/components/view/Home/TemplateManagement"),
                }
            ]
        }
    ]
})