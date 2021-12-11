import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                        <img
                            className="profileCoverImg"
                            src={ PF+"post/Kaalgrontiid_flight.jpg" }
                            alt=""
                        />
                        <img
                            className="profileUserImg"
                            src={ PF+"person/dp.jpg" }
                            alt=""
                        />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Vineeth Dragonis</h4>
                            <span className="profileInfoDesc">Full Stack Developer</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    );
}