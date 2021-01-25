import React, { Component } from "react";
import "./Request.scss";
import axios from 'axios';
import RequestItem from "./RequestItem";
import Swal from 'sweetalert2'


class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      replyID:-1,
      response: '',
      reload: 1,
      requestdata:'Loading Request List...',
      requests:null,
      requestcontent:[],
      requesthash:[],
      requestID:[],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRequestData = this.getRequestData.bind(this);
    this.getDeContent = this.getDeContent.bind(this);

    this.renderRequests = this.renderRequests.bind(this);
    this.reply = this.reply.bind(this);
    //var requests = new Array();
  }

  async componentDidMount() {
      
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      textcontent: this.state.value
    };
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios.post(proxyurl+'http://btfs.tron2moon.com/request.php', { textcontent: this.state.value })
      .then(res => {
        console.log(res);
        Swal.fire('Request sent');
        this.setState({
            reload:   1,
            requestcontent:[],
            requesthash:[],
            requestID:[]
          });
      })
 
  }
  async getDeContent(hash,id)
  {
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var ret = await axios.get(proxyurl+'https://gateway.btfssoter.io/btfs/'+hash)
      .then(res => {
        this.setState(state => {
          const requestcontent = state.requestcontent.concat(res.data);
          const requesthash = state.requesthash.concat(hash);
          const requestID = state.requestID.concat(id);
          return {
            requestcontent,
            requesthash,
            requestID
          };
        });
        console.log(res.data);
      });
  }

  async getRequestData(_number,_rid){
    const data = {
      number: _number,
      rid: _rid
    };
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await axios.post(proxyurl+ 'http://btfs.tron2moon.com/getrequest.php', data)
      .then(res => {
        //console.log(res);
        console.log(res.data);
        this.setState({
            reload:   0,
            requests: res.data
          });

        var Rdata =res.data;
        const leng = Rdata.length;

        for (var i=0;i<leng;i++)
        {
          this.getDeContent(Rdata[i]['hash'],Rdata[i]['id']);
        }
        console.log(this.requests);

      })   
  }
  async reply(rid)
  {
    const {value: text} = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Type your reply here...',
      showCancelButton: true
    })

    if (text) {
      //Swal.fire(text + rid);
      
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios.post(proxyurl+'http://btfs.tron2moon.com/request.php', { textcontent: text, rid: rid })
        .then(res => {
          console.log(res);
          
        })
      }
  }
  renderRequests()
  {
    const datas = this.state.requestcontent;
    const hashes = this.state.requesthash;
    const RIDs = this.state.requestID;

    if (datas.length == 0)
      return 'Loading...';
    const tItems = datas.map((request, index) => (
      <div>
        <div className="table-row" id={index} key={index}>
          <div className="rank">{RIDs[index]}</div>
          <div className="requestcontent">{request} </div>
          <div className="requestreply" id={RIDs[index]}><button onClick={e => this.reply(RIDs[index])}>Reply</button></div>
          <div className="requestdelink"><a href={"https://gateway.btfssoter.io/btfs/"+hashes[index]}>de-Link</a></div>
        </div>
        
          <RequestItem rid={RIDs[index]} />
       
      </div>
    ));
    return tItems;   
  }
  render() {
    if (this.state.reload == 1)
    {
      this.getRequestData(0,-1);
    }

  return (
      <div>
      <br/>
        <div className="col-lg-12">
            <blockquote className="generic-blockquote">
              Your Request is saved in decentralized network provided by BitTorrent File System (BTFS) TestNet. Thanks to Tron Team.<br/> Please support us to bring Tron 2the Moon.<br/><br/><strong>Tron2Moon team </strong>
            </blockquote>
        </div>
        <form onSubmit={this.handleSubmit}>
        <h3>Your Request:</h3>
        <textarea className="single-textarea" name="textcontent" id="textcontent" placeholder="Enter your request here for example: I want to download The Lion King (2019). Happy to pay using BitTorrent Speed. Thanks" onChange={this.handleChange} value={this.state.value}> </textarea>
        <button className="genric-btn primary circle" >Send Request</button>
        </form>
        <br/>
      
        <h3 className="mb-30 text-left">Request List</h3> 
        <div className="progress-table-wrap">
          <div className="progress-table">
            <div className="table-head">
              <div className="rank">#</div>
              <div className="requestcontent">Content</div>
              <div className="requestreply"></div>
              <div className="requestdelink"></div>
            </div>
            {this.renderRequests()}
          </div>
        </div>  

      </div>
    );
  }
}
export default Request;

