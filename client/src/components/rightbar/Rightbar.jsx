import './rightbar.css';
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>King Dragonis</b> and <b>5 others</b> have a birthday today
                    </span>
                </div>
                <img
                    className="rightbarAd"
                    src= { PF + "/assets/ESO_Dragonhold.jpg" }
                    alt=""
                />
                <h4 className="rightbarTitle">Online friends</h4>
                <ul className="rightbarFriendList">
                    { Users.map((u) => (
                        <Online key={ u.id } user={ u } />
                    ))}
                </ul>
            </>
        );
    }

    const ProfileRightbar  = () => {
        return (
            <>
                <h4 className="rightbarTitle">User info</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Bangalore</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Los Angeles</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Occupation:</span>
                        <span className="rightbarInfoValue">Web Developer</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">King Dragonis</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Vineeth</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Vulnahkriin</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Vins</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Vineeth B V</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Drago</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={ PF + "person/dp.jpg" }
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Tom Cruise</span>
                    </div>
                    <h4 className="rightbarAdTitle">Advertisement</h4>
                    <img
                        className="rightbarAd"
                        src={ PF +"ESO_Dragonhold.jpg" }
                        alt=""
                    />
                </div>
            </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                { profile ? <ProfileRightbar /> : <HomeRightbar /> }
            </div>
        </div>
    );
}