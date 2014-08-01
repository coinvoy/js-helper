var coinvoy = {
	//object vars
	hash: "",
	payWith: "",
	currencies: ['BTC','LTC','DOGE'],
	callbacks : {
			approved: false,
			confirmed: false,
			cancelled: false,
	},

	init : function(hash, callbacks) {
		//set unique hash
		this.hash = hash;
		//set callbacks
		for(i in callbacks)
          this.callbacks[i] = callbacks[i];
		//Create IE + others compatible event handler
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

		var $this = this;
		// Listen to message from child window
		eventer(messageEvent,function(e) {
		  console.log('Window received message from Coinvoy!:  ',e.data);
		  if(e.data)
		  {
		      switch(e.data) {
		      	case "hide":
		      		// check if any other iframes already exists
					var paymentFrames = document.getElementsByClassName('payment-frame');
					for(var i=0; i < paymentFrames.length; i++) {
						paymentFrames[i].style.display = "none";
					}
					break;
		      	case "approved":
		      		if($this.callbacks.approved)
		      			$this.callbacks.approved();
		      		break;
		      	case "confirmed":
		      		if($this.callbacks.confirmed)
		      			$this.callbacks.confirmed();
		      		break;
		      	case "cancelled":
		      		if($this.callbacks.cancelled)
		      			$this.callbacks.cancelled();
		      		break;
		      	default:
		      		break;
		      }
		  }
		  //proceed with payment
		},false);
	},

	//Build Iframe URL 
	buildPaymentURL : function(payWith, amount) {
		return "https://coinvoy.net/api/invoiceHash/" + this.hash + "/" + payWith + "/" + amount ;
	},

	displayIframe : function(payWith, amount) {
		if(!amount) amount = 0;
		// create wrapper
		if(!this.wrapper) {
			// init wrapper
			wrapper = document.createElement('div');
			wrapper.id = "coinvoy-wrapper";
			document.body.appendChild(wrapper);
			this.wrapper = wrapper;
		}
		// check if any other iframes already exists
		paymentFrames = document.getElementsByClassName('payment-frame');
		for(var i=0; i < paymentFrames.length; i++) {
			if(paymentFrames[i].id == payWith + "invoice") {
				paymentFrames[i].style.display = "block";
			} else {
				paymentFrames[i].style.display = "none";
			}
		}
		this.payWith = payWith;
		if(!this.paymentDim) {
			var dim = document.createElement('div');
			dim.id = "payment-dim";
			this.wrapper.appendChild(dim);
		}
		var frame = document.createElement('div');
		frame.id = payWith + "invoice";
		frame.className = "payment-frame";
		var iframe = document.createElement('iframe');
		iframe.id = "payment-iframe";
		iframe.style.width = "600px";
		iframe.style.height = "225px";
		iframe.style.marginTop = "3px";
		//iframe.style.display = "none";
		iframe.src = this.buildPaymentURL(payWith, amount);
		iframe.frameBorder = "0";
		iframe.scrolling = "no";
		frame.appendChild(iframe);
		//save class elements
		this.paymentDim = dim;
		this.paymentFrame = frame;
		this.wrapper.appendChild(frame);
	},

	
}