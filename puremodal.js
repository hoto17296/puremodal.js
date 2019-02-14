/*!
 * puremodal.js v1.0.0
 * https://github.com/hoto17296/puremodal.js
 *
 * Copyright @hoto17296
 * Released under the MIT license
 *
 * Since: 2018-06-01
 * Updated: 2019-02-13
 */

/**
 * class EventEmitter
 */
function EventEmitter() {
  this.listeners = {};
}

EventEmitter.prototype.on = function(event, cb) {
  if (!this.listeners[event]) {
    this.listeners[event] = [];
  }
  this.listeners[event].push(cb);
};

EventEmitter.prototype.emit = function(event) {
  if (!this.listeners[event]) return;
  var args = [].slice.call(arguments, 1);
  for (var i = 0; i < this.listeners[event].length; i++) {
    cb = this.listeners[event][i];
    cb.apply(this, args);
  }
};

/**
 * class PureModal extends EventEmitter
 */
function PureModal(elem) {
  EventEmitter.apply(this);
  this.elem = elem;
  this.elem.modal = this;
  this.elem.style.display = 'none';
  // Bind close event
  var closeElements = this.elem.getElementsByClassName('close');
  for (var i = 0; i < closeElements.length; i++) {
    closeElements[i].addEventListener('click', this.close.bind(this));
  }
}
PureModal.prototype = Object.create(EventEmitter.prototype);

PureModal.prototype.open = function() {
  // Show modal
  this.elem.style.display = 'block';
  // Lock background contents
  this.bodyScroll = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.style.marginTop = '-' + this.bodyScroll + 'px';
  document.body.style.overflow = 'hidden';
  // Emit open events
  this.emit.apply(this, ['open']);
};

PureModal.prototype.close = function() {
  // Hide modal
  this.elem.style.display = 'none';
  // Unlock background contents
  document.body.style.marginTop = '';
  document.body.style.overflow = '';
  document.body.scrollTop = this.bodyScroll;
  document.documentElement.scrollTop = this.bodyScroll;
  // Emit close events
  this.emit.apply(this, ['close'].concat(arguments));
};