import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import { icon_map } from './icon_map.js';

const supportsButtonPressCardFeature = (stateObj) => {
  const domain = stateObj.entity_id.split(".")[0];
  return domain === "remote";
};

class SonyBraviaRemote extends LitElement {

  static get properties() {
    return {
      hass: undefined,
      config: undefined,
      stateObj: undefined,
    };
  }

static getStubConfig() {
  return { entity: "", use_icons: false }
}

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid Configuration");
    }

    this.config = config
  }

  get_button_label(button) {
    if (!icon_map.has(button)) {
      console.log("Button not defined");
      return button;
    }

    return this.config.use_icons? html`<ha-icon icon="mdi:${icon_map.get(button)['icon_display']}"></ha-icon>` : icon_map.get(button)['text_display']
  }

  render() {
    if (
      !this.config ||
      !this.hass //||
      //!this.stateObj //||
      //!supportsButtonPressCardFeature(this.stateObj)
    ) {
      return "Either config or hass is not defined";
    }

    return html`
      <table>
            <thead>
            <tr>
              <th colspan=3>Sony Bravia</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><button class="button" @click=${this._toggle_power}>${this.get_button_label("power")}</button>
                </td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._select_tv_source}>${this.get_button_label("tv_input")}</button></td>
                <td>&nbsp;</td>
                <td><button class="button" @click=${this._settings}>${this.get_button_label("settings")}</button></td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._select_input_source}>${this.get_button_label("input")}</button></td>
                <td>&nbsp;</td>
                <td><button class="button" @click=${this._numbers}>${this.get_button_label("numbers")}</button></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td><button class="button" @click=${this._up_arrow}>${this.get_button_label("up_arrow")}</button></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._left_arrow}>${this.get_button_label("left_arrow")}</button></td>
                <td><button class="button" @click=${this._select}>${this.get_button_label("select")}</button></td>
                <td><button class="button" @click=${this._right_arrow}>${this.get_button_label("right_arrow")}</button></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="button" @click=${this._down_arrow}>${this.get_button_label("down_arrow")}</button></td>
                <td></td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._back}>${this.get_button_label("back")}</button></td>
                <td>&nbsp;</td>
                <td><button class="button" @click=${this._home}>${this.get_button_label("home")}</button></td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._volume_up}>${this.get_button_label("volume_up")}</button></td>
                <td></td>
                <td><button class="button" @click=${this._channel_up}>${this.get_button_label("channel_up")}</button></td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._volume_down}>${this.get_button_label("volume_down")}</button></td>
                <td><button class="button" @click=${this._mute}>${this.get_button_label("mute")}</button></td>
                <td><button class="button" @click=${this._channel_down}>${this.get_button_label("channel_down")}</button></td>
            </tr>
            <tr>
                <td><button class="button" @click=${this._play}>${this.get_button_label("play")}</button></td>
                <td><button class="button" @click=${this._pause}>${this.get_button_label("pause")}</button></td>
                <td><button class="button" @click=${this._program_guide}>${this.get_button_label("program_guide")}</button></td>
            </tr>
            <tr>
                <td colspan="3" align="center">
                <table width="100%">
                    <tbody><tr>
                        <td><button class="button" @click=${this._youtube}>${this.get_button_label("youtube")}</button></td>
                        <td><button class="button" @click=${this._netflix}>${this.get_button_label("netflix")}</button></td>
                    </tr>
                    <tr>
                        <td colspan=2><button class="button" @click=${this._prime_video}>Prime Video</button></td>
                    </tr>
                </tbody></table>
                </td>
            </tr>
        </tbody></table>
    `;
  }

  static get styles() {
    return css`
      .button {
        display: block;
        height: var(--feature-height, 42px);
        width: 100%;
        border-radius: var(--feature-border-radius, 12px);
        border: none;
        background-color: #eeeeee;
        cursor: pointer;
        transition: background-color 180ms ease-in-out;
      }
      .button:hover {
        background-color: #dddddd;
      }
      .button:focus {
        background-color: #cdcdcd;
      }
    `;
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "label:", selector: { label: {} } },
        { name: "entity", required: true, selector: { entity: { filter: { domain: "remote" } } } },
        { name: "use_icons", required: true, selector: { boolean: {} }},

      ]
    };
  }

  _toggle_power(ev) {
    console.log("_toggle_power called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "TvPower" });
  }

  _play(ev) {
    console.log("_play called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Play" });
  }

  _select_tv_source(ev) {
    console.log("_select_tv_source called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Tv" });
  }

  _settings(ev) {
    console.log("_settings called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "ActionMenu" });
  }

  _select_input_source(ev) {
    console.log("_select_input_source called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Input" });
  }

  _program_guide(ev) {
    console.log("_program_guide called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "GGuide" });
  }

  _up_arrow(ev) {
    console.log("_up_arrow called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "CursorUp" });
  }

  _left_arrow(ev) {
    console.log("_left_arrow called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "CursorLeft" });
  }

  _select(ev) {
    console.log("_select called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "DpadCenter" });
  }

  _right_arrow(ev) {
    console.log("_right_arrow called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "CursorRight" });
  }

  _down_arrow(ev) {
    console.log("_down_arrow called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "CursorDown" });
  }

  _back(ev) {
    console.log("_back called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Return" });
  }

  _home(ev) {
    console.log("_home called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Home" });
  }

  _volume_up(ev) {
    console.log("_volume_up called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "VolumeUp" });
  }

  _volume_down(ev) {
    console.log("_volume_down called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "VolumeDown" });
  }

  _channel_up(ev) {
    console.log("_channel_up called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "ChannelUp" });
  }

  _channel_down(ev) {
    console.log("_channel_down called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "ChannelDown" });
  }

  _mute(ev) {
    console.log("_mute called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Mute" });
  }

  _pause(ev) {
    console.log("_pause called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Pause" });
  }

  _numbers(ev) {
    console.log("_numbers called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "ControlMenu" });
  }

  _youtube(ev) {
    console.log("_youtube called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "YouTube" });
  }

  _netflix(ev) {
    console.log("_netflix called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "Netflix" });
  }

  _disney_plus(ev) {
    console.log("_disney_plus called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "PartnerApp3" });
  }

  _prime_video(ev) {
    console.log("_prime_video called");
    ev.stopPropagation();
    this.hass.callService("remote", "send_command", { entity_id: this.config.entity, command: "PartnerApp5" });
  }


  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns in masonry view
  getCardSize() {
    return 3;
  }

  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: 3,
      columns: 6,
      min_rows: 3,
      max_rows: 3,
    };
  }
}


customElements.define("sony-bravia-remote", SonyBraviaRemote);

window.customCardFeatures = window.customCardFeatures || [];
window.customCardFeatures.push({
  type: "sony-bravia-remote",
  name: "Button Press",
  supported: supportsButtonPressCardFeature
});

window.customCards.push({
    type: "sony-bravia-remote",
    name: "Sony Bravia Remote",
    description: "A card for Sony Bravia remotes" // optional
});