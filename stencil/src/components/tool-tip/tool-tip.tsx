import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: 'cc-tool-tip',
  styleUrl: './tool-tip.css',
  shadow: true
})
export class ToolTip {
  @Prop() title: string = '';
  @State() shownOnce: boolean = false;
  @State() showTooltip: boolean = false;

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    if(!this.showTooltip){
      this.shownOnce = true;
    }
  }

  render() {
    const tooltipInfo = this.shownOnce?null:(
    <div>
      <span onClick={this.toggleTooltip.bind(this)}>?</span>
      {this.showTooltip ? <div class="info" >
        {this.title}
      </div> : null}
    </div>
    );

    return (
    <div class="container">
      <slot></slot>
      {tooltipInfo}
    </div>
    );
  }
}