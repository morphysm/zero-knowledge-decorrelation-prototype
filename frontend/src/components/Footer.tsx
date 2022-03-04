

interface IFooterProps {
    // any props that come into the component
}

export const Footer: React.FC<IFooterProps> = (props) => (
    <footer className="page-footer font-small bg-dark pt-4" style={{position: 'sticky', bottom: 0}}>
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                    <h5 className="text-uppercase text-light">Zeko</h5>
                </div>
                <hr className="clearfix w-100 d-md-none pb-0" />
                <div className="col-md-3 mb-md-0 mb-3">
                    <img src={'discordfooter.png'} style={{width: 50, height: 35}}></img> {/* arbitrary styling */}
                    <img src={'twitter.png'} style={{width: 50, height: 35}}></img> {/* arbitrary styling */}
                </div>
            </div>
        </div>
        <div className="footer-copyright text-center py-3 text-light">© 2022 Zeko ZK Badges. All rights reserved</div>
    </footer>
)