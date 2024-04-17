export const auths = {
  "content_category_page": true,
  "content_comment_page": true,
  "content_materialCategory_page": true,
  "content_post_page": true,
  "*": true,
  "home_page": true,
  "log_auth_page": true,
  "log_operation_page": true,
  "setting_common_page": true,
  "setting_function_page": true,
  "setting_mail_page": true,
  "system_department_page": true,
  "system_dict_page": true,
  "system_menu_page": true,
  "system_role_page": true,
  "system_user_page": true,
  "logout": true
}
  export type Auths = typeof auths;
  export type AuthKey = keyof Auths;
