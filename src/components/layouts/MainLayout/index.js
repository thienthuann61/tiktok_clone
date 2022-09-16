import Header from "~/components/layouts/components/Header"
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default MainLayout;