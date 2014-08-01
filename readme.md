Coinvoy API - JS Helper Library
================================

JS Helper library for Coinvoy API


##About Coinvoy

Coinvoy is an online payment processor with an integrated exchange feature for established cryptocurrencies, namely Bitcoin, Litecoin and Dogecoin. It's objective is to provide an easiest yet the most secure way to accept cryptocurrencies.

##Get started

Just include coinvoy.js in your document. Use/modify it as you like.

```
<script type="text/javascript" src="//coinvoy.net/static/js/coinvoy.js?v=0.01"></script>

<script>

coinvoy.init('yourButtonHash', {
	approved: function() {
		alert('approved');
	},
	cancelled: function() {
		alert('cancelled');
	}
});
</script>
```
'yourButtonHash' is your button/donation hash given by Coinvoy following a button or donation request.

###List of all commands:
- init(hash, callback)				- Your button/donation hash and callback object
- buildPaymentURL(payWith, amount)  - Iframing or requesting this URL initiates your payment
- displayIframe(payWith, amount)	- Display default payment box

Your interest is very much welcome. Please contact support@coinvoy.net for any feedback!

Coinvoy

