//const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://mezbaanb.onrender.com"
export default{
    ADMIN_SIGNIN :BACKEND_URL+ '/admin/signin',
    RESTAURANT_LIST : BACKEND_URL+'/restaurant/list',
    REQRESTORENT_LIST :BACKEND_URL+'/restaurant/requested-restaurant',
    Plans_Lists : BACKEND_URL+'/plan/plans-list',
    SAVE_PLAN: BACKEND_URL+'/plan/save',
    UPDATE_PLAN :BACKEND_URL+ '/plan/update',
    REMOVE_PLAN :BACKEND_URL+'/plan//remove',
    RESTAURANT_COUNT : BACKEND_URL+'/restaurant/count',
    CUSTOMER_COUNT : BACKEND_URL+'/customer/customer-count',
    SEACRH_RESTAURANT:BACKEND_URL+"/restaurant/search",
    UPDATE_EMAIL : BACKEND_URL+"/admin/editprofile",
    VERIFY_PASSWORD : BACKEND_URL+"/admin/verify-pass",
    UPDATE_PASSWORD : BACKEND_URL+"/admin/changepass",
    SEND_OTP : BACKEND_URL+"/admin/send-otp",
    VIEW_PROFILE : BACKEND_URL+"/admin/profile",
    MONTHLY_PROFILE : BACKEND_URL+"/booking/profit-monthly",
    ACTIVE_RESTAURANT : BACKEND_URL+"/restaurant/active/"
}
