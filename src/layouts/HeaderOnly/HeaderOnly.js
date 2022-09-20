import Header from "~/layouts/components/Header"

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default HeaderOnly;