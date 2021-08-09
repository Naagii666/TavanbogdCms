import { useState, createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import jwt_decode from 'jwt-decode';
import Auth from '@utils/auth';
import { useRouter } from "next/router";
import { apiList, sList } from "@api/api";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);
  const initialState = { auth: {}, menus: [], permissions: {} };
  const [state, dispatch] = useReducer(reducers, initialState);
  const router = useRouter();

  const checkPermission = (permission) => {
    // return state.permissions[permission] ? true : false;
    return false;
  }

  const setMenuAndPermissions = async () => {
    //#region set permission
    const accessToken = Auth.getToken();
    // let role = "admin";
    let role = "visitor";
    let permissionList = {};
    if (router.pathname.startsWith("/admin")) {
      if (accessToken == null || accessToken == 'undefined') {
        router.push('/login');
        return;
      }else{
        const user = jwt_decode(accessToken);
        
        if (user.authorities !== undefined) {
          user.authorities.map((auths) => {
            permissionList[auths] = auths;
          });
        }
      }
    }
    
    dispatch({
      type: 'PERMISSIONS',
      payload: permissionList
    });
    //#endregion

    //#region set menu
    let menuData = [];
    const data = await sList({ code: apiList.adminMenu });
    if (data && data.data) {
      const tmpMenus = data.data.sort((a, b) => {
        return a.order - b.order;
      });

      let menus = {};
      tmpMenus.map((mnu) => {
        const parentId = mnu.parentId;
        if (parentId !== null) {
          if (menus[parentId]['children'] === undefined) {
            menus[parentId]['children'] = [];
            delete menus[parentId]['link'];
          }
          menus[parentId]['children'].push(mnu);
        } else {
          menus[mnu.id] = mnu;
        }
      });

      menuData = Object.values(menus).sort((a, b) => {
        return a.order - b.order;
      });
    }

    dispatch({
      type: 'MENUS',
      payload: menuData
    });
    //#endregion
  };

  useEffect(() => {
    setMenuAndPermissions();
  }, []);

  return (
    <Context.Provider
      value={{
        menuOpenKeys,
        setMenuOpenKeys,
        isLoading,
        setIsLoading,
        state,
        dispatch,
        setMenuAndPermissions,
        checkPermission
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
