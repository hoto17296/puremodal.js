/*!
 * puremodal.js
 * https://github.com/hoto17296/puremodal.js
 *
 * Copyright @hoto17296
 * Released under the MIT license
 *
 * Date: 2018-06-01
 */

/**
 * class EventEmitter
 */
var EventEmitter = function() {
  this.listeners = {};
};

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
 * class ModalBase extends EventEmitter
 */
var ModalBase = function(elem) {
  EventEmitter.apply(this);
  this.elem = elem;
  this.elem.modal = this;
  // Bind close event
  var closeElements = this.elem.getElementsByClassName('close');
  for (var i = 0; i < closeElements.length; i++) {
    closeElements[i].addEventListener('click', this.close.bind(this));
  }
};

ModalBase.prototype = Object.create(EventEmitter.prototype);

ModalBase.prototype.open = function() {
  this.elem.style.display = 'block';
  this.emit.apply(this, ['open']);
};

ModalBase.prototype.close = function() {
  this.elem.style.display = 'none';
  this.emit.apply(this, ['close'].concat(arguments));
};

/**
 * class WindowModal extends ModalBase
 */
WindowModal = function() {
  ModalBase.apply(this, arguments);
  this.on('open', this.onOpen.bind(this));
  this.on('close', this.onClose.bind(this));
};

WindowModal.prototype = Object.create(ModalBase.prototype);

WindowModal.prototype.onOpen = function() {
  this.bodyScroll = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.marginTop = '-' + this.bodyScroll + 'px';
  document.body.style.overflow = 'hidden';
};

WindowModal.prototype.onClose = function() {
  document.body.style.marginTop = '';
  document.body.style.overflow = '';
  document.body.scrollTop = this.bodyScroll
  document.documentElement.scrollTop = this.bodyScroll;
};
