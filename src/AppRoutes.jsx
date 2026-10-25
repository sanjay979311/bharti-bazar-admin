


import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "./features/auth/authApiSlice"; // Adjust path
import { selectIsInitialized } from "./features/auth/authSlice"; // Adjust path

// Layouts & Auth
import DashboardLayout from "./components/dashboard/dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

// Auth & Public Pages
// import Login from "./pages/auth/Login";
import Login from "./features/auth/LoginPage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Dashboard Core Components
import Summery from "./components/dashboard/summery";


import CountryList from './features/location/country';
import AddCountry from './features/location/country/AddCountry';
import EditCountry from './features/location/country/EditCountry';


import StateList from './features/location/state';
import AddStats from './features/location/state/AddState';
import EditState from './features/location/state/EditState';



// City
import CityList from './features/location/city';
import AddCity from './features/location/city/AddCity';
import EditCity from './features/location/city/EditCity';

// Area
import AreaList from './features/location/area';
import AddArea from './features/location/area/AddArea';
import EditArea from './features/location/area/EditArea';

// Category Module (Following your requested flat naming)

import CategoryList from './features/category';
import AddCategory from './features/category/AddCategory';
import EditCategory from './features/category/EditCategory';

import UnitList from './features/unit';
import AddUnit from './features/unit/Add';
import EditUnit from './features/unit/Edit';

import KeywordTagList from './features/keyword-tag';
import AddKeywordTag from './features/keyword-tag/Add';
import EditKeywordTag from './features/keyword-tag/Edit';





import PricingList from './features/pricing';
import AddPricing from './features/pricing/AddPricing';
import EditPricing from './features/pricing/EditPricing';


import ProductList from './features/product';
import AddProduct from './features/product/AddProduct';
import EditProduct from './features/product/EditProduct';




import UserList from './components/dashboard/user/List';
import AddUser from './components/dashboard//user/Add';
import EditUser from './components/dashboard/user/Edit'

import TeacherList from './components/dashboard/teacher/TeacherList';
import DepartmentList from './components/dashboard/teacher/DepartmentList';
import Loader from './components/ui/Loader'


const AppRoutes = () => {

  const { isLoading, isError, isSuccess } = useGetMeQuery();
  const isInitialized = useSelector(selectIsInitialized);

  // 2. Critical: Show a loading screen while verifying the cookie.
  // This prevents the "flash" of the login page and the stuck state.
  if (isLoading || !isInitialized) {
    return (
      <Loader />
    );
  }

  return (
    <Routes>
      {/* <Route element={<PersistLogin />}> */}

      {/* 1. Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 2. Protected Admin Dashboard */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Default Summary View */}
          <Route index element={<Summery />} />
          {/* Country */}
          <Route path="countries">
            <Route index element={<CountryList />} />
            <Route path="add" element={<AddCountry />} />
            <Route path="edit/:id" element={<EditCountry />} />
          </Route>

          {/* State */}
          <Route path="states">
            <Route index element={<StateList />} />
            <Route path="add" element={<AddStats />} />
            <Route path="edit/:id" element={<EditState />} />
          </Route>

          {/* City */}
          <Route path="cities">
            <Route index element={<CityList />} />
            <Route path="add" element={<AddCity />} />
            <Route path="edit/:id" element={<EditCity />} />
          </Route>

          {/* Area */}
          <Route path="areas">
            <Route index element={<AreaList />} />
            <Route path="add" element={<AddArea />} />
            <Route path="edit/:id" element={<EditArea />} />
          </Route>

          {/* Category Management - Flat Structure */}
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
         
           <Route path="units">
            <Route index element={<UnitList />} />
            <Route path="add" element={<AddUnit />} />
            <Route path="edit/:id" element={<EditUnit />} />
          </Route>

           <Route path="keyword-tags">
            <Route index element={<KeywordTagList />} />
            <Route path="add" element={<AddKeywordTag />} />
            <Route path="edit/:id" element={<EditKeywordTag />} />
          </Route>
          

           

          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          {/* Pricing Management */}
          <Route path="pricing">
            <Route index element={<PricingList />} />
            <Route path="add" element={<AddPricing />} />
            <Route path="edit/:id" element={<EditPricing />} />
          </Route>

          <Route path="user-list" element={<UserList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="edit-user/:id" element={<EditUser />} />

        

          <Route path="teacher-list" element={<TeacherList />} />
          <Route path="departments" element={<DepartmentList />} />

        </Route>
      </Route>
      {/* </Route> */}

      {/* 3. Global Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

