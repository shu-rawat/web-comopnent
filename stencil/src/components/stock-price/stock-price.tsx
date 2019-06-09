import { Component, Element, State, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'cc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice{
    @Element() el:HTMLElement;
    @State() price:Number = 0;
    @State() errorMessage:string = '';
    @State() error:boolean = false;
    @State() loading:boolean = false;
    @Prop({
        reflectToAttr:true,
        mutable:true
    }) stockSymbol:string;
 
    @Watch('stockSymbol')
    stockSymbolChanged(newValue:string, oldValue:string){
        console.log("on change",newValue, oldValue);
        if(!newValue){
            this.error = true;
            this.price = null;
            this.errorMessage = 'Please Enter Symbol';
        }
        else 
        if(newValue !== oldValue){
            this.fetchPrice(newValue);
        }
    }
 
    inputEl:HTMLInputElement;
    
    fetchPrice(stockSymbol){
        this.loading = true;
        this.getPrice(stockSymbol).then((price:Number)=>{
            this.loading = false;
            this.price = price;
            this.error = false;
            this.errorMessage = null;
        }).catch((err:Error)=>{
            this.loading = false;
            this.price = null;
            this.error = true;
            this.errorMessage = err.message;
        });
    }
    
    onFetchPrice(e:Event){
        e.preventDefault();
        this.stockSymbol =  this.inputEl.value;
        this.fetchPrice(this.stockSymbol);
        // const inputEl:HTMLInputElement = this.el.shadowRoot.querySelector('#stockSymbol');
    }

    getPrice(stockSymbol:string){
        return new Promise((resolve)=>{
            const length = stockSymbol.length;
            if(length){
                setTimeout(()=>{
                    resolve(length * 50);
                },1500);
            }
            else{
                throw(new Error('Invalid Symbol'));
            }
        });
    }

    onSymbolChange(e){
        this.stockSymbol = e.target.value;
    }

    componentWillLoad(){
        console.log("component will load");
        this.fetchPrice(this.stockSymbol);
    }

    componentDidLoad(){
        console.log("component did load");
    }

    componentWillUpdate(){
        console.log("component will update");
    }

    componentDidUpdate(){
        console.log("component did update");
    }

    componentDidUnload(){
        console.log("component did unload");
    }
    
    render(){
        let content = null;
        if(this.loading){
            content = <cc-loader></cc-loader>;
        }
        else if(this.error){
            content = <p class="error">Error: {this.errorMessage}</p>;
        }
        else{
            content = <p class="info">Stock Price is : ${this.price}</p>;
        }
        return (
        <div>
            <form onSubmit={this.onFetchPrice.bind(this)}>
                <div>
                    <label htmlFor="stockSymbol">Stock Symbol : </label>
                    <input type="text" 
                    value={this.stockSymbol} 
                    onInput={this.onSymbolChange.bind(this)} 
                    name="stockSymbol" 
                    id="stockSymbol" 
                    ref={(el)=>{
                        this.inputEl = el;
                    }}/>
                </div>
                <button type="submit">FETCH STOCK PRICE</button>
            </form>
            <div>
                {content}
            </div>
        </div>
        );
    }
}