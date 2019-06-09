import { Component } from "@stencil/core";

@Component({
    tag:'cc-loader',
    styleUrl:'./loader.css',
    shadow:true
})
export class Loader{
    render(){
        return (
            <div class="lds-hourglass"></div>
        );
    }
}