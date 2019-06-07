import { Component, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'cc-side-drawer',
  styleUrl:'./side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop() title = 'Side drawer title';
  @Prop({
    reflectToAttr:true,
    mutable:true
  }) opened:boolean;

  @State() showContact:boolean = false;

  @Method()
  open(){
    this.opened = true;
    this.showContact = false;
  }

  @Method()
  close(){
    this.opened = false;
  }

  onTabClicked(tabName:string){
    this.showContact = tabName === 'contactTab';
  }

  render() {
    let content = <slot/>;
    if(this.showContact){
      content = <div>
        <h3>Contact Info:</h3>
        <ul>
          <li>
            Contact No: 90834939483
          </li>
          <li>
            <a href="mailto:abc@abc.com">abc@abc.com</a>
          </li>
        </ul>
      </div>
    }
    return [
      <div class="backdrop" onClick={this.close.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button class="close" onClick={this.close.bind(this)}>X</button>
        </header>
        <section>
          <div class="tab-container">
            <button 
            onClick={this.onTabClicked.bind(this,'navTab')}
            class={!this.showContact?'active':''}>
              Navigation
            </button>
            <button 
            onClick={this.onTabClicked.bind(this,'contactTab')}
            class={this.showContact?'active':''}>
              Contact
            </button>
          </div>
          {content}
        </section>
      </aside>
      ];
  }
}
