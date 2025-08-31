const Footer = () => {
    return (
        <footer className="bg-white border-t-gray-200">
            <div className="mx-auto py-10">
                <p className="text-center text-xs text-black">
                    &copy; {new Date().getFullYear()} StoreName, Inc. All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer;