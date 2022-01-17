import React, { useState, useRef, useEffect } from 'react'
import disc from '../assets/list-item.png'
import One from '../assets/1.jpg'
import Two from '../assets/2.jpg'
import Three from '../assets/3.jpg'
import Four from '../assets/4.jpg'
import Five from '../assets/5.jpg'
import Six from '../assets/6.jpg'
import Seven from '../assets/7.png'
import Eight from '../assets/8.png'
import Nine from '../assets/9.png'
import Ten from '../assets/10.png'
import axios from 'axios';
import { card } from "../components/CountDown/PicArray/Array"
import handIcon from '../assets/hand.png'
import { contractAddress, abi, tokenAddress, tokenAbi } from '../utils/constant'
import Web3 from 'web3'
import '../styles/Hero.css'
import Slider from "react-slick";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Congratulation from '../assets/image1.png'
import Countdowncome from './CountDown/Countdown'
import './Herostyle.css';


function Hero() {

    let accountAd;
    let [selected, setSelected] = useState(true);
    let [minutes, setMinutes] = useState(0);
    let [secods, setSeconds] = useState(0);
    let [contractStarttime, setContractstartTime] = useState();
    let [timerCalculate, setTimercalcuate] = useState(false);
    const [value, setValue] = useState("")
    const [account, setAccount] = useState("Connect Wallet");
    const [button, setButton] = useState("Bet Now!")
    const [buttonState, setButtonState] = useState(false)
    const [cards, setCards] = useState()
    const [comp, setComp] = useState(true)
    const [cardData, setCardData] = useState()
    const [withDraw, setWithDraw] = useState("Withdraw")
    const [mybalance, setMybalance] = useState("")
    const [cardList, setCardList] = useState([])
    const [total, setTotal] = useState()
    const [compWithdraw, setCompWithdraw] = useState(true)
    const [checkOut, setCheckOut] = useState(true)
    const [withDrawButton, setWithDrawButton] = useState("Checkout")
    const [cardImage, setCardImage] = useState("")
    const [indexes, setIndexes] = useState([]);
    let [myWinningCard, setMywinningCard] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();
    let [userRewards, setUsersRewards] = useState(0);

    let [myImdid, setMyimgId] = useState();
    let userWonCard = card.filter((data) => data.id == myWinningCard);
    const selectImage = (e) => {
        setSelected(!selected);
        let myId = e.target.id;
        console.log("You Clicked", myId);
    }

    // state for bet amount calculation
    let [betCalculation, setBetcalculationAmount] = useState(0);
    // for the inputs below the cards
    let inputCard1 = useRef(0);
    // let inputCard2 = useRef(0);
    // let inputCard3 = useRef(0);
    // let inputCard4 = useRef(0);
    // let inputCard5 = useRef("0");
    // let inputCard6 = useRef(0);
    // let inputCard7 = useRef(0);
    // let inputCard8 = useRef(0);
    // let inputCard9 = useRef(0);
    // let inputCard10 = useRef(0);
    // let myBetCalculation = useRef();

    // function calculating the amount under the cards
    //  const calculateBetamount=()=>{
    //      console.log("here in Calution ");
    //     //  let val1= inputCard1.current.value;
    //     //  let val2= inputCard2.current.value;
    //     //  let val3= inputCard3.current.value;
    //     //  let val4= inputCard4.current.value;
    //     //  let val5= inputCard5.current.value;
    //     //  let val6= inputCard6.current.value;
    //     //  let val7= inputCard7.current.value;
    //     //  let val8= inputCard8.current.value;
    //     //  let val9= inputCard9.current.value;
    //     //  let val10= inputCard10.current.value;

    //     //  let myCalculatedamount =parseInt(val1) + parseInt(val2) + parseInt(val3);
    //     // //  + parseInt(val3) + parseInt(val4) + parseInt(val5) + parseInt(val6) + parseInt(val7)+ parseInt(val8)+ parseInt(val9)+ parseInt(val10);
    //     // myBetCalculation.current.value=myCalculatedamount;
    //     //  setBetcalculationAmount(myCalculatedamount)
    //     //  console.log("my cal amount 6 =",val5); 
    //  }


    const handleModal = (e) => {
        setShowModal(true)
        setModal(e.target.id)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let accounts;
    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            accounts = await web3.eth.getAccounts();
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    const loadWeb3 = async () => {
        let isConnected = false;
        const web3 = window.web3;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                accountAd = accounts[0];
                setAccount(accountAd);
                balanceOf()
            }
            imgFun();
        } catch (error) {
            console.log("Error while connecting metamask", error);
        }
    };
    const withDrawal = async () => {
        try {
            if (userRewards > 0) {
                const web3 = window.web3;
                let contract = new web3.eth.Contract(abi, contractAddress);
                await contract.methods.withDraw_Reward().send({
                    from: account
                });

            } else {
                toast.error("No Rewards Found")
            }

        } catch (e) {

        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const balanceOf = async () => {
        const web3 = window.web3;
        try {
            let accounts = await getAccounts();
            accountAd = accounts[0];
            let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
            let myBalance = await tokenContract.methods.balanceOf(accountAd).call();
            let convertedBalanc = await window.web3.utils.fromWei(myBalance)
            setMybalance(convertedBalanc)
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    };

    let cardNo;
    const myBetAmount = async (e) => {
        if (contractStarttime < 480) {
            const web3 = window.web3;
            setButton("Please wait while processing...");
            setButtonState(true);
            console.log("Value", contractStarttime)
            try {
                console.log(account)
                let contract = new web3.eth.Contract(abi, contractAddress);
                let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
                // if (value >= 100 && value <= 40000) {
                await tokenContract.methods.approve(contractAddress, web3.utils.toWei(value)).send({ from: account })
                    .then(async (output) => {
                        await contract.methods.bet(modal, web3.utils.toWei(value)).send({
                            from: account
                        })
                        toast.success("Transaction Successfull")
                        loadWeb3();
                    }).catch((e) => {
                        toast.error("Card purchase rejected");
                        console.log("response", e);
                    });
                // } else {
                //     alert('Minimum Bet 100 and Maximum Bet 40,000')
                // }
                setValue("")
                setButtonState(false)
                setButton("Bet Now!")
            } catch (error) {
                console.log("Error while fetching acounts: ", error);

            }
        } else {
            toast.error("Pool Time Over Please try again in 2 minutes")
            setValue("")
            setButtonState(false)
            setButton("Bet Now!")
        }
    }


    const imgFun = async () => {
        const web3 = window.web3;
        try {
            let contract = new web3.eth.Contract(abi, contractAddress);
            const card = await contract.methods.UserInfo(accountAd).call()
            console.log(card[1])
            setCards(card[1])
            console.log(card[1])
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    }

    let cardsArray = []
    let indexesArray = []
    let pricesArray = []
    const handleCard = async (e) => {
        let id = e.target.id
        const web3 = window.web3;
        try {
            let contract = new web3.eth.Contract(abi, contractAddress);
            const card = await contract.methods.UserInfo(account).call();
            console.log(card)
            let CardNo = card[1];
            let CardValue = card[2]
            if (cardList.length === 0) {
                cardsArray.push([CardNo[id], CardValue[id]]);
                pricesArray.push(CardNo[id]);
                indexesArray.push(id)
            } else {
                cardsArray.push([CardNo[id], CardValue[id]]);
                indexesArray.push(id)
                pricesArray.push(CardNo[id]);
            }
            let newCards = [...cards]
            newCards[id] = ""
            setCards(newCards)
            let newList = cardList.concat(cardsArray)
            let newIndexes = indexes.concat(indexesArray)
            setIndexes(newIndexes)
            setCardList(newList);
            setComp(false)

            let result = 0;
            newList.map(async (item) => {
                console.log(item)
                console.log(item)
                let v = Web3.utils.fromWei(item[1])
                let a = parseFloat(v);
                result += a;
            })
            setTotal(result);

        } catch (e) {
            console.log(e)
        }
    }

    const imageSlider = () => {
        try {
            let i = 1;

            setInterval(() => {

                if (i < cardList.length) {
                    let currentImage = cardList[i].Card_No;
                    if (currentImage === "1") {
                        setCardImage(1)
                    } else if (currentImage === "2") {
                        setCardImage(2)
                    } else if (currentImage === "3") {
                        setCardImage(3)
                    } else if (currentImage === "4") {
                        setCardImage(4)
                    } else if (currentImage === "5") {
                        setCardImage(5)
                    } else if (currentImage === "6") {
                        setCardImage(6)
                    }
                    else if (currentImage === "7") {
                        setCardImage(7)
                    }
                    else if (currentImage === "8") {
                        setCardImage(8)
                    }
                    else if (currentImage === "9") {
                        setCardImage(9)
                    }
                    else if (currentImage === "10") {
                        setCardImage(10)
                    }

                    else {
                        return null
                    }
                }
            }
                , 5000)
            i++;
            console.log(i)

        } catch (error) {
            console.log(error)
        }
    }



    const handleWithdraw = async () => {
        const web3 = window.web3;
        let contract = new web3.eth.Contract(abi, contractAddress);
        setWithDraw("Please wait while processing...")
        try {
            await contract.methods.withdraw(indexes).send({ from: account })
            setWithDraw("Withdraw")
            setCardList([])
            setCheckOut(false)
            setWithDraw("Bet/Withdraw Again")
            toast.success("Withdraw amount successfully");
            loadWeb3();
        } catch (e) {
            toast.error("Withdraw Rejected");
            setWithDraw("Withdraw")
            console.log(e)
        }
    }

    const handleCheckout = async () => {
        setWithDrawButton("Withdraw")
        setCompWithdraw(false)
        setCardData(cardList)
        imageSlider()
    }

    const handleCongrats = () => {
        setCardList([])
        setIndexes([])
        setWithDraw("Withdraw")
        setComp(true)
        setCompWithdraw(true)
        setCheckOut(true)

    }

    const getData = async () => {

        try {


            let accounts = await getAccounts();
            accountAd = accounts[0];
            if (accountAd) {

                let currentTime = Math.floor(new Date().getTime() / 1000.0)
                const web3 = window.web3;
                let contractOf = new web3.eth.Contract(abi, contractAddress);
                let winnerPool = await contractOf.methods.checkwinnerpool().call();
                let startTime = await contractOf.methods.startTime().call();
                let rewards = await contractOf.methods.rewarded(accountAd).call();
                rewards= web3.utils.fromWei(rewards);
                startTime = currentTime - startTime;
                let myMinutes = startTime / 60;
                myMinutes = parseInt(myMinutes);
                let Seconds = startTime - (myMinutes * 60);
                setMinutes(myMinutes);
                setSeconds(Seconds);
                console.log("Minutes: ", parseInt(myMinutes));
                console.log("Seconds: ", Seconds);


                if (startTime > 480 && startTime < 500) {
                    console.log("here12", startTime);
                    setTimercalcuate(true);
                } else if (startTime == 597) {
                    console.log("here122", startTime);

                    setTimercalcuate(false);
                    let myApiData = await axios.get("http://localhost:8002/Calculate_reward");
                    console.log("myApiData", myApiData.data);
                } else {
                    console.log("last else", startTime);
                }
                setContractstartTime(startTime);
                setMywinningCard(winnerPool);
                setUsersRewards(rewards)
            } else {
                console.log("error While getting Account");
            }

        } catch (e) {
            console.log("Error Wile Getting data")
        }

    }


    useEffect(() => {

        setInterval(() => {

            getData();
        }, 1000);
        loadWeb3();
    }, [timerCalculate]);

    return (
        <div className="lg:bg-hero-background bg-gradient-to-b from-primary to-secondary bg-no-repeat bg-contain bg-top h-1/5 none px-6 md:px-10 lg:px-14 ">
            <br /><br />
            <div className="row ">
                <div className="col-lg-6">
                    <h1 className="text-4xl text-main font-semibold">Random Card Want?</h1>
                    <ul className="list-inside flex flex-col flex-wrap my-16">
                        <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-center">
                            <img src={disc} alt='icon' className="w-4 h-4 mr-4 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="1">You can earn Roboxpro token reward with challenge !</li>
                        </div>
                        <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-center">
                            <img src={disc} alt='icon' className="w-4 h-4 mr-4 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="2">Bet and increase your token balance.</li>
                        </div>
                        <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-start">
                            <img src={disc} alt='icon' className="w-4 h-4 mr-4 sm:mt-1 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="3">The pool amount of this game will be used to be special events. <strong>Good Luck!</strong></li>
                        </div>
                    </ul>


                </div>
                <div className="col-lg-6">
                    <h2 className="text-4xl text-main font-semibold">Game Rules</h2>

                    <ul className="list-inside flex flex-col flex-wrap my-12">
                        <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-center">
                            <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="9">10 Pool card can be selected with random game.</li>
                        </div>
                        <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-center">
                            <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="8">All Pool have different token reward value</li>
                        </div>
                        <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-start">
                            <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 sm:mt-1 p-0.5" />
                            <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="7">Min Bet is 1 ROBOX Token</li>
                        </div>

                    </ul>

                </div>
            </div>



            <div className="justify-center items-center ">
                {/*  */}




                <br />

                <div className="flex flex-row flex-wrap justify-center lg:justify-center md:justify-start sm-justify-start mt-20 ">

                    <br />
                    {/* Here Goes All Input Fields */}
                    <br />
                    <div>
                        <img src={One} alt="img1" className={selected ? "mr-4 mb-4 cursor-pointer" : "mr-4 mb-4 cursor-pointer border border-danger"} key="1" id="1" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input 
                    onChange={()=>calculateBetamount()}
                    ref={inputCard1}
                    className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Two} alt="img2" className="mr-4 mb-4 cursor-pointer" key="2" id="2" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input 
                    onChange={()=>calculateBetamount()}
                    ref={inputCard2} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Three} alt="img3" className="mr-4 mb-4 cursor-pointer" key="3" id="3" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input 
                    onChange={()=>calculateBetamount()} ref={inputCard3} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Four} alt="img4" className="mr-4 mb-4 cursor-pointer" key="4" id="4" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input
                    onChange={()=>calculateBetamount()}
                    ref={inputCard4} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Five} alt="img5" className="mr-4 mb-4 cursor-pointer" key="5" id="5" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input
                    onChange={()=>calculateBetamount()}
                    ref={inputCard5} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Six} alt="img6" className="mr-4 mb-4 cursor-pointer" key="6" id="6" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input
                    onChange={()=>calculateBetamount()}
                    ref={inputCard6} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Seven} alt="img7" className="mr-4 mb-4 cursor-pointer" key="7" id="7" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input 
                    onChange={()=>calculateBetamount()}
                    ref={inputCard7} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Eight} alt="img8" className="mr-4 mb-4 cursor-pointer" key="8" id="8" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input
                    onChange={()=>calculateBetamount()}
                    ref={inputCard8} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Nine} alt="img9" className="mr-4 mb-4 cursor-pointer" key="9" id="9" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                        {/* <input 
                    onChange={()=>calculateBetamount()}
                    ref={inputCard9} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>

                    <div>
                        <img src={Ten} alt="img10" className="mr-4 mb-4 cursor-pointer" key="10" id="10" width="96px" onClick={handleModal} />
                        {/* <input className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" />
                    <input 
                    onChange={()=>calculateBetamount()}
                    ref={inputCard10} className="width bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="100" max="1000" /> */}
                    </div>


                    {/* Input fields finish here */}

                </div>

            </div>
            {showModal ? (
                <>
                    {/* justify-center items-center flex overflow-x-hidden overflow-y-auto fixed */}
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-xl ">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dt-gr p-6  outline-none focus:outline-none "
                            >
                                <div className="flex items-start justify-between p-5 d-flex justify-content-center">

                                    {
                                        (modal === "1") ? <img src={One} alt="img1" className="w-64 h-72" />
                                            :
                                            (modal === "2") ? <img src={Two} alt="img2" className="w-64 h-72" /> :
                                                (modal === "3") ? <img src={Three} alt="img3" className="w-64 h-72" /> :
                                                    (modal === "4") ? <img src={Four} alt="img3" className="w-64 h-72" /> :
                                                        (modal === "5") ? <img src={Five} alt="img5" className="w-64 h-72" /> :
                                                            (modal === "6") ? <img src={Six} alt="img6" className="w-64 h-72" /> :
                                                                (modal === "7") ? <img src={Seven} alt="img7" className="w-64 h-72" /> :
                                                                    (modal === "8") ? <img src={Eight} alt="img8" className="w-64 h-72" /> :
                                                                        (modal === "9") ? <img src={Nine} alt="img9" className="w-64 h-72" /> :
                                                                            (modal === "10") ? <img src={Ten} alt="img10" className="w-64 h-72" /> :
                                                                                null
                                    }
                                </div>
                                <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <div className='row'>
                                        <div className='col-12 '>
                                            <div className="flex flex-row items-center justify-between mb-4">
                                                <h3 className="text-white">My Wallet</h3>
                                                <span className="sm:text-xl xsm:text-md text-white font-semibold">{mybalance} ROBOX</span>
                                            </div>
                                        </div>

                                        <div className='col-12 d-flex flex-row'>

                                            <h2 className='text-white'>Bet Amount</h2>
                                            <div className='ms-sm-auto'>
                                                <input className="bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" placeHolder="Bet Amount" onChange={handleChange} />
                                                <span className="sm:text-xl xsm:text-lg text-white font-semibold">ROBOX</span>
                                            </div>
                                        </div>

                                        <div className='col-12'>
                                            <button className="bg-main-color px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={() => myBetAmount()} disabled={buttonState}>{button}</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex items-center justify-end'>

                                    <button className="text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-10" type="button" onClick={() => setShowModal(false)} >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <div className="flex flex-row flex-wrap justify-center lg:justify-start md:justify-start sm-justify-start">
                {
                    cards && cards.map((item, index) => {
                        return (item === "1") ? <img src={One} alt="img1" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                            (item === "2") ? <img src={Two} alt="img2" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                (item === "3") ? <img src={Three} alt="img3" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                    (item === "4") ? <img src={Four} alt="img3" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                        (item === "5") ? <img src={Five} alt="img5" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                            (item === "6") ? <img src={Six} alt="img6" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                                (item === "7") ? <img src={Seven} alt="img7" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                                    (item === "8") ? <img src={Eight} alt="img8" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                                        (item === "9") ? <img src={Nine} alt="img9" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :
                                                            (item === "10") ? <img src={Ten} alt="img10" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} width="95px" /> :


                                                                null;

                    }
                    )
                }
            </div>
            <div className="row marginhere" >
                <div className="col-lg-6">
                    <div className="Wincardhere" >
                        <div>


                            {
                                userWonCard.map((items) => {
                                    return (
                                        <div >
                                            <h2 className="text-4xl text-main font-semibold">Win Card</h2><br />
                                            <img src={items.imgSrc} alt="User Winning Card" width="50%" className='ml-10' />

                                        </div>
                                    )
                                })
                            }





                        </div>
                    </div>
                </div>
                <div className="col-lg-6" style={{ marginLeft: '-9rem' }}>
                    <div className="mb-0 xl:ml-10 2xl:ml-0">
                        {
                            comp ?
                                (<div className=" md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">



                                    <ul className="list-inside flex flex-col flex-wrap my-12">



                                        <div className='row'>

                                            <div className='flex flex-row items-center justify-between'>
                                                <div className=''>
                                                    <h2 className="text-4xl text-main font-semibold">Timer</h2>
                                                </div>

                                                <div >
                                                    <p className="text-4xl text-main font-semibold">
                                                        {minutes}:{secods} {/* {contractStarttime} */}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                {timerCalculate ?
                                                    <h2 className="text-4xl text-main font-semibold" >
                                                        Calculatiog Profit...
                                                    </h2> : <></>
                                                }
                                            </div>


                                            <div className='flex flex-row items-center justify-between'>
                                                <div>
                                                    <h3 className='text-4xl text-main font-semibold'>You Rewards</h3>
                                                </div>
                                                <div>
                                                    <h6 className='text-4xl text-main font-semibold'>{userRewards}</h6>
                                                </div>
                                            </div>

                                            <button className="bg-main-color px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0 text-xl" onClick={() => withDrawal()} >Withdraw</button>
                                        </div>
                                    </ul>
                                </div>
                                )
                                :
                                compWithdraw ?
                                    (<div className="h-auto w-12/12 mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-2 lg:py-6 md:py-6 sm:py-4 px-2 lg:px-6 md:px-6 sm:px-4">
                                        <h2 className="text-4xl text-main font-semibold">Checkout</h2>
                                        <div className="py-4 px-4 bg-dark flex flex-row justify-between mt-4">
                                            <label className="text-main text-xl font-semibold">Item</label>
                                            <label className="text-main text-xl font-semibold">Quantity</label>
                                            <label className="text-main text-xl font-semibold">Bet amount</label>
                                        </div>
                                        <div className="mt-4 overflow-auto h-56">
                                            {
                                                cardList && cardList?.map((item, index) => {
                                                    return (item[0] === "1") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={One} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                        (item[0] === "2") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Two} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                            (item[0] === "3") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Three} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                                (item[0] === "4") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Four} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                                    (item[0] === "5") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Five} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                                        (item[0] === "6") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Six} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div> :
                                                                            null;
                                                })
                                            }
                                        </div>
                                    </div>
                                    )
                                    :
                                    checkOut ?
                                        (<div className=" mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">
                                            <h2 className="text-xl msm:text-4xl sm:text-4xl text-main font-semibold text-start">WITHDRAW AMOUNT</h2>
                                            <Slider {...settings} className="w-96">

                                                {cardList.map(item => {
                                                    return (item[0] === "1") ? <div className="flex flex-row !important items-center justify-start sm:justify-start"><img src={One} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Wind Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 1 (WIND)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                        : (item[0] === "2") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Two} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Water Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 2 (WATER)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                            : (item[0] === "3") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Three} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Fire Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 3 (FIRE)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                                : (item[0] === "4") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Four} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Light Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 4 (LIGHT)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                                    : (item[0] === "5") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Five} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Earth Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 5 (EARTH)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                                        : (item[0] === "6") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Six} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main text-xl font-semibold">#2021 Dark Roboxpro</h4><h3 className="text-main text-xl sm:text-2xl font-bold">Level: 6 (DARK)</h3><p className="mt-6 text-main font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} ROBOX</p></div></div>
                                                                            : null

                                                })
                                                }

                                            </Slider>
                                        </div>
                                        ) :
                                        (
                                            <div className=" mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9 flex flex-col justify-center items-center">
                                                <h2 className="text-xl msm:text-4xl sm:text-4xl text-main font-semibold text-start">CONGRATULATIONS</h2>
                                                <img src={Congratulation} alt="congrats" className="mt-12" />
                                            </div>
                                        )

                        }

                        <div className="  py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">
                            {
                                comp ?
                                    <>

                                        <li className=" hidden text-pure-white text-base sm:text-lg md:text-xl lg:text-xl">10 Pool card can be selected with random game.</li>

                                    </>
                                    :
                                    compWithdraw ?

                                        <div className="mt-6 flex flex-col">
                                            <hr />
                                            <div className="flex flex-row justify-between">
                                                <h3 className="sm:text-2xl xsm:text-lg md:text-lg text-main font-semibold my-4">Total</h3>
                                                <h3 className="sm:text-2xl xsm:text-lg md:text-lg text-white font-semibold my-4">{total}</h3>
                                            </div>
                                            <hr />
                                            <button className="bg-main-color px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleCheckout}>{withDrawButton}</button>
                                        </div>
                                        :
                                        checkOut ?
                                            <div className="mt-6 flex flex-col">
                                                <p className="py-3 text-white text-center">Click withdraw button to send token to your wallet</p>
                                                <button className="bg-main-color px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleWithdraw} disabled={buttonState}>{withDraw}</button>
                                            </div>
                                            :
                                            <div className="mt-6 flex flex-col">
                                                <button className="bg-main-color px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleCongrats} disabled={buttonState}>{withDraw}</button>
                                            </div>
                            }
                        </div>
                        <br />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Hero
