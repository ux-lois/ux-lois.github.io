var ge = Object.defineProperty;
var _e = (t, e, n) => e in t ? ge(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var T = (t, e, n) => (_e(t, typeof e != "symbol" ? e + "" : e, n), n);
var ye = { value: () => {
} };
function Xt() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new W(n);
}
function W(t) {
  this._ = t;
}
function we(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
W.prototype = Xt.prototype = {
  constructor: W,
  on: function(t, e) {
    var n = this._, r = we(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ve(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (i = (t = r[o]).type)
        n[i] = kt(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = kt(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new W(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function ve(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function kt(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ye, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ut = "http://www.w3.org/1999/xhtml";
const At = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ut,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function it(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), At.hasOwnProperty(e) ? { space: At[e], local: t } : t;
}
function me(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ut && e.documentElement.namespaceURI === ut ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function xe(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ot(t) {
  var e = it(t);
  return (e.local ? xe : me)(e);
}
function be() {
}
function _t(t) {
  return t == null ? be : function() {
    return this.querySelector(t);
  };
}
function Ne(t) {
  typeof t != "function" && (t = _t(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, u, l = 0; l < s; ++l)
      (c = o[l]) && (u = t.call(c, c.__data__, l, o)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new w(r, this._parents);
}
function ke(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ae() {
  return [];
}
function Pt(t) {
  return t == null ? Ae : function() {
    return this.querySelectorAll(t);
  };
}
function Se(t) {
  return function() {
    return ke(t.apply(this, arguments));
  };
}
function Ee(t) {
  typeof t == "function" ? t = Se(t) : t = Pt(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && (r.push(t.call(c, c.__data__, u, s)), i.push(c));
  return new w(r, i);
}
function Lt(t) {
  return function() {
    return this.matches(t);
  };
}
function Yt(t) {
  return function(e) {
    return e.matches(t);
  };
}
var $e = Array.prototype.find;
function Ce(t) {
  return function() {
    return $e.call(this.children, t);
  };
}
function Te() {
  return this.firstElementChild;
}
function Me(t) {
  return this.select(t == null ? Te : Ce(typeof t == "function" ? t : Yt(t)));
}
var Re = Array.prototype.filter;
function Fe() {
  return Array.from(this.children);
}
function Ie(t) {
  return function() {
    return Re.call(this.children, t);
  };
}
function De(t) {
  return this.selectAll(t == null ? Fe : Ie(typeof t == "function" ? t : Yt(t)));
}
function Ge(t) {
  typeof t != "function" && (t = Lt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new w(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function Ve() {
  return new w(this._enter || this._groups.map(Bt), this._parents);
}
function Z(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Z.prototype = {
  constructor: Z,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function qe(t) {
  return function() {
    return t;
  };
}
function He(t, e, n, r, i, o) {
  for (var s = 0, a, c = e.length, u = o.length; s < u; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Z(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Xe(t, e, n, r, i, o, s) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, f = o.length, h = new Array(l), p;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (h[a] = p = s.call(c, c.__data__, a, e) + "", u.has(p) ? i[a] = c : u.set(p, c));
  for (a = 0; a < f; ++a)
    p = s.call(t, o[a], a, o) + "", (c = u.get(p)) ? (r[a] = c, c.__data__ = o[a], u.delete(p)) : n[a] = new Z(t, o[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(h[a]) === c && (i[a] = c);
}
function Oe(t) {
  return t.__data__;
}
function Pe(t, e) {
  if (!arguments.length)
    return Array.from(this, Oe);
  var n = e ? Xe : He, r = this._parents, i = this._groups;
  typeof t != "function" && (t = qe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], f = i[u], h = f.length, p = Le(t.call(l, l && l.__data__, u, r)), d = p.length, g = a[u] = new Array(d), S = s[u] = new Array(d), de = c[u] = new Array(h);
    n(l, f, g, S, de, p, e);
    for (var I = 0, B = 0, bt, Nt; I < d; ++I)
      if (bt = g[I]) {
        for (I >= B && (B = I + 1); !(Nt = S[B]) && ++B < d; )
          ;
        bt._next = Nt || null;
      }
  }
  return s = new w(s, r), s._enter = a, s._exit = c, s;
}
function Le(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ye() {
  return new w(this._exit || this._groups.map(Bt), this._parents);
}
function Be(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function ze(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), c = 0; c < s; ++c)
    for (var u = n[c], l = r[c], f = u.length, h = a[c] = new Array(f), p, d = 0; d < f; ++d)
      (p = u[d] || l[d]) && (h[d] = p);
  for (; c < i; ++c)
    a[c] = n[c];
  return new w(a, this._parents);
}
function Ue() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Ke(t) {
  t || (t = We);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (c[l] = u);
    c.sort(e);
  }
  return new w(i, this._parents).order();
}
function We(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Je() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Qe() {
  return Array.from(this);
}
function Ze() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function je() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function tn() {
  return !this.node();
}
function en(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function nn(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function rn(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function on(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function sn(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function an(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function cn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function un(t, e) {
  var n = it(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? rn : nn : typeof e == "function" ? n.local ? cn : an : n.local ? sn : on)(n, e));
}
function zt(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ln(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function fn(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function hn(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function pn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? ln : typeof e == "function" ? hn : fn)(t, e, n ?? "")) : R(this.node(), t);
}
function R(t, e) {
  return t.style.getPropertyValue(e) || zt(t).getComputedStyle(t, null).getPropertyValue(e);
}
function dn(t) {
  return function() {
    delete this[t];
  };
}
function gn(t, e) {
  return function() {
    this[t] = e;
  };
}
function _n(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function yn(t, e) {
  return arguments.length > 1 ? this.each((e == null ? dn : typeof e == "function" ? _n : gn)(t, e)) : this.node()[t];
}
function Ut(t) {
  return t.trim().split(/^|\s+/);
}
function yt(t) {
  return t.classList || new Kt(t);
}
function Kt(t) {
  this._node = t, this._names = Ut(t.getAttribute("class") || "");
}
Kt.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Wt(t, e) {
  for (var n = yt(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Jt(t, e) {
  for (var n = yt(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function wn(t) {
  return function() {
    Wt(this, t);
  };
}
function vn(t) {
  return function() {
    Jt(this, t);
  };
}
function mn(t, e) {
  return function() {
    (e.apply(this, arguments) ? Wt : Jt)(this, t);
  };
}
function xn(t, e) {
  var n = Ut(t + "");
  if (arguments.length < 2) {
    for (var r = yt(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? mn : e ? wn : vn)(n, e));
}
function bn() {
  this.textContent = "";
}
function Nn(t) {
  return function() {
    this.textContent = t;
  };
}
function kn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function An(t) {
  return arguments.length ? this.each(t == null ? bn : (typeof t == "function" ? kn : Nn)(t)) : this.node().textContent;
}
function Sn() {
  this.innerHTML = "";
}
function En(t) {
  return function() {
    this.innerHTML = t;
  };
}
function $n(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Cn(t) {
  return arguments.length ? this.each(t == null ? Sn : (typeof t == "function" ? $n : En)(t)) : this.node().innerHTML;
}
function Tn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Mn() {
  return this.each(Tn);
}
function Rn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fn() {
  return this.each(Rn);
}
function In(t) {
  var e = typeof t == "function" ? t : Ot(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Dn() {
  return null;
}
function Gn(t, e) {
  var n = typeof t == "function" ? t : Ot(t), r = e == null ? Dn : typeof e == "function" ? e : _t(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Vn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function qn() {
  return this.each(Vn);
}
function Hn() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function On(t) {
  return this.select(t ? Xn : Hn);
}
function Pn(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ln(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Yn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Bn(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function zn(t, e, n) {
  return function() {
    var r = this.__on, i, o = Ln(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Un(t, e, n) {
  var r = Yn(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var c = 0, u = a.length, l; c < u; ++c)
        for (i = 0, l = a[c]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = e ? zn : Bn, i = 0; i < o; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Qt(t, e, n) {
  var r = zt(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Kn(t, e) {
  return function() {
    return Qt(this, t, e);
  };
}
function Wn(t, e) {
  return function() {
    return Qt(this, t, e.apply(this, arguments));
  };
}
function Jn(t, e) {
  return this.each((typeof e == "function" ? Wn : Kn)(t, e));
}
function* Qn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Zt = [null];
function w(t, e) {
  this._groups = t, this._parents = e;
}
function L() {
  return new w([[document.documentElement]], Zt);
}
function Zn() {
  return this;
}
w.prototype = L.prototype = {
  constructor: w,
  select: Ne,
  selectAll: Ee,
  selectChild: Me,
  selectChildren: De,
  filter: Ge,
  data: Pe,
  enter: Ve,
  exit: Ye,
  join: Be,
  merge: ze,
  selection: Zn,
  order: Ue,
  sort: Ke,
  call: Je,
  nodes: Qe,
  node: Ze,
  size: je,
  empty: tn,
  each: en,
  attr: un,
  style: pn,
  property: yn,
  classed: xn,
  text: An,
  html: Cn,
  raise: Mn,
  lower: Fn,
  append: In,
  insert: Gn,
  remove: qn,
  clone: On,
  datum: Pn,
  on: Un,
  dispatch: Jn,
  [Symbol.iterator]: Qn
};
function jn(t) {
  return typeof t == "string" ? new w([[document.querySelector(t)]], [document.documentElement]) : new w([[t]], Zt);
}
function wt(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function jt(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function Y() {
}
var H = 0.7, j = 1 / H, M = "\\s*([+-]?\\d+)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tr = /^#([0-9a-f]{3,8})$/, er = new RegExp(`^rgb\\(${M},${M},${M}\\)$`), nr = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), rr = new RegExp(`^rgba\\(${M},${M},${M},${X}\\)$`), ir = new RegExp(`^rgba\\(${x},${x},${x},${X}\\)$`), or = new RegExp(`^hsl\\(${X},${x},${x}\\)$`), sr = new RegExp(`^hsla\\(${X},${x},${x},${X}\\)$`), St = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
wt(Y, O, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Et,
  // Deprecated! Use color.formatHex.
  formatHex: Et,
  formatHex8: ar,
  formatHsl: cr,
  formatRgb: $t,
  toString: $t
});
function Et() {
  return this.rgb().formatHex();
}
function ar() {
  return this.rgb().formatHex8();
}
function cr() {
  return te(this).formatHsl();
}
function $t() {
  return this.rgb().formatRgb();
}
function O(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = tr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Ct(e) : n === 3 ? new _(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? z(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? z(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = er.exec(t)) ? new _(e[1], e[2], e[3], 1) : (e = nr.exec(t)) ? new _(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = rr.exec(t)) ? z(e[1], e[2], e[3], e[4]) : (e = ir.exec(t)) ? z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = or.exec(t)) ? Rt(e[1], e[2] / 100, e[3] / 100, 1) : (e = sr.exec(t)) ? Rt(e[1], e[2] / 100, e[3] / 100, e[4]) : St.hasOwnProperty(t) ? Ct(St[t]) : t === "transparent" ? new _(NaN, NaN, NaN, 0) : null;
}
function Ct(t) {
  return new _(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function z(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new _(t, e, n, r);
}
function ur(t) {
  return t instanceof Y || (t = O(t)), t ? (t = t.rgb(), new _(t.r, t.g, t.b, t.opacity)) : new _();
}
function lt(t, e, n, r) {
  return arguments.length === 1 ? ur(t) : new _(t, e, n, r ?? 1);
}
function _(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
wt(_, lt, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new _(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new _(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _($(this.r), $(this.g), $(this.b), tt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tt,
  // Deprecated! Use color.formatHex.
  formatHex: Tt,
  formatHex8: lr,
  formatRgb: Mt,
  toString: Mt
}));
function Tt() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}`;
}
function lr() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}${E((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mt() {
  const t = tt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${$(this.r)}, ${$(this.g)}, ${$(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function tt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function $(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function E(t) {
  return t = $(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Rt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new v(t, e, n, r);
}
function te(t) {
  if (t instanceof v)
    return new v(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = O(t)), !t)
    return new v();
  if (t instanceof v)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new v(s, a, c, t.opacity);
}
function fr(t, e, n, r) {
  return arguments.length === 1 ? te(t) : new v(t, e, n, r ?? 1);
}
function v(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
wt(v, fr, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new v(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new v(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new _(
      at(t >= 240 ? t - 240 : t + 120, i, r),
      at(t, i, r),
      at(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new v(Ft(this.h), U(this.s), U(this.l), tt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = tt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ft(this.h)}, ${U(this.s) * 100}%, ${U(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ft(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function U(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function at(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ee = (t) => () => t;
function hr(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function pr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function dr(t) {
  return (t = +t) == 1 ? ne : function(e, n) {
    return n - e ? pr(e, n, t) : ee(isNaN(e) ? n : e);
  };
}
function ne(t, e) {
  var n = e - t;
  return n ? hr(t, n) : ee(isNaN(t) ? e : t);
}
const It = function t(e) {
  var n = dr(e);
  function r(i, o) {
    var s = n((i = lt(i)).r, (o = lt(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), u = ne(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function A(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var ft = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ct = new RegExp(ft.source, "g");
function gr(t) {
  return function() {
    return t;
  };
}
function _r(t) {
  return function(e) {
    return t(e) + "";
  };
}
function yr(t, e) {
  var n = ft.lastIndex = ct.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = ft.exec(t)) && (i = ct.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: A(r, i) })), n = ct.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? _r(c[0].x) : gr(e) : (e = c.length, function(u) {
    for (var l = 0, f; l < e; ++l)
      a[(f = c[l]).i] = f.x(u);
    return a.join("");
  });
}
var Dt = 180 / Math.PI, ht = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function re(t, e, n, r, i, o) {
  var s, a, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Dt,
    skewX: Math.atan(c) * Dt,
    scaleX: s,
    scaleY: a
  };
}
var K;
function wr(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ht : re(e.a, e.b, e.c, e.d, e.e, e.f);
}
function vr(t) {
  return t == null || (K || (K = document.createElementNS("http://www.w3.org/2000/svg", "g")), K.setAttribute("transform", t), !(t = K.transform.baseVal.consolidate())) ? ht : (t = t.matrix, re(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ie(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, f, h, p, d) {
    if (u !== f || l !== h) {
      var g = p.push("translate(", null, e, null, n);
      d.push({ i: g - 4, x: A(u, f) }, { i: g - 2, x: A(l, h) });
    } else
      (f || h) && p.push("translate(" + f + e + h + n);
  }
  function s(u, l, f, h) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: A(u, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function a(u, l, f, h) {
    u !== l ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: A(u, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function c(u, l, f, h, p, d) {
    if (u !== f || l !== h) {
      var g = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: g - 4, x: A(u, f) }, { i: g - 2, x: A(l, h) });
    } else
      (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(u, l) {
    var f = [], h = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, f, h), s(u.rotate, l.rotate, f, h), a(u.skewX, l.skewX, f, h), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, f, h), u = l = null, function(p) {
      for (var d = -1, g = h.length, S; ++d < g; )
        f[(S = h[d]).i] = S.x(p);
      return f.join("");
    };
  };
}
var mr = ie(wr, "px, ", "px)", "deg)"), xr = ie(vr, ", ", ")", ")"), F = 0, G = 0, D = 0, oe = 1e3, et, V, nt = 0, C = 0, ot = 0, P = typeof performance == "object" && performance.now ? performance : Date, se = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function vt() {
  return C || (se(br), C = P.now() + ot);
}
function br() {
  C = 0;
}
function rt() {
  this._call = this._time = this._next = null;
}
rt.prototype = ae.prototype = {
  constructor: rt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? vt() : +n) + (e == null ? 0 : +e), !this._next && V !== this && (V ? V._next = this : et = this, V = this), this._call = t, this._time = n, pt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, pt());
  }
};
function ae(t, e, n) {
  var r = new rt();
  return r.restart(t, e, n), r;
}
function Nr() {
  vt(), ++F;
  for (var t = et, e; t; )
    (e = C - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --F;
}
function Gt() {
  C = (nt = P.now()) + ot, F = G = 0;
  try {
    Nr();
  } finally {
    F = 0, Ar(), C = 0;
  }
}
function kr() {
  var t = P.now(), e = t - nt;
  e > oe && (ot -= e, nt = t);
}
function Ar() {
  for (var t, e = et, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : et = n);
  V = t, pt(r);
}
function pt(t) {
  if (!F) {
    G && (G = clearTimeout(G));
    var e = t - C;
    e > 24 ? (t < 1 / 0 && (G = setTimeout(Gt, t - P.now() - ot)), D && (D = clearInterval(D))) : (D || (nt = P.now(), D = setInterval(kr, oe)), F = 1, se(Gt));
  }
}
function Vt(t, e, n) {
  var r = new rt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Sr = Xt("start", "end", "cancel", "interrupt"), Er = [], ce = 0, qt = 1, dt = 2, J = 3, Ht = 4, gt = 5, Q = 6;
function st(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  $r(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Sr,
    tween: Er,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ce
  });
}
function mt(t, e) {
  var n = m(t, e);
  if (n.state > ce)
    throw new Error("too late; already scheduled");
  return n;
}
function b(t, e) {
  var n = m(t, e);
  if (n.state > J)
    throw new Error("too late; already running");
  return n;
}
function m(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function $r(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = ae(o, 0, n.time);
  function o(u) {
    n.state = qt, n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay);
  }
  function s(u) {
    var l, f, h, p;
    if (n.state !== qt)
      return c();
    for (l in r)
      if (p = r[l], p.name === n.name) {
        if (p.state === J)
          return Vt(s);
        p.state === Ht ? (p.state = Q, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[l]) : +l < e && (p.state = Q, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[l]);
      }
    if (Vt(function() {
      n.state === J && (n.state = Ht, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = dt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === dt) {
      for (n.state = J, i = new Array(h = n.tween.length), l = 0, f = -1; l < h; ++l)
        (p = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = gt, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, l);
    n.state === gt && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Q, n.timer.stop(), delete r[e];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function Cr(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > dt && r.state < gt, r.state = Q, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Tr(t) {
  return this.each(function() {
    Cr(this, t);
  });
}
function Mr(t, e) {
  var n, r;
  return function() {
    var i = b(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Rr(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = b(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, c = 0, u = i.length; c < u; ++c)
        if (i[c].name === e) {
          i[c] = a;
          break;
        }
      c === u && i.push(a);
    }
    o.tween = i;
  };
}
function Fr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = m(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Mr : Rr)(n, t, e));
}
function xt(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = b(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return m(i, r).value[e];
  };
}
function ue(t, e) {
  var n;
  return (typeof e == "number" ? A : e instanceof O ? It : (n = O(e)) ? (e = n, It) : yr)(t, e);
}
function Ir(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Vr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function qr(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Hr(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = a + "", s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a)));
  };
}
function Xr(t, e) {
  var n = it(t), r = n === "transform" ? xr : ue;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Hr : qr)(n, r, xt(this, "attr." + t, e)) : e == null ? (n.local ? Dr : Ir)(n) : (n.local ? Vr : Gr)(n, r, e));
}
function Or(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Pr(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Lr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Pr(t, o)), n;
  }
  return i._value = e, i;
}
function Yr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Or(t, o)), n;
  }
  return i._value = e, i;
}
function Br(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = it(t);
  return this.tween(n, (r.local ? Lr : Yr)(r, e));
}
function zr(t, e) {
  return function() {
    mt(this, t).delay = +e.apply(this, arguments);
  };
}
function Ur(t, e) {
  return e = +e, function() {
    mt(this, t).delay = e;
  };
}
function Kr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? zr : Ur)(e, t)) : m(this.node(), e).delay;
}
function Wr(t, e) {
  return function() {
    b(this, t).duration = +e.apply(this, arguments);
  };
}
function Jr(t, e) {
  return e = +e, function() {
    b(this, t).duration = e;
  };
}
function Qr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wr : Jr)(e, t)) : m(this.node(), e).duration;
}
function Zr(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    b(this, t).ease = e;
  };
}
function jr(t) {
  var e = this._id;
  return arguments.length ? this.each(Zr(e, t)) : m(this.node(), e).ease;
}
function ti(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    b(this, t).ease = n;
  };
}
function ei(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ti(this._id, t));
}
function ni(t) {
  typeof t != "function" && (t = Lt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, u = 0; u < s; ++u)
      (c = o[u]) && t.call(c, c.__data__, u, o) && a.push(c);
  return new k(r, this._parents, this._name, this._id);
}
function ri(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], u = n[a], l = c.length, f = s[a] = new Array(l), h, p = 0; p < l; ++p)
      (h = c[p] || u[p]) && (f[p] = h);
  for (; a < r; ++a)
    s[a] = e[a];
  return new k(s, this._parents, this._name, this._id);
}
function ii(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function oi(t, e, n) {
  var r, i, o = ii(e) ? mt : b;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function si(t, e) {
  var n = this._id;
  return arguments.length < 2 ? m(this.node(), n).on.on(t) : this.each(oi(n, t, e));
}
function ai(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function ci() {
  return this.on("end.remove", ai(this._id));
}
function ui(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = _t(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, u = o[s] = new Array(c), l, f, h = 0; h < c; ++h)
      (l = a[h]) && (f = t.call(l, l.__data__, h, a)) && ("__data__" in l && (f.__data__ = l.__data__), u[h] = f, st(u[h], e, n, h, u, m(l, n)));
  return new k(o, this._parents, e, n);
}
function li(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Pt(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, f = 0; f < u; ++f)
      if (l = c[f]) {
        for (var h = t.call(l, l.__data__, f, c), p, d = m(l, n), g = 0, S = h.length; g < S; ++g)
          (p = h[g]) && st(p, e, n, g, h, d);
        o.push(h), s.push(l);
      }
  return new k(o, s, e, n);
}
var fi = L.prototype.constructor;
function hi() {
  return new fi(this._groups, this._parents);
}
function pi(t, e) {
  var n, r, i;
  return function() {
    var o = R(this, t), s = (this.style.removeProperty(t), R(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function le(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function di(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = R(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function gi(t, e, n) {
  var r, i, o;
  return function() {
    var s = R(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), R(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function _i(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = b(this, t), u = c.on, l = c.value[o] == null ? a || (a = le(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(s, i = l), c.on = r;
  };
}
function yi(t, e, n) {
  var r = (t += "") == "transform" ? mr : ue;
  return e == null ? this.styleTween(t, pi(t, r)).on("end.style." + t, le(t)) : typeof e == "function" ? this.styleTween(t, gi(t, r, xt(this, "style." + t, e))).each(_i(this._id, t)) : this.styleTween(t, di(t, r, e), n).on("end.style." + t, null);
}
function wi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function vi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && wi(t, s, n)), r;
  }
  return o._value = e, o;
}
function mi(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, vi(t, e, n ?? ""));
}
function xi(t) {
  return function() {
    this.textContent = t;
  };
}
function bi(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ni(t) {
  return this.tween("text", typeof t == "function" ? bi(xt(this, "text", t)) : xi(t == null ? "" : t + ""));
}
function ki(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ai(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ki(i)), e;
  }
  return r._value = t, r;
}
function Si(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ai(t));
}
function Ei() {
  for (var t = this._name, e = this._id, n = fe(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      if (c = s[u]) {
        var l = m(c, e);
        st(c, t, n, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new k(r, this._parents, t, n);
}
function $i() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var u = b(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && o();
  });
}
var Ci = 0;
function k(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function fe() {
  return ++Ci;
}
var N = L.prototype;
k.prototype = {
  constructor: k,
  select: ui,
  selectAll: li,
  selectChild: N.selectChild,
  selectChildren: N.selectChildren,
  filter: ni,
  merge: ri,
  selection: hi,
  transition: Ei,
  call: N.call,
  nodes: N.nodes,
  node: N.node,
  size: N.size,
  empty: N.empty,
  each: N.each,
  on: si,
  attr: Xr,
  attrTween: Br,
  style: yi,
  styleTween: mi,
  text: Ni,
  textTween: Si,
  remove: ci,
  tween: Fr,
  delay: Kr,
  duration: Qr,
  ease: jr,
  easeVarying: ei,
  end: $i,
  [Symbol.iterator]: N[Symbol.iterator]
};
const Ti = (t) => +t;
function Mi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ri = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Mi
};
function Fi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ii(t) {
  var e, n;
  t instanceof k ? (e = t._id, t = t._name) : (e = fe(), (n = Ri).time = vt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, u = 0; u < a; ++u)
      (c = s[u]) && st(c, t, e, u, s, n || Fi(c, e));
  return new k(r, this._parents, t, e);
}
L.prototype.interrupt = Tr;
L.prototype.transition = Ii;
function q(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
q.prototype = {
  constructor: q,
  scale: function(t) {
    return t === 1 ? this : new q(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new q(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
q.prototype;
const y = (t, e) => {
  const n = document.querySelector(t);
  if (n === null)
    throw new Error("Cannot find selector " + t);
  if (e !== void 0 && !(n instanceof e))
    throw new Error(`Selector ${t} not of type ${e}`);
  return n;
}, Di = (t) => {
  const e = y("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const n = y("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const r = y("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Gi = (t) => {
  const e = y("svg.purpose g.target", SVGGElement);
  t.createCircle(e, 150, 50, 40), t.createCircle(e, 150, 50, 30), t.createCircle(e, 150, 50, 20), t.createCircle(e, 150, 50, 10), t.createCircle(e, 150, 50, 1);
}, Vi = (t) => {
  const e = y("svg.hick g.choice-01", SVGGElement);
  t.createForm(
    e,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,40" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const n = y("svg.hick g.choice-02", SVGGElement);
  t.createForm(
    n,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const r = y("svg.hick g.choice-03", SVGGElement);
  t.createForm(
    r,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,40 40,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const i = y("svg.hick g.choice-04", SVGGElement);
  t.createForm(
    i,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 20,40 40,0" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const o = y("svg.hick g.choice-05", SVGGElement);
  t.createForm(
    o,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,20" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const s = y("svg.hick g.choice-06", SVGGElement);
  t.createForm(
    s,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,40 40,40 20,0" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
}, qi = (t) => {
  const e = y("svg.jakob g.app-1", SVGGElement);
  t.createCircle(e, 40, 50, 35);
  const n = y("svg.jakob g.app-2", SVGGElement);
  t.createCircle(n, 40, 50, 35);
  const r = y("svg.jakob g.your-app", SVGGElement);
  t.createCircle(r, 40, 50, 35);
}, he = {
  "02-fitts": [Di],
  "01-purpose": [Gi],
  "03-hick": [Vi],
  "04-jakob": [qi]
}, pe = /* @__PURE__ */ new Set();
for (const t of Object.values(he))
  for (const e of t)
    pe.add(e);
const Hi = [...pe];
class Xi {
  constructor() {
    T(this, "delayCounter", 0);
    T(this, "delayIncrement", 100);
    T(this, "useTransition", !1);
    T(this, "svgName");
    T(this, "createForm", (e, n, r, i, o) => {
      const s = { duration: 2e3, delay: 1e3, ...o };
      this.useTransition || (s.delay = 0, s.duration = 0);
      const a = jn(e).append(n);
      for (const [u, l] of Object.entries(r))
        a.attr(u, l);
      const c = a.transition().duration(s.duration).delay(s.delay).ease(Ti);
      for (const [u, l] of Object.entries(i))
        c.attr(u, l);
    });
    this.initSvgName();
  }
  initSvgName() {
    const e = window.location.pathname.match(/^.*\/cards\/(.*)(.html)$/);
    if (console.log("regex: ", e), e instanceof Array && e.length > 2) {
      this.svgName = e[1], this.useTransition = !0;
      return;
    }
    this.useTransition = !1;
  }
  initSvg() {
    const e = this.svgName ? he[this.svgName] : Hi;
    if (e !== void 0)
      for (const n of e)
        n(this);
  }
  getDelay() {
    return this.delayCounter += this.delayIncrement, this.delayCounter;
  }
  createCircle(e, n, r, i) {
    return this.createForm(
      e,
      "circle",
      {
        cx: n,
        cy: r,
        r: 0
      },
      { r: i },
      {
        duration: 300,
        delay: this.getDelay()
      }
    );
  }
  createPolygon(e, n) {
    return this.createForm(
      e,
      "polygon",
      { points: "" },
      { points: n },
      {
        duration: 300,
        delay: this.getDelay()
      }
    );
  }
}
const Oi = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
Oi();
const Pi = new Xi();
Pi.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3ZnQ29uZmlnLnRzIiwiLi4vLi4vLi4vc3JjL1NWR1Rvb2wudHMiLCIuLi8uLi8uLi9zcmMvdGhlbWUudHMiLCIuLi8uLi8uLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IHt2YWx1ZTogKCkgPT4ge319O1xuXG5mdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBfID0ge30sIHQ7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoISh0ID0gYXJndW1lbnRzW2ldICsgXCJcIikgfHwgKHQgaW4gXykgfHwgL1tcXHMuXS8udGVzdCh0KSkgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0eXBlOiBcIiArIHQpO1xuICAgIF9bdF0gPSBbXTtcbiAgfVxuICByZXR1cm4gbmV3IERpc3BhdGNoKF8pO1xufVxuXG5mdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gIHRoaXMuXyA9IF87XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIGlmICh0ICYmICF0eXBlcy5oYXNPd25Qcm9wZXJ0eSh0KSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHQpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5EaXNwYXRjaC5wcm90b3R5cGUgPSBkaXNwYXRjaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgb246IGZ1bmN0aW9uKHR5cGVuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBfID0gdGhpcy5fLFxuICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgdCxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAvLyBJZiBubyBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZXR1cm4gdGhlIGNhbGxiYWNrIG9mIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSBudWxsIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJlbW92ZSBjYWxsYmFja3Mgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgY2FsbGJhY2s6IFwiICsgY2FsbGJhY2spO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgY2FsbGJhY2spO1xuICAgICAgZWxzZSBpZiAoY2FsbGJhY2sgPT0gbnVsbCkgZm9yICh0IGluIF8pIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3B5ID0ge30sIF8gPSB0aGlzLl87XG4gICAgZm9yICh2YXIgdCBpbiBfKSBjb3B5W3RdID0gX1t0XS5zbGljZSgpO1xuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uKHR5cGUsIHRoYXQpIHtcbiAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbih0eXBlLCB0aGF0LCBhcmdzKSB7XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoLCBjOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKChjID0gdHlwZVtpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldCh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgdHlwZVtpXSA9IG5vb3AsIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpLmNvbmNhdCh0eXBlLnNsaWNlKGkgKyAxKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHR5cGUucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IGNhbGxiYWNrfSk7XG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaDtcbiIsImV4cG9ydCB2YXIgeGh0bWwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcbiIsImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4vbmFtZXNwYWNlLmpzXCI7XG5pbXBvcnQge3hodG1sfSBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0b3JJbmhlcml0KG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCxcbiAgICAgICAgdXJpID0gdGhpcy5uYW1lc3BhY2VVUkk7XG4gICAgcmV0dXJuIHVyaSA9PT0geGh0bWwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0geGh0bWxcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0b3JGaXhlZChmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59XG4iLCJmdW5jdGlvbiBub25lKCkge31cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBub25lIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCIvLyBHaXZlbiBzb21ldGhpbmcgYXJyYXkgbGlrZSAob3IgbnVsbCksIHJldHVybnMgc29tZXRoaW5nIHRoYXQgaXMgc3RyaWN0bHkgYW5cbi8vIGFycmF5LiBUaGlzIGlzIHVzZWQgdG8gZW5zdXJlIHRoYXQgYXJyYXktbGlrZSBvYmplY3RzIHBhc3NlZCB0byBkMy5zZWxlY3RBbGxcbi8vIG9yIHNlbGVjdGlvbi5zZWxlY3RBbGwgYXJlIGNvbnZlcnRlZCBpbnRvIHByb3BlciBhcnJheXMgd2hlbiBjcmVhdGluZyBhXG4vLyBzZWxlY3Rpb247IHdlIGRvbuKAmXQgZXZlciB3YW50IHRvIGNyZWF0ZSBhIHNlbGVjdGlvbiBiYWNrZWQgYnkgYSBsaXZlXG4vLyBIVE1MQ29sbGVjdGlvbiBvciBOb2RlTGlzdC4gSG93ZXZlciwgbm90ZSB0aGF0IHNlbGVjdGlvbi5zZWxlY3RBbGwgd2lsbCB1c2UgYVxuLy8gc3RhdGljIE5vZGVMaXN0IGFzIGEgZ3JvdXAsIHNpbmNlIGl0IHNhZmVseSBkZXJpdmVkIGZyb20gcXVlcnlTZWxlY3RvckFsbC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbCA/IFtdIDogQXJyYXkuaXNBcnJheSh4KSA/IHggOiBBcnJheS5mcm9tKHgpO1xufVxuIiwiZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgYXJyYXkgZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsLmpzXCI7XG5cbmZ1bmN0aW9uIGFycmF5QWxsKHNlbGVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFycmF5KHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IGFycmF5QWxsKHNlbGVjdCk7XG4gIGVsc2Ugc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTWF0Y2hlcihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuXG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbmQgPSBBcnJheS5wcm90b3R5cGUuZmluZDtcblxuZnVuY3Rpb24gY2hpbGRGaW5kKG1hdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmluZC5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hpbGRGaXJzdCgpIHtcbiAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChtYXRjaCA9PSBudWxsID8gY2hpbGRGaXJzdFxuICAgICAgOiBjaGlsZEZpbmQodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmlsdGVyID0gQXJyYXkucHJvdG90eXBlLmZpbHRlcjtcblxuZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkZpbHRlcihtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsKG1hdGNoID09IG51bGwgPyBjaGlsZHJlblxuICAgICAgOiBjaGlsZHJlbkZpbHRlcih0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2hlciBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHVwZGF0ZS5sZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtFbnRlck5vZGV9IGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4uL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGJpbmRJbmRleChwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG5vZGUsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZml0IGludG8gdXBkYXRlLlxuICAvLyBQdXQgYW55IG51bGwgbm9kZXMgaW50byBlbnRlci5cbiAgLy8gUHV0IGFueSByZW1haW5pbmcgZGF0YSBpbnRvIGVudGVyLlxuICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGRvbuKAmXQgZml0IGludG8gZXhpdC5cbiAgZm9yICg7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRLZXkocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSwga2V5KSB7XG4gIHZhciBpLFxuICAgICAgbm9kZSxcbiAgICAgIG5vZGVCeUtleVZhbHVlID0gbmV3IE1hcCxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAga2V5VmFsdWVzID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKSxcbiAgICAgIGtleVZhbHVlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBub2RlLlxuICAvLyBJZiBtdWx0aXBsZSBub2RlcyBoYXZlIHRoZSBzYW1lIGtleSwgdGhlIGR1cGxpY2F0ZXMgYXJlIGFkZGVkIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAga2V5VmFsdWVzW2ldID0ga2V5VmFsdWUgPSBrZXkuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkgKyBcIlwiO1xuICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHtcbiAgICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBkYXR1bS5cbiAgLy8gSWYgdGhlcmUgYSBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSwgam9pbiBhbmQgYWRkIGl0IHRvIHVwZGF0ZS5cbiAgLy8gSWYgdGhlcmUgaXMgbm90IChvciB0aGUga2V5IGlzIGEgZHVwbGljYXRlKSwgYWRkIGl0IHRvIGVudGVyLlxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAga2V5VmFsdWUgPSBrZXkuY2FsbChwYXJlbnQsIGRhdGFbaV0sIGksIGRhdGEpICsgXCJcIjtcbiAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZSkpIHtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIG5vZGVCeUtleVZhbHVlLmRlbGV0ZShrZXlWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBhbnkgcmVtYWluaW5nIG5vZGVzIHRoYXQgd2VyZSBub3QgYm91bmQgdG8gZGF0YSB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAobm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlc1tpXSkgPT09IG5vZGUpKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0dW0obm9kZSkge1xuICByZXR1cm4gbm9kZS5fX2RhdGFfXztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBBcnJheS5mcm9tKHRoaXMsIGRhdHVtKTtcblxuICB2YXIgYmluZCA9IGtleSA/IGJpbmRLZXkgOiBiaW5kSW5kZXgsXG4gICAgICBwYXJlbnRzID0gdGhpcy5fcGFyZW50cyxcbiAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHZhbHVlID0gY29uc3RhbnQodmFsdWUpO1xuXG4gIGZvciAodmFyIG0gPSBncm91cHMubGVuZ3RoLCB1cGRhdGUgPSBuZXcgQXJyYXkobSksIGVudGVyID0gbmV3IEFycmF5KG0pLCBleGl0ID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2pdLFxuICAgICAgICBncm91cCA9IGdyb3Vwc1tqXSxcbiAgICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICAgIGRhdGEgPSBhcnJheWxpa2UodmFsdWUuY2FsbChwYXJlbnQsIHBhcmVudCAmJiBwYXJlbnQuX19kYXRhX18sIGosIHBhcmVudHMpKSxcbiAgICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAgICBlbnRlckdyb3VwID0gZW50ZXJbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIHVwZGF0ZUdyb3VwID0gdXBkYXRlW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICBleGl0R3JvdXAgPSBleGl0W2pdID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKTtcblxuICAgIGJpbmQocGFyZW50LCBncm91cCwgZW50ZXJHcm91cCwgdXBkYXRlR3JvdXAsIGV4aXRHcm91cCwgZGF0YSwga2V5KTtcblxuICAgIC8vIE5vdyBjb25uZWN0IHRoZSBlbnRlciBub2RlcyB0byB0aGVpciBmb2xsb3dpbmcgdXBkYXRlIG5vZGUsIHN1Y2ggdGhhdFxuICAgIC8vIGFwcGVuZENoaWxkIGNhbiBpbnNlcnQgdGhlIG1hdGVyaWFsaXplZCBlbnRlciBub2RlIGJlZm9yZSB0aGlzIG5vZGUsXG4gICAgLy8gcmF0aGVyIHRoYW4gYXQgdGhlIGVuZCBvZiB0aGUgcGFyZW50IG5vZGUuXG4gICAgZm9yICh2YXIgaTAgPSAwLCBpMSA9IDAsIHByZXZpb3VzLCBuZXh0OyBpMCA8IGRhdGFMZW5ndGg7ICsraTApIHtcbiAgICAgIGlmIChwcmV2aW91cyA9IGVudGVyR3JvdXBbaTBdKSB7XG4gICAgICAgIGlmIChpMCA+PSBpMSkgaTEgPSBpMCArIDE7XG4gICAgICAgIHdoaWxlICghKG5leHQgPSB1cGRhdGVHcm91cFtpMV0pICYmICsraTEgPCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgcHJldmlvdXMuX25leHQgPSBuZXh0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlID0gbmV3IFNlbGVjdGlvbih1cGRhdGUsIHBhcmVudHMpO1xuICB1cGRhdGUuX2VudGVyID0gZW50ZXI7XG4gIHVwZGF0ZS5fZXhpdCA9IGV4aXQ7XG4gIHJldHVybiB1cGRhdGU7XG59XG5cbi8vIEdpdmVuIHNvbWUgZGF0YSwgdGhpcyByZXR1cm5zIGFuIGFycmF5LWxpa2UgdmlldyBvZiBpdDogYW4gb2JqZWN0IHRoYXRcbi8vIGV4cG9zZXMgYSBsZW5ndGggcHJvcGVydHkgYW5kIGFsbG93cyBudW1lcmljIGluZGV4aW5nLiBOb3RlIHRoYXQgdW5saWtlXG4vLyBzZWxlY3RBbGwsIHRoaXMgaXNu4oCZdCB3b3JyaWVkIGFib3V0IOKAnGxpdmXigJ0gY29sbGVjdGlvbnMgYmVjYXVzZSB0aGUgcmVzdWx0aW5nXG4vLyBhcnJheSB3aWxsIG9ubHkgYmUgdXNlZCBicmllZmx5IHdoaWxlIGRhdGEgaXMgYmVpbmcgYm91bmQuIChJdCBpcyBwb3NzaWJsZSB0b1xuLy8gY2F1c2UgdGhlIGRhdGEgdG8gY2hhbmdlIHdoaWxlIGl0ZXJhdGluZyBieSB1c2luZyBhIGtleSBmdW5jdGlvbiwgYnV0IHBsZWFzZVxuLy8gZG9u4oCZdDsgd2XigJlkIHJhdGhlciBhdm9pZCBhIGdyYXR1aXRvdXMgY29weS4pXG5mdW5jdGlvbiBhcnJheWxpa2UoZGF0YSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBkYXRhXG4gICAgPyBkYXRhIC8vIEFycmF5LCBUeXBlZEFycmF5LCBOb2RlTGlzdCwgYXJyYXktbGlrZVxuICAgIDogQXJyYXkuZnJvbShkYXRhKTsgLy8gTWFwLCBTZXQsIGl0ZXJhYmxlLCBzdHJpbmcsIG9yIGFueXRoaW5nIGVsc2Vcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2V4aXQgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9uZW50ZXIsIG9udXBkYXRlLCBvbmV4aXQpIHtcbiAgdmFyIGVudGVyID0gdGhpcy5lbnRlcigpLCB1cGRhdGUgPSB0aGlzLCBleGl0ID0gdGhpcy5leGl0KCk7XG4gIGlmICh0eXBlb2Ygb25lbnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZW50ZXIgPSBvbmVudGVyKGVudGVyKTtcbiAgICBpZiAoZW50ZXIpIGVudGVyID0gZW50ZXIuc2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgZW50ZXIgPSBlbnRlci5hcHBlbmQob25lbnRlciArIFwiXCIpO1xuICB9XG4gIGlmIChvbnVwZGF0ZSAhPSBudWxsKSB7XG4gICAgdXBkYXRlID0gb251cGRhdGUodXBkYXRlKTtcbiAgICBpZiAodXBkYXRlKSB1cGRhdGUgPSB1cGRhdGUuc2VsZWN0aW9uKCk7XG4gIH1cbiAgaWYgKG9uZXhpdCA9PSBudWxsKSBleGl0LnJlbW92ZSgpOyBlbHNlIG9uZXhpdChleGl0KTtcbiAgcmV0dXJuIGVudGVyICYmIHVwZGF0ZSA/IGVudGVyLm1lcmdlKHVwZGF0ZSkub3JkZXIoKSA6IHVwZGF0ZTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHZhciBzZWxlY3Rpb24gPSBjb250ZXh0LnNlbGVjdGlvbiA/IGNvbnRleHQuc2VsZWN0aW9uKCkgOiBjb250ZXh0O1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSBzZWxlY3Rpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IC0xLCBtID0gZ3JvdXBzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGlmIChuZXh0ICYmIG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24obmV4dCkgXiA0KSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb21wYXJlKSB7XG4gIGlmICghY29tcGFyZSkgY29tcGFyZSA9IGFzY2VuZGluZztcblxuICBmdW5jdGlvbiBjb21wYXJlTm9kZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGNvbXBhcmUoYS5fX2RhdGFfXywgYi5fX2RhdGFfXykgOiAhYSAtICFiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc29ydGdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc29ydGdyb3VwID0gc29ydGdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc29ydGdyb3VwW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ydGdyb3VwLnNvcnQoY29tcGFyZU5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc29ydGdyb3VwcywgdGhpcy5fcGFyZW50cykub3JkZXIoKTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgYXJndW1lbnRzWzBdID0gdGhpcztcbiAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIG5vZGUgPSBncm91cFtpXTtcbiAgICAgIGlmIChub2RlKSByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBsZXQgc2l6ZSA9IDA7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzKSArK3NpemU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuIHNpemU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLm5vZGUoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi4vbmFtZXNwYWNlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHYpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdik7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgIHJldHVybiBmdWxsbmFtZS5sb2NhbFxuICAgICAgICA/IG5vZGUuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKVxuICAgICAgICA6IG5vZGUuZ2V0QXR0cmlidXRlKGZ1bGxuYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KSkpKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gKG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIC8vIG5vZGUgaXMgYSBOb2RlXG4gICAgICB8fCAobm9kZS5kb2N1bWVudCAmJiBub2RlKSAvLyBub2RlIGlzIGEgV2luZG93XG4gICAgICB8fCBub2RlLmRlZmF1bHRWaWV3OyAvLyBub2RlIGlzIGEgRG9jdW1lbnRcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbHVlLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdiwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgPyBzdHlsZVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IHN0eWxlRnVuY3Rpb25cbiAgICAgICAgICAgIDogc3R5bGVDb25zdGFudCkobmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKVxuICAgICAgOiBzdHlsZVZhbHVlKHRoaXMubm9kZSgpLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVmFsdWUobm9kZSwgbmFtZSkge1xuICByZXR1cm4gbm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpXG4gICAgICB8fCBkZWZhdWx0Vmlldyhub2RlKS5nZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG59XG4iLCJmdW5jdGlvbiBwcm9wZXJ0eVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1tuYW1lXSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgZWxzZSB0aGlzW25hbWVdID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gcHJvcGVydHlSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gcHJvcGVydHlGdW5jdGlvblxuICAgICAgICAgIDogcHJvcGVydHlDb25zdGFudCkobmFtZSwgdmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKVtuYW1lXTtcbn1cbiIsImZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufVxuIiwiZnVuY3Rpb24gdGV4dFJlbW92ZSgpIHtcbiAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyB0ZXh0UmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0ZXh0RnVuY3Rpb25cbiAgICAgICAgICA6IHRleHRDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbn1cbiIsImZ1bmN0aW9uIGh0bWxSZW1vdmUoKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaHRtbENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBodG1sRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gaHRtbFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gaHRtbEZ1bmN0aW9uXG4gICAgICAgICAgOiBodG1sQ29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xufVxuIiwiZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJhaXNlKTtcbn1cbiIsImZ1bmN0aW9uIGxvd2VyKCkge1xuICBpZiAodGhpcy5wcmV2aW91c1NpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChsb3dlcik7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyZW1vdmUpO1xufVxuIiwiZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lU2hhbGxvdygpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUoZmFsc2UpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVEZWVwKCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVlcCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZGVlcCA/IHNlbGVjdGlvbl9jbG9uZURlZXAgOiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCJmdW5jdGlvbiBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdGhpcy5fX2RhdGFfXyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uUmVtb3ZlKHR5cGVuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb247XG4gICAgaWYgKCFvbikgcmV0dXJuO1xuICAgIGZvciAodmFyIGogPSAwLCBpID0gLTEsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGlmIChvID0gb25bal0sICghdHlwZW5hbWUudHlwZSB8fCBvLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUpICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25bKytpXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgrK2kpIG9uLmxlbmd0aCA9IGk7XG4gICAgZWxzZSBkZWxldGUgdGhpcy5fX29uO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbkFkZCh0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbiwgbywgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIodmFsdWUpO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8ub3B0aW9ucyA9IG9wdGlvbnMpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBvcHRpb25zOiBvcHRpb25zfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGVuYW1lcyA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiksIGksIG4gPSB0eXBlbmFtZXMubGVuZ3RoLCB0O1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBvbiA9IHRoaXMubm9kZSgpLl9fb247XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgZm9yIChpID0gMCwgbyA9IG9uW2pdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICgodCA9IHR5cGVuYW1lc1tpXSkudHlwZSA9PT0gby50eXBlICYmIHQubmFtZSA9PT0gby5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb24gPSB2YWx1ZSA/IG9uQWRkIDogb25SZW1vdmU7XG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHRoaXMuZWFjaChvbih0eXBlbmFtZXNbaV0sIHZhbHVlLCBvcHRpb25zKSk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3cuanNcIjtcblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlLCB0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlZmF1bHRWaWV3KG5vZGUpLFxuICAgICAgZXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5cbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnQgPSBuZXcgZXZlbnQodHlwZSwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGlmIChwYXJhbXMpIGV2ZW50LmluaXRFdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUpLCBldmVudC5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIGVsc2UgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaENvbnN0YW50KHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hGdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBkaXNwYXRjaEZ1bmN0aW9uXG4gICAgICA6IGRpc3BhdGNoQ29uc3RhbnQpKHR5cGUsIHBhcmFtcykpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgeWllbGQgbm9kZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzZWxlY3Rpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkIGZyb20gXCIuL3NlbGVjdENoaWxkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIGZyb20gXCIuL3NlbGVjdENoaWxkcmVuLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0YSBmcm9tIFwiLi9kYXRhLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VudGVyIGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2V4aXQgZnJvbSBcIi4vZXhpdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9qb2luIGZyb20gXCIuL2pvaW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb3JkZXIgZnJvbSBcIi4vb3JkZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc29ydCBmcm9tIFwiLi9zb3J0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NhbGwgZnJvbSBcIi4vY2FsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlcyBmcm9tIFwiLi9ub2Rlcy5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlIGZyb20gXCIuL25vZGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2l6ZSBmcm9tIFwiLi9zaXplLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VtcHR5IGZyb20gXCIuL2VtcHR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VhY2ggZnJvbSBcIi4vZWFjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcHJvcGVydHkgZnJvbSBcIi4vcHJvcGVydHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xhc3NlZCBmcm9tIFwiLi9jbGFzc2VkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9odG1sIGZyb20gXCIuL2h0bWwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmFpc2UgZnJvbSBcIi4vcmFpc2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbG93ZXIgZnJvbSBcIi4vbG93ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXBwZW5kIGZyb20gXCIuL2FwcGVuZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnNlcnQgZnJvbSBcIi4vaW5zZXJ0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xvbmUgZnJvbSBcIi4vY2xvbmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0dW0gZnJvbSBcIi4vZGF0dW0uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGlzcGF0Y2ggZnJvbSBcIi4vZGlzcGF0Y2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faXRlcmF0b3IgZnJvbSBcIi4vaXRlcmF0b3IuanNcIjtcblxuZXhwb3J0IHZhciByb290ID0gW251bGxdO1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0aW9uKGdyb3VwcywgcGFyZW50cykge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XV0sIHJvb3QpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fc2VsZWN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuU2VsZWN0aW9uLnByb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBTZWxlY3Rpb24sXG4gIHNlbGVjdDogc2VsZWN0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiBzZWxlY3Rpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3NlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHNlbGVjdGlvbl9maWx0ZXIsXG4gIGRhdGE6IHNlbGVjdGlvbl9kYXRhLFxuICBlbnRlcjogc2VsZWN0aW9uX2VudGVyLFxuICBleGl0OiBzZWxlY3Rpb25fZXhpdCxcbiAgam9pbjogc2VsZWN0aW9uX2pvaW4sXG4gIG1lcmdlOiBzZWxlY3Rpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogc2VsZWN0aW9uX3NlbGVjdGlvbixcbiAgb3JkZXI6IHNlbGVjdGlvbl9vcmRlcixcbiAgc29ydDogc2VsZWN0aW9uX3NvcnQsXG4gIGNhbGw6IHNlbGVjdGlvbl9jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX25vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fbm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3NpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9lYWNoLFxuICBhdHRyOiBzZWxlY3Rpb25fYXR0cixcbiAgc3R5bGU6IHNlbGVjdGlvbl9zdHlsZSxcbiAgcHJvcGVydHk6IHNlbGVjdGlvbl9wcm9wZXJ0eSxcbiAgY2xhc3NlZDogc2VsZWN0aW9uX2NsYXNzZWQsXG4gIHRleHQ6IHNlbGVjdGlvbl90ZXh0LFxuICBodG1sOiBzZWxlY3Rpb25faHRtbCxcbiAgcmFpc2U6IHNlbGVjdGlvbl9yYWlzZSxcbiAgbG93ZXI6IHNlbGVjdGlvbl9sb3dlcixcbiAgYXBwZW5kOiBzZWxlY3Rpb25fYXBwZW5kLFxuICBpbnNlcnQ6IHNlbGVjdGlvbl9pbnNlcnQsXG4gIHJlbW92ZTogc2VsZWN0aW9uX3JlbW92ZSxcbiAgY2xvbmU6IHNlbGVjdGlvbl9jbG9uZSxcbiAgZGF0dW06IHNlbGVjdGlvbl9kYXR1bSxcbiAgb246IHNlbGVjdGlvbl9vbixcbiAgZGlzcGF0Y2g6IHNlbGVjdGlvbl9kaXNwYXRjaCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9pdGVyYXRvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW9uO1xuIiwiaW1wb3J0IHtTZWxlY3Rpb24sIHJvb3R9IGZyb20gXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiXG4gICAgICA/IG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKV1dLCBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XSlcbiAgICAgIDogbmV3IFNlbGVjdGlvbihbW3NlbGVjdG9yXV0sIHJvb3QpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uc3RydWN0b3IsIGZhY3RvcnksIHByb3RvdHlwZSkge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBmYWN0b3J5LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgcHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQocGFyZW50LCBkZWZpbml0aW9uKSB7XG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuICBmb3IgKHZhciBrZXkgaW4gZGVmaW5pdGlvbikgcHJvdG90eXBlW2tleV0gPSBkZWZpbml0aW9uW2tleV07XG4gIHJldHVybiBwcm90b3R5cGU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KVxcXFxzKlwiLFxuICAgIHJlUCA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9XFxcXCkkYCksXG4gICAgcmVSZ2JQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlUmdiYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbFxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZUhzbGFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbGFcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5KGNoYW5uZWxzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IHRoaXMuY29uc3RydWN0b3IsIHRoaXMsIGNoYW5uZWxzKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiBjb2xvcl9mb3JtYXRIZXg4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXg4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IFJnYihjbGFtcGkodGhpcy5yKSwgY2xhbXBpKHRoaXMuZyksIGNsYW1waSh0aGlzLmIpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogcmdiX2Zvcm1hdEhleDgsXG4gIGZvcm1hdFJnYjogcmdiX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IHJnYl9mb3JtYXRSZ2Jcbn0pKTtcblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfSR7aGV4KChpc05hTih0aGlzLm9wYWNpdHkpID8gMSA6IHRoaXMub3BhY2l0eSkgKiAyNTUpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgcmV0dXJuIGAke2EgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIn0ke2NsYW1waSh0aGlzLnIpfSwgJHtjbGFtcGkodGhpcy5nKX0sICR7Y2xhbXBpKHRoaXMuYil9JHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbn1cblxuZnVuY3Rpb24gY2xhbXBhKG9wYWNpdHkpIHtcbiAgcmV0dXJuIGlzTmFOKG9wYWNpdHkpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG9wYWNpdHkpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXBpKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodmFsdWUpIHx8IDApKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gY2xhbXBpKHZhbHVlKTtcbiAgcmV0dXJuICh2YWx1ZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIHZhbHVlLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gaHNsYShoLCBzLCBsLCBhKSB7XG4gIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgZWxzZSBpZiAobCA8PSAwIHx8IGwgPj0gMSkgaCA9IHMgPSBOYU47XG4gIGVsc2UgaWYgKHMgPD0gMCkgaCA9IE5hTjtcbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBuZXcgSHNsKG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBvO1xuICBvID0gby5yZ2IoKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICBoID0gTmFOLFxuICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChzKSB7XG4gICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgZWxzZSBpZiAoZyA9PT0gbWF4KSBoID0gKGIgLSByKSAvIHMgKyAyO1xuICAgIGVsc2UgaCA9IChyIC0gZykgLyBzICsgNDtcbiAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgIGggKj0gNjA7XG4gIH0gZWxzZSB7XG4gICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gIH1cbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5mdW5jdGlvbiBIc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5zID0gK3M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKEhzbCwgaHNsLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICBzID0gaXNOYU4oaCkgfHwgaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMsXG4gICAgICAgIGwgPSB0aGlzLmwsXG4gICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgIG0xID0gMiAqIGwgLSBtMjtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCA8IDEyMCA/IGggKyAyNDAgOiBoIC0gMTIwLCBtMSwgbTIpLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBIc2woY2xhbXBoKHRoaXMuaCksIGNsYW1wdCh0aGlzLnMpLCBjbGFtcHQodGhpcy5sKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsKCkge1xuICAgIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgICByZXR1cm4gYCR7YSA9PT0gMSA/IFwiaHNsKFwiIDogXCJoc2xhKFwifSR7Y2xhbXBoKHRoaXMuaCl9LCAke2NsYW1wdCh0aGlzLnMpICogMTAwfSUsICR7Y2xhbXB0KHRoaXMubCkgKiAxMDB9JSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG4gIH1cbn0pKTtcblxuZnVuY3Rpb24gY2xhbXBoKHZhbHVlKSB7XG4gIHZhbHVlID0gKHZhbHVlIHx8IDApICUgMzYwO1xuICByZXR1cm4gdmFsdWUgPCAwID8gdmFsdWUgKyAzNjAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2xhbXB0KHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSB8fCAwKSk7XG59XG5cbi8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbmZ1bmN0aW9uIGhzbDJyZ2IoaCwgbTEsIG0yKSB7XG4gIHJldHVybiAoaCA8IDYwID8gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjBcbiAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICA6IGggPCAyNDAgPyBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwXG4gICAgICA6IG0xKSAqIDI1NTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHggPT4gKCkgPT4geDtcbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBsaW5lYXIoYSwgZCkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICsgdCAqIGQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4cG9uZW50aWFsKGEsIGIsIHkpIHtcbiAgcmV0dXJuIGEgPSBNYXRoLnBvdyhhLCB5KSwgYiA9IE1hdGgucG93KGIsIHkpIC0gYSwgeSA9IDEgLyB5LCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KGEgKyB0ICogYiwgeSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodWUoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkID4gMTgwIHx8IGQgPCAtMTgwID8gZCAtIDM2MCAqIE1hdGgucm91bmQoZCAvIDM2MCkgOiBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtbWEoeSkge1xuICByZXR1cm4gKHkgPSAreSkgPT09IDEgPyBub2dhbW1hIDogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiIC0gYSA/IGV4cG9uZW50aWFsKGEsIGIsIHkpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vZ2FtbWEoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuIiwiaW1wb3J0IHtyZ2IgYXMgY29sb3JSZ2J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGJhc2lzIGZyb20gXCIuL2Jhc2lzLmpzXCI7XG5pbXBvcnQgYmFzaXNDbG9zZWQgZnJvbSBcIi4vYmFzaXNDbG9zZWQuanNcIjtcbmltcG9ydCBub2dhbW1hLCB7Z2FtbWF9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiByZ2JHYW1tYSh5KSB7XG4gIHZhciBjb2xvciA9IGdhbW1hKHkpO1xuXG4gIGZ1bmN0aW9uIHJnYihzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSBjb2xvcigoc3RhcnQgPSBjb2xvclJnYihzdGFydCkpLnIsIChlbmQgPSBjb2xvclJnYihlbmQpKS5yKSxcbiAgICAgICAgZyA9IGNvbG9yKHN0YXJ0LmcsIGVuZC5nKSxcbiAgICAgICAgYiA9IGNvbG9yKHN0YXJ0LmIsIGVuZC5iKSxcbiAgICAgICAgb3BhY2l0eSA9IG5vZ2FtbWEoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5yID0gcih0KTtcbiAgICAgIHN0YXJ0LmcgPSBnKHQpO1xuICAgICAgc3RhcnQuYiA9IGIodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxuXG4gIHJnYi5nYW1tYSA9IHJnYkdhbW1hO1xuXG4gIHJldHVybiByZ2I7XG59KSgxKTtcblxuZnVuY3Rpb24gcmdiU3BsaW5lKHNwbGluZSkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIG4gPSBjb2xvcnMubGVuZ3RoLFxuICAgICAgICByID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBnID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBiID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBpLCBjb2xvcjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb2xvciA9IGNvbG9yUmdiKGNvbG9yc1tpXSk7XG4gICAgICByW2ldID0gY29sb3IuciB8fCAwO1xuICAgICAgZ1tpXSA9IGNvbG9yLmcgfHwgMDtcbiAgICAgIGJbaV0gPSBjb2xvci5iIHx8IDA7XG4gICAgfVxuICAgIHIgPSBzcGxpbmUocik7XG4gICAgZyA9IHNwbGluZShnKTtcbiAgICBiID0gc3BsaW5lKGIpO1xuICAgIGNvbG9yLm9wYWNpdHkgPSAxO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBjb2xvci5yID0gcih0KTtcbiAgICAgIGNvbG9yLmcgPSBnKHQpO1xuICAgICAgY29sb3IuYiA9IGIodCk7XG4gICAgICByZXR1cm4gY29sb3IgKyBcIlwiO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgcmdiQmFzaXMgPSByZ2JTcGxpbmUoYmFzaXMpO1xuZXhwb3J0IHZhciByZ2JCYXNpc0Nsb3NlZCA9IHJnYlNwbGluZShiYXNpc0Nsb3NlZCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHJlQSA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZyxcbiAgICByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcblxuZnVuY3Rpb24gemVybyhiKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25lKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYih0KSArIFwiXCI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGJpID0gcmVBLmxhc3RJbmRleCA9IHJlQi5sYXN0SW5kZXggPSAwLCAvLyBzY2FuIGluZGV4IGZvciBuZXh0IG51bWJlciBpbiBiXG4gICAgICBhbSwgLy8gY3VycmVudCBtYXRjaCBpbiBhXG4gICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICBicywgLy8gc3RyaW5nIHByZWNlZGluZyBjdXJyZW50IG51bWJlciBpbiBiLCBpZiBhbnlcbiAgICAgIGkgPSAtMSwgLy8gaW5kZXggaW4gc1xuICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcblxuICAvLyBDb2VyY2UgaW5wdXRzIHRvIHN0cmluZ3MuXG4gIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gIC8vIEludGVycG9sYXRlIHBhaXJzIG9mIG51bWJlcnMgaW4gYSAmIGIuXG4gIHdoaWxlICgoYW0gPSByZUEuZXhlYyhhKSlcbiAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgIGlmICgoYnMgPSBibS5pbmRleCkgPiBiaSkgeyAvLyBhIHN0cmluZyBwcmVjZWRlcyB0aGUgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYnMgPSBiLnNsaWNlKGJpLCBicyk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBibTsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYm07XG4gICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgIHNbKytpXSA9IG51bGw7XG4gICAgICBxLnB1c2goe2k6IGksIHg6IG51bWJlcihhbSwgYm0pfSk7XG4gICAgfVxuICAgIGJpID0gcmVCLmxhc3RJbmRleDtcbiAgfVxuXG4gIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gIGlmIChiaSA8IGIubGVuZ3RoKSB7XG4gICAgYnMgPSBiLnNsaWNlKGJpKTtcbiAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICBlbHNlIHNbKytpXSA9IGJzO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgZWFjaCBvZiB0aGUgbnVtYmVycyBhbmQgcmVqb2luIHRoZSBzdHJpbmcuXG4gIHJldHVybiBzLmxlbmd0aCA8IDIgPyAocVswXVxuICAgICAgPyBvbmUocVswXS54KVxuICAgICAgOiB6ZXJvKGIpKVxuICAgICAgOiAoYiA9IHEubGVuZ3RoLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgICAgICB9KTtcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IGRlY29tcG9zZSwge2lkZW50aXR5fSBmcm9tIFwiLi9kZWNvbXBvc2UuanNcIjtcblxudmFyIHN2Z05vZGU7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgY29uc3QgbSA9IG5ldyAodHlwZW9mIERPTU1hdHJpeCA9PT0gXCJmdW5jdGlvblwiID8gRE9NTWF0cml4IDogV2ViS2l0Q1NTTWF0cml4KSh2YWx1ZSArIFwiXCIpO1xuICByZXR1cm4gbS5pc0lkZW50aXR5ID8gaWRlbnRpdHkgOiBkZWNvbXBvc2UobS5hLCBtLmIsIG0uYywgbS5kLCBtLmUsIG0uZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZeKAmXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW7igJl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwodW5kZWZpbmVkLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1RpbWVyfSBmcm9tIFwiLi90aW1lci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIGRlbGF5ID0gZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXk7XG4gIHQucmVzdGFydChlbGFwc2VkID0+IHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuIiwiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge3RpbWVyLCB0aW1lb3V0fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGVtcHR5T24gPSBkaXNwYXRjaChcInN0YXJ0XCIsIFwiZW5kXCIsIFwiY2FuY2VsXCIsIFwiaW50ZXJydXB0XCIpO1xudmFyIGVtcHR5VHdlZW4gPSBbXTtcblxuZXhwb3J0IHZhciBDUkVBVEVEID0gMDtcbmV4cG9ydCB2YXIgU0NIRURVTEVEID0gMTtcbmV4cG9ydCB2YXIgU1RBUlRJTkcgPSAyO1xuZXhwb3J0IHZhciBTVEFSVEVEID0gMztcbmV4cG9ydCB2YXIgUlVOTklORyA9IDQ7XG5leHBvcnQgdmFyIEVORElORyA9IDU7XG5leHBvcnQgdmFyIEVOREVEID0gNjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSwgaWQsIGluZGV4LCBncm91cCwgdGltaW5nKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZXMpIG5vZGUuX190cmFuc2l0aW9uID0ge307XG4gIGVsc2UgaWYgKGlkIGluIHNjaGVkdWxlcykgcmV0dXJuO1xuICBjcmVhdGUobm9kZSwgaWQsIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGluZGV4OiBpbmRleCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIGdyb3VwOiBncm91cCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIG9uOiBlbXB0eU9uLFxuICAgIHR3ZWVuOiBlbXB0eVR3ZWVuLFxuICAgIHRpbWU6IHRpbWluZy50aW1lLFxuICAgIGRlbGF5OiB0aW1pbmcuZGVsYXksXG4gICAgZHVyYXRpb246IHRpbWluZy5kdXJhdGlvbixcbiAgICBlYXNlOiB0aW1pbmcuZWFzZSxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBzdGF0ZTogQ1JFQVRFRFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gQ1JFQVRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgc2NoZWR1bGVkXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gU1RBUlRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgcnVubmluZ1wiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlIHx8ICEoc2NoZWR1bGUgPSBzY2hlZHVsZVtpZF0pKSB0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2l0aW9uIG5vdCBmb3VuZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUobm9kZSwgaWQsIHNlbGYpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgdHdlZW47XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2VsZiB0aW1lciB3aGVuIHRoZSB0cmFuc2l0aW9uIGlzIGNyZWF0ZWQuXG4gIC8vIE5vdGUgdGhlIGFjdHVhbCBkZWxheSBpcyBub3Qga25vd24gdW50aWwgdGhlIGZpcnN0IGNhbGxiYWNrIVxuICBzY2hlZHVsZXNbaWRdID0gc2VsZjtcbiAgc2VsZi50aW1lciA9IHRpbWVyKHNjaGVkdWxlLCAwLCBzZWxmLnRpbWUpO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlKGVsYXBzZWQpIHtcbiAgICBzZWxmLnN0YXRlID0gU0NIRURVTEVEO1xuICAgIHNlbGYudGltZXIucmVzdGFydChzdGFydCwgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcblxuICAgIC8vIElmIHRoZSBlbGFwc2VkIGRlbGF5IGlzIGxlc3MgdGhhbiBvdXIgZmlyc3Qgc2xlZXAsIHN0YXJ0IGltbWVkaWF0ZWx5LlxuICAgIGlmIChzZWxmLmRlbGF5IDw9IGVsYXBzZWQpIHN0YXJ0KGVsYXBzZWQgLSBzZWxmLmRlbGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGVsYXBzZWQpIHtcbiAgICB2YXIgaSwgaiwgbiwgbztcblxuICAgIC8vIElmIHRoZSBzdGF0ZSBpcyBub3QgU0NIRURVTEVELCB0aGVuIHdlIHByZXZpb3VzbHkgZXJyb3JlZCBvbiBzdGFydC5cbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU0NIRURVTEVEKSByZXR1cm4gc3RvcCgpO1xuXG4gICAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgICAgbyA9IHNjaGVkdWxlc1tpXTtcbiAgICAgIGlmIChvLm5hbWUgIT09IHNlbGYubmFtZSkgY29udGludWU7XG5cbiAgICAgIC8vIFdoaWxlIHRoaXMgZWxlbWVudCBhbHJlYWR5IGhhcyBhIHN0YXJ0aW5nIHRyYW5zaXRpb24gZHVyaW5nIHRoaXMgZnJhbWUsXG4gICAgICAvLyBkZWZlciBzdGFydGluZyBhbiBpbnRlcnJ1cHRpbmcgdHJhbnNpdGlvbiB1bnRpbCB0aGF0IHRyYW5zaXRpb24gaGFzIGFcbiAgICAgIC8vIGNoYW5jZSB0byB0aWNrIChhbmQgcG9zc2libHkgZW5kKTsgc2VlIGQzL2QzLXRyYW5zaXRpb24jNTQhXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gU1RBUlRFRCkgcmV0dXJuIHRpbWVvdXQoc3RhcnQpO1xuXG4gICAgICAvLyBJbnRlcnJ1cHQgdGhlIGFjdGl2ZSB0cmFuc2l0aW9uLCBpZiBhbnkuXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gUlVOTklORykge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJpbnRlcnJ1cHRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbCBhbnkgcHJlLWVtcHRlZCB0cmFuc2l0aW9ucy5cbiAgICAgIGVsc2UgaWYgKCtpIDwgaWQpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmVyIHRoZSBmaXJzdCB0aWNrIHRvIGVuZCBvZiB0aGUgY3VycmVudCBmcmFtZTsgc2VlIGQzL2QzIzE1NzYuXG4gICAgLy8gTm90ZSB0aGUgdHJhbnNpdGlvbiBtYXkgYmUgY2FuY2VsZWQgYWZ0ZXIgc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3QgdGljayFcbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBzY2hlZHVsZWQgYmVmb3JlIHRoZSBzdGFydCBldmVudDsgc2VlIGQzL2QzLXRyYW5zaXRpb24jMTYhXG4gICAgLy8gQXNzdW1pbmcgdGhpcyBpcyBzdWNjZXNzZnVsLCBzdWJzZXF1ZW50IGNhbGxiYWNrcyBnbyBzdHJhaWdodCB0byB0aWNrLlxuICAgIHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gU1RBUlRFRCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gUlVOTklORztcbiAgICAgICAgc2VsZi50aW1lci5yZXN0YXJ0KHRpY2ssIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG4gICAgICAgIHRpY2soZWxhcHNlZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgc3RhcnQgZXZlbnQuXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgdGhlIHR3ZWVuIGFyZSBpbml0aWFsaXplZC5cbiAgICBzZWxmLnN0YXRlID0gU1RBUlRJTkc7XG4gICAgc2VsZi5vbi5jYWxsKFwic3RhcnRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNUQVJUSU5HKSByZXR1cm47IC8vIGludGVycnVwdGVkXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJURUQ7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0d2VlbiwgZGVsZXRpbmcgbnVsbCB0d2Vlbi5cbiAgICB0d2VlbiA9IG5ldyBBcnJheShuID0gc2VsZi50d2Vlbi5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGogPSAtMTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG8gPSBzZWxmLnR3ZWVuW2ldLnZhbHVlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCkpIHtcbiAgICAgICAgdHdlZW5bKytqXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIHR3ZWVuLmxlbmd0aCA9IGogKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gdGljayhlbGFwc2VkKSB7XG4gICAgdmFyIHQgPSBlbGFwc2VkIDwgc2VsZi5kdXJhdGlvbiA/IHNlbGYuZWFzZS5jYWxsKG51bGwsIGVsYXBzZWQgLyBzZWxmLmR1cmF0aW9uKSA6IChzZWxmLnRpbWVyLnJlc3RhcnQoc3RvcCksIHNlbGYuc3RhdGUgPSBFTkRJTkcsIDEpLFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSB0d2Vlbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgdHdlZW5baV0uY2FsbChub2RlLCB0KTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZW5kIGV2ZW50LlxuICAgIGlmIChzZWxmLnN0YXRlID09PSBFTkRJTkcpIHtcbiAgICAgIHNlbGYub24uY2FsbChcImVuZFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHNlbGYuc3RhdGUgPSBFTkRFRDtcbiAgICBzZWxmLnRpbWVyLnN0b3AoKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2lkXTtcbiAgICBmb3IgKHZhciBpIGluIHNjaGVkdWxlcykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQVJUSU5HLCBFTkRJTkcsIEVOREVEfSBmcm9tIFwiLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBhY3RpdmUsXG4gICAgICBlbXB0eSA9IHRydWUsXG4gICAgICBpO1xuXG4gIGlmICghc2NoZWR1bGVzKSByZXR1cm47XG5cbiAgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcblxuICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgaWYgKChzY2hlZHVsZSA9IHNjaGVkdWxlc1tpXSkubmFtZSAhPT0gbmFtZSkgeyBlbXB0eSA9IGZhbHNlOyBjb250aW51ZTsgfVxuICAgIGFjdGl2ZSA9IHNjaGVkdWxlLnN0YXRlID4gU1RBUlRJTkcgJiYgc2NoZWR1bGUuc3RhdGUgPCBFTkRJTkc7XG4gICAgc2NoZWR1bGUuc3RhdGUgPSBFTkRFRDtcbiAgICBzY2hlZHVsZS50aW1lci5zdG9wKCk7XG4gICAgc2NoZWR1bGUub24uY2FsbChhY3RpdmUgPyBcImludGVycnVwdFwiIDogXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2NoZWR1bGUuaW5kZXgsIHNjaGVkdWxlLmdyb3VwKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICB9XG5cbiAgaWYgKGVtcHR5KSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG59XG4iLCJpbXBvcnQgaW50ZXJydXB0IGZyb20gXCIuLi9pbnRlcnJ1cHQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGludGVycnVwdCh0aGlzLCBuYW1lKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiB0d2VlblJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gdHdlZW4wID0gdHdlZW47XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xID0gdHdlZW4xLnNsaWNlKCk7XG4gICAgICAgICAgdHdlZW4xLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0d2VlbkZ1bmN0aW9uKGlkLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9ICh0d2VlbjAgPSB0d2Vlbikuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIHQgPSB7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSwgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMVtpXSA9IHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBuKSB0d2VlbjEucHVzaCh0KTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgbmFtZSArPSBcIlwiO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciB0d2VlbiA9IGdldCh0aGlzLm5vZGUoKSwgaWQpLnR3ZWVuO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4ubGVuZ3RoLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKHQgPSB0d2VlbltpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsID8gdHdlZW5SZW1vdmUgOiB0d2VlbkZ1bmN0aW9uKShpZCwgbmFtZSwgdmFsdWUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWVuVmFsdWUodHJhbnNpdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdHJhbnNpdGlvbi5faWQ7XG5cbiAgdHJhbnNpdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCk7XG4gICAgKHNjaGVkdWxlLnZhbHVlIHx8IChzY2hlZHVsZS52YWx1ZSA9IHt9KSlbbmFtZV0gPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBnZXQobm9kZSwgaWQpLnZhbHVlW25hbWVdO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJnYiwgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBjO1xuICByZXR1cm4gKHR5cGVvZiBiID09PSBcIm51bWJlclwiID8gaW50ZXJwb2xhdGVOdW1iZXJcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gaW50ZXJwb2xhdGVSZ2JcbiAgICAgIDogKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIGludGVycG9sYXRlUmdiKVxuICAgICAgOiBpbnRlcnBvbGF0ZVN0cmluZykoYSwgYik7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtU3ZnIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKSwgaSA9IGZ1bGxuYW1lID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHRoaXMuYXR0clR3ZWVuKG5hbWUsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKShmdWxsbmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcImF0dHIuXCIgKyBuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHZhbHVlID09IG51bGwgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKShmdWxsbmFtZSlcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKGZ1bGxuYW1lLCBpLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlKG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW5OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2VlbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGtleSA9IFwiYXR0ci5cIiArIG5hbWU7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIChmdWxsbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkZWxheUZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVsYXlDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkZWxheUZ1bmN0aW9uXG4gICAgICAgICAgOiBkZWxheUNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kZWxheTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGR1cmF0aW9uRnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGR1cmF0aW9uQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkdXJhdGlvbkZ1bmN0aW9uXG4gICAgICAgICAgOiBkdXJhdGlvbkNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kdXJhdGlvbjtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKGVhc2VDb25zdGFudChpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5lYXNlO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VWYXJ5aW5nKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgdiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLmVhY2goZWFzZVZhcnlpbmcodGhpcy5faWQsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge21hdGNoZXJ9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICBpZiAodHJhbnNpdGlvbi5faWQgIT09IHRoaXMuX2lkKSB0aHJvdyBuZXcgRXJyb3I7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHRyYW5zaXRpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlRnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9fdHJhbnNpdGlvbikgaWYgKCtpICE9PSBpZCkgcmV0dXJuO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9uKFwiZW5kLnJlbW92ZVwiLCByZW1vdmVGdW5jdGlvbih0aGlzLl9pZCkpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgICAgc2NoZWR1bGUoc3ViZ3JvdXBbaV0sIG5hbWUsIGlkLCBpLCBzdWJncm91cCwgZ2V0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG52YXIgU2VsZWN0aW9uID0gc2VsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2dyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtQ3NzIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c3R5bGV9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlTnVsbChuYW1lLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHN0cmluZzEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCBzdHJpbmcxMCA9IHN0cmluZzEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHZhbHVlMSA9IHZhbHVlKHRoaXMpLFxuICAgICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHN0cmluZzEgPSB2YWx1ZTEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVNYXliZVJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgb24wLCBvbjEsIGxpc3RlbmVyMCwga2V5ID0gXCJzdHlsZS5cIiArIG5hbWUsIGV2ZW50ID0gXCJlbmQuXCIgKyBrZXksIHJlbW92ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub24sXG4gICAgICAgIGxpc3RlbmVyID0gc2NoZWR1bGUudmFsdWVba2V5XSA9PSBudWxsID8gcmVtb3ZlIHx8IChyZW1vdmUgPSBzdHlsZVJlbW92ZShuYW1lKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjAgfHwgbGlzdGVuZXIwICE9PSBsaXN0ZW5lcikgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihldmVudCwgbGlzdGVuZXIwID0gbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgaSA9IChuYW1lICs9IFwiXCIpID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZU51bGwobmFtZSwgaSkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBzdHlsZVJlbW92ZShuYW1lKSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVGdW5jdGlvbihuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwic3R5bGUuXCIgKyBuYW1lLCB2YWx1ZSkpKVxuICAgICAgLmVhY2goc3R5bGVNYXliZVJlbW92ZSh0aGlzLl9pZCwgbmFtZSkpXG4gICAgOiB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUNvbnN0YW50KG5hbWUsIGksIHZhbHVlKSwgcHJpb3JpdHkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBudWxsKTtcbn1cbiIsImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsImltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlMSA9IHZhbHVlKHRoaXMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTEgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLnR3ZWVuKFwidGV4dFwiLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB0ZXh0RnVuY3Rpb24odHdlZW5WYWx1ZSh0aGlzLCBcInRleHRcIiwgdmFsdWUpKVxuICAgICAgOiB0ZXh0Q29uc3RhbnQodmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCIpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRJbnRlcnBvbGF0ZShpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IGkuY2FsbCh0aGlzLCB0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dFR3ZWVuKHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgdGV4dEludGVycG9sYXRlKGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJ0ZXh0XCI7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCB0ZXh0VHdlZW4odmFsdWUpKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgb24wLCBvbjEsIHRoYXQgPSB0aGlzLCBpZCA9IHRoYXQuX2lkLCBzaXplID0gdGhhdC5zaXplKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgY2FuY2VsID0ge3ZhbHVlOiByZWplY3R9LFxuICAgICAgICBlbmQgPSB7dmFsdWU6IGZ1bmN0aW9uKCkgeyBpZiAoLS1zaXplID09PSAwKSByZXNvbHZlKCk7IH19O1xuXG4gICAgdGhhdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgICAgaWYgKG9uICE9PSBvbjApIHtcbiAgICAgICAgb24xID0gKG9uMCA9IG9uKS5jb3B5KCk7XG4gICAgICAgIG9uMS5fLmNhbmNlbC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmludGVycnVwdC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmVuZC5wdXNoKGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIHNlbGVjdGlvbiB3YXMgZW1wdHksIHJlc29sdmUgZW5kIGltbWVkaWF0ZWx5XG4gICAgaWYgKHNpemUgPT09IDApIHJlc29sdmUoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyVHdlZW4gZnJvbSBcIi4vYXR0clR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kZWxheSBmcm9tIFwiLi9kZWxheS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZHVyYXRpb24gZnJvbSBcIi4vZHVyYXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2UgZnJvbSBcIi4vZWFzZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcgZnJvbSBcIi4vZWFzZVZhcnlpbmcuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlVHdlZW4gZnJvbSBcIi4vc3R5bGVUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0VHdlZW4gZnJvbSBcIi4vdGV4dFR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3R3ZWVuIGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lbmQgZnJvbSBcIi4vZW5kLmpzXCI7XG5cbnZhciBpZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2l0aW9uKGdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIHRoaXMuX2lkID0gaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0aW9uKCkudHJhbnNpdGlvbihuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0lkKCkge1xuICByZXR1cm4gKytpZDtcbn1cblxudmFyIHNlbGVjdGlvbl9wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZSA9IHRyYW5zaXRpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVHJhbnNpdGlvbixcbiAgc2VsZWN0OiB0cmFuc2l0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiB0cmFuc2l0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHRyYW5zaXRpb25fZmlsdGVyLFxuICBtZXJnZTogdHJhbnNpdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiB0cmFuc2l0aW9uX3NlbGVjdGlvbixcbiAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbl90cmFuc2l0aW9uLFxuICBjYWxsOiBzZWxlY3Rpb25fcHJvdG90eXBlLmNhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9wcm90b3R5cGUuZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9wcm90b3R5cGUuZWFjaCxcbiAgb246IHRyYW5zaXRpb25fb24sXG4gIGF0dHI6IHRyYW5zaXRpb25fYXR0cixcbiAgYXR0clR3ZWVuOiB0cmFuc2l0aW9uX2F0dHJUd2VlbixcbiAgc3R5bGU6IHRyYW5zaXRpb25fc3R5bGUsXG4gIHN0eWxlVHdlZW46IHRyYW5zaXRpb25fc3R5bGVUd2VlbixcbiAgdGV4dDogdHJhbnNpdGlvbl90ZXh0LFxuICB0ZXh0VHdlZW46IHRyYW5zaXRpb25fdGV4dFR3ZWVuLFxuICByZW1vdmU6IHRyYW5zaXRpb25fcmVtb3ZlLFxuICB0d2VlbjogdHJhbnNpdGlvbl90d2VlbixcbiAgZGVsYXk6IHRyYW5zaXRpb25fZGVsYXksXG4gIGR1cmF0aW9uOiB0cmFuc2l0aW9uX2R1cmF0aW9uLFxuICBlYXNlOiB0cmFuc2l0aW9uX2Vhc2UsXG4gIGVhc2VWYXJ5aW5nOiB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nLFxuICBlbmQ6IHRyYW5zaXRpb25fZW5kLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX3Byb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdXG59O1xuIiwiZXhwb3J0IGNvbnN0IGxpbmVhciA9IHQgPT4gK3Q7XG4iLCJleHBvcnQgZnVuY3Rpb24gY3ViaWNJbih0KSB7XG4gIHJldHVybiB0ICogdCAqIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY091dCh0KSB7XG4gIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY0luT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gdCAqIHQgKiB0IDogKHQgLT0gMikgKiB0ICogdCArIDIpIC8gMjtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUgZnJvbSBcIi4uL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7ZWFzZUN1YmljSW5PdXR9IGZyb20gXCJkMy1lYXNlXCI7XG5pbXBvcnQge25vd30gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBkZWZhdWx0VGltaW5nID0ge1xuICB0aW1lOiBudWxsLCAvLyBTZXQgb24gdXNlLlxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDI1MCxcbiAgZWFzZTogZWFzZUN1YmljSW5PdXRcbn07XG5cbmZ1bmN0aW9uIGluaGVyaXQobm9kZSwgaWQpIHtcbiAgdmFyIHRpbWluZztcbiAgd2hpbGUgKCEodGltaW5nID0gbm9kZS5fX3RyYW5zaXRpb24pIHx8ICEodGltaW5nID0gdGltaW5nW2lkXSkpIHtcbiAgICBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmFuc2l0aW9uICR7aWR9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGltaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBpZCxcbiAgICAgIHRpbWluZztcblxuICBpZiAobmFtZSBpbnN0YW5jZW9mIFRyYW5zaXRpb24pIHtcbiAgICBpZCA9IG5hbWUuX2lkLCBuYW1lID0gbmFtZS5fbmFtZTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IG5ld0lkKCksICh0aW1pbmcgPSBkZWZhdWx0VGltaW5nKS50aW1lID0gbm93KCksIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZCwgaSwgZ3JvdXAsIHRpbWluZyB8fCBpbmhlcml0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBzZWxlY3Rpb25faW50ZXJydXB0IGZyb20gXCIuL2ludGVycnVwdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcblxuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBzZWxlY3Rpb25faW50ZXJydXB0O1xuc2VsZWN0aW9uLnByb3RvdHlwZS50cmFuc2l0aW9uID0gc2VsZWN0aW9uX3RyYW5zaXRpb247XG4iLCJleHBvcnQgZnVuY3Rpb24gVHJhbnNmb3JtKGssIHgsIHkpIHtcbiAgdGhpcy5rID0gaztcbiAgdGhpcy54ID0geDtcbiAgdGhpcy55ID0geTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zZm9ybSxcbiAgc2NhbGU6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gayA9PT0gMSA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuayAqIGssIHRoaXMueCwgdGhpcy55KTtcbiAgfSxcbiAgdHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHggPT09IDAgJiB5ID09PSAwID8gdGhpcyA6IG5ldyBUcmFuc2Zvcm0odGhpcy5rLCB0aGlzLnggKyB0aGlzLmsgKiB4LCB0aGlzLnkgKyB0aGlzLmsgKiB5KTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIFtwb2ludFswXSAqIHRoaXMuayArIHRoaXMueCwgcG9pbnRbMV0gKiB0aGlzLmsgKyB0aGlzLnldO1xuICB9LFxuICBhcHBseVg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCAqIHRoaXMuayArIHRoaXMueDtcbiAgfSxcbiAgYXBwbHlZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLmsgKyB0aGlzLnk7XG4gIH0sXG4gIGludmVydDogZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICByZXR1cm4gWyhsb2NhdGlvblswXSAtIHRoaXMueCkgLyB0aGlzLmssIChsb2NhdGlvblsxXSAtIHRoaXMueSkgLyB0aGlzLmtdO1xuICB9LFxuICBpbnZlcnRYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4IC0gdGhpcy54KSAvIHRoaXMuaztcbiAgfSxcbiAgaW52ZXJ0WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiAoeSAtIHRoaXMueSkgLyB0aGlzLms7XG4gIH0sXG4gIHJlc2NhbGVYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHguY29weSgpLmRvbWFpbih4LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WCwgdGhpcykubWFwKHguaW52ZXJ0LCB4KSk7XG4gIH0sXG4gIHJlc2NhbGVZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkuY29weSgpLmRvbWFpbih5LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WSwgdGhpcykubWFwKHkuaW52ZXJ0LCB5KSk7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnggKyBcIixcIiArIHRoaXMueSArIFwiKSBzY2FsZShcIiArIHRoaXMuayArIFwiKVwiO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0gbmV3IFRyYW5zZm9ybSgxLCAwLCAwKTtcblxudHJhbnNmb3JtLnByb3RvdHlwZSA9IFRyYW5zZm9ybS5wcm90b3R5cGU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlKSB7XG4gIHdoaWxlICghbm9kZS5fX3pvb20pIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHJldHVybiBub2RlLl9fem9vbTtcbn1cbiIsImV4cG9ydCBjb25zdCBzdmducyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSA8VCBleHRlbmRzIEVsZW1lbnQ+KFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICB0eXBlPzogbmV3ICgpID0+IFRcbik6IFQgPT4ge1xuICBjb25zdCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgaWYgKGVsdCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIHNlbGVjdG9yIFwiICsgc2VsZWN0b3IpO1xuICB9XG4gIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgIShlbHQgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgU2VsZWN0b3IgJHtzZWxlY3Rvcn0gbm90IG9mIHR5cGUgJHt0eXBlfWApO1xuICB9XG4gIHJldHVybiBlbHQgYXMgVDtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZml0dHMgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBiaWdUYXJnZXQxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLmJpZy10YXJnZXQxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAzNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMjUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDE1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCA1KTtcbiAgY29uc3QgYmlnVGFyZ2V0MiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5iaWctdGFyZ2V0MlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMzUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDI1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAxNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgNSk7XG4gIGNvbnN0IHNtYWxsVGFyZ2V0ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLnNtYWxsLXRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHNtYWxsVGFyZ2V0LCA0MCwgNTAsIDUpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwdXJwb3NlID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYmlnVGFyZ2V0MSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucHVycG9zZSBnLnRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDQwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMzApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAyMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDEwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGhpY2sgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnMSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wMVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMSxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDQwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGcyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTAyXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGcyLFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnMyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wM1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMyxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNCxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAyMCw0MCA0MCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc1ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA1XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc1LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsMjBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzYgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDZcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzYsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDQwIDQwLDQwIDIwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgamFrb2IgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBhcHAxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLmFwcC0xXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYXBwMSwgNDAsIDUwLCAzNSk7XG4gIGNvbnN0IGFwcDIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcuYXBwLTJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShhcHAyLCA0MCwgNTAsIDM1KTtcbiAgY29uc3QgeW91ckFwcCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy55b3VyLWFwcFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHlvdXJBcHAsIDQwLCA1MCwgMzUpO1xufTtcbiIsImltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi9TVkdUb29sXCI7XG5pbXBvcnQgeyBmaXR0cyB9IGZyb20gXCIuL3N2Z3MvZml0dHNcIjtcbmltcG9ydCB7IHB1cnBvc2UgfSBmcm9tIFwiLi9zdmdzL3B1cnBvc2VcIjtcbmltcG9ydCB7IGhpY2sgfSBmcm9tIFwiLi9zdmdzL2hpY2tcIjtcbmltcG9ydCB7IGpha29iIH0gZnJvbSBcIi4vc3Zncy9qYWtvYlwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnOiB7IFtrZXk6IHN0cmluZ106ICgodDogU1ZHVG9vbCkgPT4gdm9pZClbXSB9ID0ge1xuICBcIjAyLWZpdHRzXCI6IFtmaXR0c10sXG4gIFwiMDEtcHVycG9zZVwiOiBbcHVycG9zZV0sXG4gIFwiMDMtaGlja1wiOiBbaGlja10sXG4gIFwiMDQtamFrb2JcIjogW2pha29iXSxcbn07XG5cbmNvbnN0IHNldCA9IG5ldyBTZXQ8KHQ6IFNWR1Rvb2wpID0+IHZvaWQ+KCk7XG5mb3IgKGNvbnN0IHZhbHVlcyBvZiBPYmplY3QudmFsdWVzKGNvbmZpZykpIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICBzZXQuYWRkKHZhbHVlKTtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IGFsbCA9IFsuLi5zZXRdO1xuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2ludGVyZmFjZXMvVHJhbnNpdGlvbk9wdGlvbnNcIjtcbmltcG9ydCB7IGNvbmZpZywgYWxsIH0gZnJvbSBcIi4vc3ZnQ29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBTVkdUb29sIHtcbiAgZGVsYXlDb3VudGVyID0gMDtcbiAgZGVsYXlJbmNyZW1lbnQgPSAxMDA7XG4gIHVzZVRyYW5zaXRpb24gPSBmYWxzZTtcblxuICBzdmdOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdFN2Z05hbWUoKTtcbiAgfVxuXG4gIGluaXRTdmdOYW1lKCkge1xuICAgIGNvbnN0IHJlZ2V4ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC9eLipcXC9jYXJkc1xcLyguKikoLmh0bWwpJC8pO1xuICAgIGNvbnNvbGUubG9nKFwicmVnZXg6IFwiLCByZWdleCk7XG4gICAgaWYgKHJlZ2V4IGluc3RhbmNlb2YgQXJyYXkgJiYgcmVnZXgubGVuZ3RoID4gMikge1xuICAgICAgdGhpcy5zdmdOYW1lID0gcmVnZXhbMV07XG4gICAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXRTdmcoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3ZnTmFtZSA/IGNvbmZpZ1t0aGlzLnN2Z05hbWVdIDogYWxsO1xuICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBmIG9mIGxpc3QpIHtcbiAgICAgIGYodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVsYXkoKSB7XG4gICAgdGhpcy5kZWxheUNvdW50ZXIgKz0gdGhpcy5kZWxheUluY3JlbWVudDtcbiAgICByZXR1cm4gdGhpcy5kZWxheUNvdW50ZXI7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUoZ3JvdXA6IFNWR0dFbGVtZW50LCBjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3JtKFxuICAgICAgZ3JvdXAsXG4gICAgICBcImNpcmNsZVwiLFxuICAgICAge1xuICAgICAgICBjeCxcbiAgICAgICAgY3ksXG4gICAgICAgIHI6IDAsXG4gICAgICB9LFxuICAgICAgeyByIH0sXG4gICAgICB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRlbGF5OiB0aGlzLmdldERlbGF5KCksXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlnb24oZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWdvblwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlRm9ybSA9IDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmcgfT4oXG4gICAgY29udGFpbmVyOiBTVkdHRWxlbWVudCxcbiAgICBlbHROYW1lOiBzdHJpbmcsXG4gICAgaW5pdGlhbEF0dHJpYnV0ZXM6IFQsXG4gICAgZmluYWxBdHRyaWJ1dGVzOiBQYXJ0aWFsPFQ+LFxuICAgIG9wdGlvbnM/OiBQYXJ0aWFsPFRyYW5zaXRpb25PcHRpb25zPlxuICApID0+IHtcbiAgICBjb25zdCBvcHRzOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHsgZHVyYXRpb246IDIwMDAsIGRlbGF5OiAxMDAwLCAuLi5vcHRpb25zIH07XG4gICAgaWYgKCF0aGlzLnVzZVRyYW5zaXRpb24pIHtcbiAgICAgIG9wdHMuZGVsYXkgPSAwO1xuICAgICAgb3B0cy5kdXJhdGlvbiA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGVsdCA9IGQzLnNlbGVjdChjb250YWluZXIpLmFwcGVuZChlbHROYW1lKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGluaXRpYWxBdHRyaWJ1dGVzKSkge1xuICAgICAgZWx0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdCA9IGVsdFxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKG9wdHMuZHVyYXRpb24pXG4gICAgICAuZGVsYXkob3B0cy5kZWxheSlcbiAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpO1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZmluYWxBdHRyaWJ1dGVzKSkge1xuICAgICAgdC5hdHRyKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBpbml0VGhlbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGlzRGFyayA9XG4gICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcztcblxuICBjb25zdCBjbCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0O1xuICBpc0RhcmsgPyBjbC5hZGQoXCJkYXJrXCIpIDogY2wuYWRkKFwibGlnaHRcIik7XG5cbiAgd2luZG93XG4gICAgLm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gZS5tYXRjaGVzID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbG9yU2NoZW1lOiBcIiwgY29sb3JTY2hlbWUpO1xuXG4gICAgICBjbC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgICAgY2wucmVtb3ZlKFwibGlnaHRcIik7XG4gICAgICBpZiAoY29sb3JTY2hlbWUgPT09IFwiZGFya1wiKSB7XG4gICAgICAgIGNsLmFkZChcImRhcmtcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbC5hZGQoXCJsaWdodFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi9TVkdUb29sXCI7XG5cbmltcG9ydCB7IGluaXRUaGVtZSB9IGZyb20gXCIuL3RoZW1lXCI7XG5cbmluaXRUaGVtZSgpO1xuXG5jb25zdCBzdmdUb29sID0gbmV3IFNWR1Rvb2woKTtcbnN2Z1Rvb2wuaW5pdFN2ZygpO1xuIl0sIm5hbWVzIjpbIm5vb3AiLCJkaXNwYXRjaCIsImkiLCJuIiwiXyIsInQiLCJEaXNwYXRjaCIsInBhcnNlVHlwZW5hbWVzIiwidHlwZW5hbWVzIiwidHlwZXMiLCJuYW1lIiwidHlwZW5hbWUiLCJjYWxsYmFjayIsIlQiLCJnZXQiLCJzZXQiLCJjb3B5IiwidHlwZSIsInRoYXQiLCJhcmdzIiwiYyIsInhodG1sIiwibmFtZXNwYWNlcyIsIm5hbWVzcGFjZSIsInByZWZpeCIsImNyZWF0b3JJbmhlcml0IiwiZG9jdW1lbnQiLCJ1cmkiLCJjcmVhdG9yRml4ZWQiLCJmdWxsbmFtZSIsImNyZWF0b3IiLCJub25lIiwic2VsZWN0b3IiLCJzZWxlY3Rpb25fc2VsZWN0Iiwic2VsZWN0IiwiZ3JvdXBzIiwibSIsInN1Ymdyb3VwcyIsImoiLCJncm91cCIsInN1Ymdyb3VwIiwibm9kZSIsInN1Ym5vZGUiLCJTZWxlY3Rpb24iLCJhcnJheSIsIngiLCJlbXB0eSIsInNlbGVjdG9yQWxsIiwiYXJyYXlBbGwiLCJzZWxlY3Rpb25fc2VsZWN0QWxsIiwicGFyZW50cyIsIm1hdGNoZXIiLCJjaGlsZE1hdGNoZXIiLCJmaW5kIiwiY2hpbGRGaW5kIiwibWF0Y2giLCJjaGlsZEZpcnN0Iiwic2VsZWN0aW9uX3NlbGVjdENoaWxkIiwiZmlsdGVyIiwiY2hpbGRyZW4iLCJjaGlsZHJlbkZpbHRlciIsInNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiIsInNlbGVjdGlvbl9maWx0ZXIiLCJzcGFyc2UiLCJ1cGRhdGUiLCJzZWxlY3Rpb25fZW50ZXIiLCJFbnRlck5vZGUiLCJwYXJlbnQiLCJkYXR1bSIsImNoaWxkIiwibmV4dCIsImNvbnN0YW50JDEiLCJiaW5kSW5kZXgiLCJlbnRlciIsImV4aXQiLCJkYXRhIiwiZ3JvdXBMZW5ndGgiLCJkYXRhTGVuZ3RoIiwiYmluZEtleSIsImtleSIsIm5vZGVCeUtleVZhbHVlIiwia2V5VmFsdWVzIiwia2V5VmFsdWUiLCJzZWxlY3Rpb25fZGF0YSIsInZhbHVlIiwiYmluZCIsImNvbnN0YW50IiwiYXJyYXlsaWtlIiwiZW50ZXJHcm91cCIsInVwZGF0ZUdyb3VwIiwiZXhpdEdyb3VwIiwiaTAiLCJpMSIsInByZXZpb3VzIiwic2VsZWN0aW9uX2V4aXQiLCJzZWxlY3Rpb25fam9pbiIsIm9uZW50ZXIiLCJvbnVwZGF0ZSIsIm9uZXhpdCIsInNlbGVjdGlvbl9tZXJnZSIsImNvbnRleHQiLCJzZWxlY3Rpb24iLCJncm91cHMwIiwiZ3JvdXBzMSIsIm0wIiwibTEiLCJtZXJnZXMiLCJncm91cDAiLCJncm91cDEiLCJtZXJnZSIsInNlbGVjdGlvbl9vcmRlciIsInNlbGVjdGlvbl9zb3J0IiwiY29tcGFyZSIsImFzY2VuZGluZyIsImNvbXBhcmVOb2RlIiwiYSIsImIiLCJzb3J0Z3JvdXBzIiwic29ydGdyb3VwIiwic2VsZWN0aW9uX2NhbGwiLCJzZWxlY3Rpb25fbm9kZXMiLCJzZWxlY3Rpb25fbm9kZSIsInNlbGVjdGlvbl9zaXplIiwic2l6ZSIsInNlbGVjdGlvbl9lbXB0eSIsInNlbGVjdGlvbl9lYWNoIiwiYXR0clJlbW92ZSIsImF0dHJSZW1vdmVOUyIsImF0dHJDb25zdGFudCIsImF0dHJDb25zdGFudE5TIiwiYXR0ckZ1bmN0aW9uIiwidiIsImF0dHJGdW5jdGlvbk5TIiwic2VsZWN0aW9uX2F0dHIiLCJkZWZhdWx0VmlldyIsInN0eWxlUmVtb3ZlIiwic3R5bGVDb25zdGFudCIsInByaW9yaXR5Iiwic3R5bGVGdW5jdGlvbiIsInNlbGVjdGlvbl9zdHlsZSIsInN0eWxlVmFsdWUiLCJwcm9wZXJ0eVJlbW92ZSIsInByb3BlcnR5Q29uc3RhbnQiLCJwcm9wZXJ0eUZ1bmN0aW9uIiwic2VsZWN0aW9uX3Byb3BlcnR5IiwiY2xhc3NBcnJheSIsInN0cmluZyIsImNsYXNzTGlzdCIsIkNsYXNzTGlzdCIsImNsYXNzZWRBZGQiLCJuYW1lcyIsImxpc3QiLCJjbGFzc2VkUmVtb3ZlIiwiY2xhc3NlZFRydWUiLCJjbGFzc2VkRmFsc2UiLCJjbGFzc2VkRnVuY3Rpb24iLCJzZWxlY3Rpb25fY2xhc3NlZCIsInRleHRSZW1vdmUiLCJ0ZXh0Q29uc3RhbnQiLCJ0ZXh0RnVuY3Rpb24iLCJzZWxlY3Rpb25fdGV4dCIsImh0bWxSZW1vdmUiLCJodG1sQ29uc3RhbnQiLCJodG1sRnVuY3Rpb24iLCJzZWxlY3Rpb25faHRtbCIsInJhaXNlIiwic2VsZWN0aW9uX3JhaXNlIiwibG93ZXIiLCJzZWxlY3Rpb25fbG93ZXIiLCJzZWxlY3Rpb25fYXBwZW5kIiwiY3JlYXRlIiwiY29uc3RhbnROdWxsIiwic2VsZWN0aW9uX2luc2VydCIsImJlZm9yZSIsInJlbW92ZSIsInNlbGVjdGlvbl9yZW1vdmUiLCJzZWxlY3Rpb25fY2xvbmVTaGFsbG93IiwiY2xvbmUiLCJzZWxlY3Rpb25fY2xvbmVEZWVwIiwic2VsZWN0aW9uX2Nsb25lIiwiZGVlcCIsInNlbGVjdGlvbl9kYXR1bSIsImNvbnRleHRMaXN0ZW5lciIsImxpc3RlbmVyIiwiZXZlbnQiLCJvblJlbW92ZSIsIm9uIiwib25BZGQiLCJvcHRpb25zIiwibyIsInNlbGVjdGlvbl9vbiIsImRpc3BhdGNoRXZlbnQiLCJwYXJhbXMiLCJ3aW5kb3ciLCJkaXNwYXRjaENvbnN0YW50IiwiZGlzcGF0Y2hGdW5jdGlvbiIsInNlbGVjdGlvbl9kaXNwYXRjaCIsInNlbGVjdGlvbl9pdGVyYXRvciIsInJvb3QiLCJzZWxlY3Rpb25fc2VsZWN0aW9uIiwiZGVmaW5lIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwicHJvdG90eXBlIiwiZXh0ZW5kIiwiZGVmaW5pdGlvbiIsIkNvbG9yIiwiZGFya2VyIiwiYnJpZ2h0ZXIiLCJyZUkiLCJyZU4iLCJyZVAiLCJyZUhleCIsInJlUmdiSW50ZWdlciIsInJlUmdiUGVyY2VudCIsInJlUmdiYUludGVnZXIiLCJyZVJnYmFQZXJjZW50IiwicmVIc2xQZXJjZW50IiwicmVIc2xhUGVyY2VudCIsIm5hbWVkIiwiY29sb3IiLCJjaGFubmVscyIsImNvbG9yX2Zvcm1hdEhleCIsImNvbG9yX2Zvcm1hdEhleDgiLCJjb2xvcl9mb3JtYXRIc2wiLCJjb2xvcl9mb3JtYXRSZ2IiLCJoc2xDb252ZXJ0IiwiZm9ybWF0IiwibCIsInJnYm4iLCJSZ2IiLCJyZ2JhIiwiaHNsYSIsInIiLCJnIiwicmdiQ29udmVydCIsInJnYiIsIm9wYWNpdHkiLCJrIiwiY2xhbXBpIiwiY2xhbXBhIiwicmdiX2Zvcm1hdEhleCIsInJnYl9mb3JtYXRIZXg4IiwicmdiX2Zvcm1hdFJnYiIsImhleCIsImgiLCJzIiwiSHNsIiwibWluIiwibWF4IiwiaHNsIiwibTIiLCJoc2wycmdiIiwiY2xhbXBoIiwiY2xhbXB0IiwibGluZWFyIiwiZCIsImV4cG9uZW50aWFsIiwieSIsImdhbW1hIiwibm9nYW1tYSIsImludGVycG9sYXRlUmdiIiwicmdiR2FtbWEiLCJzdGFydCIsImVuZCIsImNvbG9yUmdiIiwiaW50ZXJwb2xhdGVOdW1iZXIiLCJyZUEiLCJyZUIiLCJ6ZXJvIiwib25lIiwiaW50ZXJwb2xhdGVTdHJpbmciLCJiaSIsImFtIiwiYm0iLCJicyIsInEiLCJudW1iZXIiLCJkZWdyZWVzIiwiaWRlbnRpdHkiLCJkZWNvbXBvc2UiLCJlIiwiZiIsInNjYWxlWCIsInNjYWxlWSIsInNrZXdYIiwic3ZnTm9kZSIsInBhcnNlQ3NzIiwicGFyc2VTdmciLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybSIsInBhcnNlIiwicHhDb21tYSIsInB4UGFyZW4iLCJkZWdQYXJlbiIsInBvcCIsInRyYW5zbGF0ZSIsInhhIiwieWEiLCJ4YiIsInliIiwicm90YXRlIiwic2NhbGUiLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyIsImludGVycG9sYXRlVHJhbnNmb3JtU3ZnIiwiZnJhbWUiLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJwb2tlRGVsYXkiLCJ0YXNrSGVhZCIsInRhc2tUYWlsIiwiY2xvY2tMYXN0IiwiY2xvY2tOb3ciLCJjbG9ja1NrZXciLCJjbG9jayIsInNldEZyYW1lIiwibm93IiwiY2xlYXJOb3ciLCJUaW1lciIsInRpbWVyIiwiZGVsYXkiLCJ0aW1lIiwic2xlZXAiLCJ0aW1lckZsdXNoIiwid2FrZSIsIm5hcCIsInBva2UiLCJ0MCIsInQxIiwidDIiLCJlbGFwc2VkIiwiZW1wdHlPbiIsImVtcHR5VHdlZW4iLCJDUkVBVEVEIiwiU0NIRURVTEVEIiwiU1RBUlRJTkciLCJTVEFSVEVEIiwiUlVOTklORyIsIkVORElORyIsIkVOREVEIiwic2NoZWR1bGUiLCJpZCIsImluZGV4IiwidGltaW5nIiwic2NoZWR1bGVzIiwiaW5pdCIsInNlbGYiLCJ0d2VlbiIsInN0b3AiLCJ0aWNrIiwiaW50ZXJydXB0IiwiYWN0aXZlIiwic2VsZWN0aW9uX2ludGVycnVwdCIsInR3ZWVuUmVtb3ZlIiwidHdlZW4wIiwidHdlZW4xIiwidHdlZW5GdW5jdGlvbiIsInRyYW5zaXRpb25fdHdlZW4iLCJ0d2VlblZhbHVlIiwidHJhbnNpdGlvbiIsImludGVycG9sYXRlIiwidmFsdWUxIiwic3RyaW5nMDAiLCJzdHJpbmcxIiwiaW50ZXJwb2xhdGUwIiwic3RyaW5nMCIsInN0cmluZzEwIiwidHJhbnNpdGlvbl9hdHRyIiwiYXR0ckludGVycG9sYXRlIiwiYXR0ckludGVycG9sYXRlTlMiLCJhdHRyVHdlZW5OUyIsImF0dHJUd2VlbiIsInRyYW5zaXRpb25fYXR0clR3ZWVuIiwiZGVsYXlGdW5jdGlvbiIsImRlbGF5Q29uc3RhbnQiLCJ0cmFuc2l0aW9uX2RlbGF5IiwiZHVyYXRpb25GdW5jdGlvbiIsImR1cmF0aW9uQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2R1cmF0aW9uIiwiZWFzZUNvbnN0YW50IiwidHJhbnNpdGlvbl9lYXNlIiwiZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nIiwidHJhbnNpdGlvbl9maWx0ZXIiLCJUcmFuc2l0aW9uIiwidHJhbnNpdGlvbl9tZXJnZSIsIm9uRnVuY3Rpb24iLCJvbjAiLCJvbjEiLCJzaXQiLCJ0cmFuc2l0aW9uX29uIiwicmVtb3ZlRnVuY3Rpb24iLCJ0cmFuc2l0aW9uX3JlbW92ZSIsInRyYW5zaXRpb25fc2VsZWN0IiwidHJhbnNpdGlvbl9zZWxlY3RBbGwiLCJpbmhlcml0IiwidHJhbnNpdGlvbl9zZWxlY3Rpb24iLCJzdHlsZU51bGwiLCJzdHlsZSIsInN0eWxlTWF5YmVSZW1vdmUiLCJsaXN0ZW5lcjAiLCJ0cmFuc2l0aW9uX3N0eWxlIiwic3R5bGVJbnRlcnBvbGF0ZSIsInN0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3N0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3RleHQiLCJ0ZXh0SW50ZXJwb2xhdGUiLCJ0ZXh0VHdlZW4iLCJ0cmFuc2l0aW9uX3RleHRUd2VlbiIsInRyYW5zaXRpb25fdHJhbnNpdGlvbiIsImlkMCIsImlkMSIsIm5ld0lkIiwidHJhbnNpdGlvbl9lbmQiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FuY2VsIiwic2VsZWN0aW9uX3Byb3RvdHlwZSIsImN1YmljSW5PdXQiLCJkZWZhdWx0VGltaW5nIiwiZWFzZUN1YmljSW5PdXQiLCJzZWxlY3Rpb25fdHJhbnNpdGlvbiIsIlRyYW5zZm9ybSIsInBvaW50IiwibG9jYXRpb24iLCJxdWVyeVNlbGVjdG9yIiwiZWx0IiwiZml0dHMiLCJiaWdUYXJnZXQxIiwiYmlnVGFyZ2V0MiIsInNtYWxsVGFyZ2V0IiwicHVycG9zZSIsImhpY2siLCJnMSIsImcyIiwiZzMiLCJnNCIsImc1IiwiZzYiLCJqYWtvYiIsImFwcDEiLCJhcHAyIiwieW91ckFwcCIsImNvbmZpZyIsInZhbHVlcyIsImFsbCIsIlNWR1Rvb2wiLCJfX3B1YmxpY0ZpZWxkIiwiY29udGFpbmVyIiwiZWx0TmFtZSIsImluaXRpYWxBdHRyaWJ1dGVzIiwiZmluYWxBdHRyaWJ1dGVzIiwib3B0cyIsImQzLnNlbGVjdCIsImQzLmVhc2VMaW5lYXIiLCJyZWdleCIsImN4IiwiY3kiLCJwb2ludHMiLCJpbml0VGhlbWUiLCJpc0RhcmsiLCJjbCIsImNvbG9yU2No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QUEsRUFDUixPQUFPO0FBQUEsRUFDUCxnQkFBZ0I7QUFBQSxFQUNoQixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxnQkFBZ0I7QUFBQSxFQUNoQixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQixZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFBQSxFQUN0QixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUEsRUFDZixLQUFLO0FBQUEsRUFDTCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixRQUFRO0FBQUEsRUFDUixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxZQUFZO0FBQUEsRUFDWixRQUFRO0FBQUEsRUFDUixhQUFhO0FBQ2Y7QUFFQW5CLEdBQU9NLEdBQU9jLEdBQU87QUFBQSxFQUNuQixLQUFLQyxHQUFVO0FBQ2IsV0FBTyxPQUFPLE9BQU8sSUFBSSxLQUFLLGVBQWEsTUFBTUEsQ0FBUTtBQUFBLEVBQzFEO0FBQUEsRUFDRCxjQUFjO0FBQ1osV0FBTyxLQUFLLE1BQU07RUFDbkI7QUFBQSxFQUNELEtBQUtDO0FBQUE7QUFBQSxFQUNMLFdBQVdBO0FBQUEsRUFDWCxZQUFZQztBQUFBLEVBQ1osV0FBV0M7QUFBQSxFQUNYLFdBQVdDO0FBQUEsRUFDWCxVQUFVQTtBQUNaLENBQUM7QUFFRCxTQUFTSCxLQUFrQjtBQUN6QixTQUFPLEtBQUssTUFBTTtBQUNwQjtBQUVBLFNBQVNDLEtBQW1CO0FBQzFCLFNBQU8sS0FBSyxNQUFNO0FBQ3BCO0FBRUEsU0FBU0MsS0FBa0I7QUFDekIsU0FBT0UsR0FBVyxJQUFJLEVBQUU7QUFDMUI7QUFFQSxTQUFTRCxLQUFrQjtBQUN6QixTQUFPLEtBQUssTUFBTTtBQUNwQjtBQUVlLFNBQVNMLEVBQU1PLEdBQVE7QUFDcEMsTUFBSS9MLEdBQUdnTTtBQUNQLFNBQUFELEtBQVVBLElBQVMsSUFBSSxLQUFNLEVBQUMsWUFBVyxJQUNqQy9MLElBQUlnTCxHQUFNLEtBQUtlLENBQU0sTUFBTUMsSUFBSWhNLEVBQUUsQ0FBQyxFQUFFLFFBQVFBLElBQUksU0FBU0EsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHZ00sTUFBTSxJQUFJQyxHQUFLak0sQ0FBQyxJQUN0RmdNLE1BQU0sSUFBSSxJQUFJRSxFQUFLbE0sS0FBSyxJQUFJLEtBQVFBLEtBQUssSUFBSSxLQUFRQSxLQUFLLElBQUksS0FBUUEsSUFBSSxNQUFTQSxJQUFJLE9BQVEsSUFBTUEsSUFBSSxJQUFNLENBQUMsSUFDaEhnTSxNQUFNLElBQUlHLEVBQUtuTSxLQUFLLEtBQUssS0FBTUEsS0FBSyxLQUFLLEtBQU1BLEtBQUssSUFBSSxNQUFPQSxJQUFJLE9BQVEsR0FBSSxJQUMvRWdNLE1BQU0sSUFBSUcsRUFBTW5NLEtBQUssS0FBSyxLQUFRQSxLQUFLLElBQUksS0FBUUEsS0FBSyxJQUFJLEtBQVFBLEtBQUssSUFBSSxLQUFRQSxLQUFLLElBQUksS0FBUUEsSUFBSSxPQUFVQSxJQUFJLE9BQVEsSUFBTUEsSUFBSSxNQUFRLEdBQUksSUFDdEosU0FDQ0EsSUFBSWlMLEdBQWEsS0FBS2MsQ0FBTSxLQUFLLElBQUlHLEVBQUlsTSxFQUFFLENBQUMsR0FBR0EsRUFBRSxDQUFDLEdBQUdBLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FDNURBLElBQUlrTCxHQUFhLEtBQUthLENBQU0sS0FBSyxJQUFJRyxFQUFJbE0sRUFBRSxDQUFDLElBQUksTUFBTSxLQUFLQSxFQUFFLENBQUMsSUFBSSxNQUFNLEtBQUtBLEVBQUUsQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEtBQ2hHQSxJQUFJbUwsR0FBYyxLQUFLWSxDQUFNLEtBQUtJLEVBQUtuTSxFQUFFLENBQUMsR0FBR0EsRUFBRSxDQUFDLEdBQUdBLEVBQUUsQ0FBQyxHQUFHQSxFQUFFLENBQUMsQ0FBQyxLQUM3REEsSUFBSW9MLEdBQWMsS0FBS1csQ0FBTSxLQUFLSSxFQUFLbk0sRUFBRSxDQUFDLElBQUksTUFBTSxLQUFLQSxFQUFFLENBQUMsSUFBSSxNQUFNLEtBQUtBLEVBQUUsQ0FBQyxJQUFJLE1BQU0sS0FBS0EsRUFBRSxDQUFDLENBQUMsS0FDakdBLElBQUlxTCxHQUFhLEtBQUtVLENBQU0sS0FBS0ssR0FBS3BNLEVBQUUsQ0FBQyxHQUFHQSxFQUFFLENBQUMsSUFBSSxLQUFLQSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsS0FDckVBLElBQUlzTCxHQUFjLEtBQUtTLENBQU0sS0FBS0ssR0FBS3BNLEVBQUUsQ0FBQyxHQUFHQSxFQUFFLENBQUMsSUFBSSxLQUFLQSxFQUFFLENBQUMsSUFBSSxLQUFLQSxFQUFFLENBQUMsQ0FBQyxJQUMxRXVMLEdBQU0sZUFBZVEsQ0FBTSxJQUFJRSxHQUFLVixHQUFNUSxDQUFNLENBQUMsSUFDakRBLE1BQVcsZ0JBQWdCLElBQUlHLEVBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUNuRDtBQUNSO0FBRUEsU0FBU0QsR0FBS2xPLEdBQUc7QUFDZixTQUFPLElBQUltTyxFQUFJbk8sS0FBSyxLQUFLLEtBQU1BLEtBQUssSUFBSSxLQUFNQSxJQUFJLEtBQU0sQ0FBQztBQUMzRDtBQUVBLFNBQVNvTyxFQUFLRSxHQUFHQyxHQUFHdEgsR0FBR0QsR0FBRztBQUN4QixTQUFJQSxLQUFLLE1BQUdzSCxJQUFJQyxJQUFJdEgsSUFBSSxNQUNqQixJQUFJa0gsRUFBSUcsR0FBR0MsR0FBR3RILEdBQUdELENBQUM7QUFDM0I7QUFFTyxTQUFTd0gsR0FBVzlDLEdBQUc7QUFFNUIsU0FETUEsYUFBYWlCLE1BQVFqQixJQUFJK0IsRUFBTS9CLENBQUMsSUFDakNBLEtBQ0xBLElBQUlBLEVBQUUsT0FDQyxJQUFJeUMsRUFBSXpDLEVBQUUsR0FBR0EsRUFBRSxHQUFHQSxFQUFFLEdBQUdBLEVBQUUsT0FBTyxLQUZ4QixJQUFJeUM7QUFHckI7QUFFTyxTQUFTTSxHQUFJSCxHQUFHQyxHQUFHdEgsR0FBR3lILEdBQVM7QUFDcEMsU0FBTyxVQUFVLFdBQVcsSUFBSUYsR0FBV0YsQ0FBQyxJQUFJLElBQUlILEVBQUlHLEdBQUdDLEdBQUd0SCxHQUFHeUgsS0FBa0IsQ0FBVztBQUNoRztBQUVPLFNBQVNQLEVBQUlHLEdBQUdDLEdBQUd0SCxHQUFHeUgsR0FBUztBQUNwQyxPQUFLLElBQUksQ0FBQ0osR0FDVixLQUFLLElBQUksQ0FBQ0MsR0FDVixLQUFLLElBQUksQ0FBQ3RILEdBQ1YsS0FBSyxVQUFVLENBQUN5SDtBQUNsQjtBQUVBckMsR0FBTzhCLEdBQUtNLElBQUtoQyxHQUFPRSxHQUFPO0FBQUEsRUFDN0IsU0FBU2dDLEdBQUc7QUFDVixXQUFBQSxJQUFJQSxLQUFLLE9BQU85QixJQUFXLEtBQUssSUFBSUEsR0FBVThCLENBQUMsR0FDeEMsSUFBSVIsRUFBSSxLQUFLLElBQUlRLEdBQUcsS0FBSyxJQUFJQSxHQUFHLEtBQUssSUFBSUEsR0FBRyxLQUFLLE9BQU87QUFBQSxFQUNoRTtBQUFBLEVBQ0QsT0FBT0EsR0FBRztBQUNSLFdBQUFBLElBQUlBLEtBQUssT0FBTy9CLElBQVMsS0FBSyxJQUFJQSxHQUFRK0IsQ0FBQyxHQUNwQyxJQUFJUixFQUFJLEtBQUssSUFBSVEsR0FBRyxLQUFLLElBQUlBLEdBQUcsS0FBSyxJQUFJQSxHQUFHLEtBQUssT0FBTztBQUFBLEVBQ2hFO0FBQUEsRUFDRCxNQUFNO0FBQ0osV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUNELFFBQVE7QUFDTixXQUFPLElBQUlSLEVBQUlTLEVBQU8sS0FBSyxDQUFDLEdBQUdBLEVBQU8sS0FBSyxDQUFDLEdBQUdBLEVBQU8sS0FBSyxDQUFDLEdBQUdDLEdBQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxFQUNwRjtBQUFBLEVBQ0QsY0FBYztBQUNaLFdBQVEsUUFBUSxLQUFLLEtBQUssS0FBSyxJQUFJLFNBQzNCLFFBQVEsS0FBSyxLQUFLLEtBQUssSUFBSSxTQUMzQixRQUFRLEtBQUssS0FBSyxLQUFLLElBQUksU0FDM0IsS0FBSyxLQUFLLFdBQVcsS0FBSyxXQUFXO0FBQUEsRUFDOUM7QUFBQSxFQUNELEtBQUtDO0FBQUE7QUFBQSxFQUNMLFdBQVdBO0FBQUEsRUFDWCxZQUFZQztBQUFBLEVBQ1osV0FBV0M7QUFBQSxFQUNYLFVBQVVBO0FBQ1osQ0FBQyxDQUFDO0FBRUYsU0FBU0YsS0FBZ0I7QUFDdkIsU0FBTyxJQUFJRyxFQUFJLEtBQUssQ0FBQyxJQUFJQSxFQUFJLEtBQUssQ0FBQyxJQUFJQSxFQUFJLEtBQUssQ0FBQztBQUNuRDtBQUVBLFNBQVNGLEtBQWlCO0FBQ3hCLFNBQU8sSUFBSUUsRUFBSSxLQUFLLENBQUMsSUFBSUEsRUFBSSxLQUFLLENBQUMsSUFBSUEsRUFBSSxLQUFLLENBQUMsSUFBSUEsR0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLElBQUksS0FBSyxXQUFXLEdBQUc7QUFDekc7QUFFQSxTQUFTRCxLQUFnQjtBQUN2QixRQUFNaEksSUFBSTZILEdBQU8sS0FBSyxPQUFPO0FBQzdCLFNBQU8sR0FBRzdILE1BQU0sSUFBSSxTQUFTLFVBQVU0SCxFQUFPLEtBQUssQ0FBQyxNQUFNQSxFQUFPLEtBQUssQ0FBQyxNQUFNQSxFQUFPLEtBQUssQ0FBQyxJQUFJNUgsTUFBTSxJQUFJLE1BQU0sS0FBS0E7QUFDckg7QUFFQSxTQUFTNkgsR0FBT0gsR0FBUztBQUN2QixTQUFPLE1BQU1BLENBQU8sSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxHQUFHQSxDQUFPLENBQUM7QUFDOUQ7QUFFQSxTQUFTRSxFQUFPM0osR0FBTztBQUNyQixTQUFPLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxLQUFLLEtBQUssTUFBTUEsQ0FBSyxLQUFLLENBQUMsQ0FBQztBQUMxRDtBQUVBLFNBQVNnSyxFQUFJaEssR0FBTztBQUNsQixTQUFBQSxJQUFRMkosRUFBTzNKLENBQUssSUFDWkEsSUFBUSxLQUFLLE1BQU0sTUFBTUEsRUFBTSxTQUFTLEVBQUU7QUFDcEQ7QUFFQSxTQUFTb0osR0FBS2EsR0FBR0MsR0FBR2xCLEdBQUdqSCxHQUFHO0FBQ3hCLFNBQUlBLEtBQUssSUFBR2tJLElBQUlDLElBQUlsQixJQUFJLE1BQ2ZBLEtBQUssS0FBS0EsS0FBSyxJQUFHaUIsSUFBSUMsSUFBSSxNQUMxQkEsS0FBSyxNQUFHRCxJQUFJLE1BQ2QsSUFBSUUsRUFBSUYsR0FBR0MsR0FBR2xCLEdBQUdqSCxDQUFDO0FBQzNCO0FBRU8sU0FBUytHLEdBQVdyQyxHQUFHO0FBQzVCLE1BQUlBLGFBQWEwRDtBQUFLLFdBQU8sSUFBSUEsRUFBSTFELEVBQUUsR0FBR0EsRUFBRSxHQUFHQSxFQUFFLEdBQUdBLEVBQUUsT0FBTztBQUU3RCxNQURNQSxhQUFhaUIsTUFBUWpCLElBQUkrQixFQUFNL0IsQ0FBQyxJQUNsQyxDQUFDQTtBQUFHLFdBQU8sSUFBSTBEO0FBQ25CLE1BQUkxRCxhQUFhMEQ7QUFBSyxXQUFPMUQ7QUFDN0IsRUFBQUEsSUFBSUEsRUFBRTtBQUNOLE1BQUk0QyxJQUFJNUMsRUFBRSxJQUFJLEtBQ1Y2QyxJQUFJN0MsRUFBRSxJQUFJLEtBQ1Z6RSxJQUFJeUUsRUFBRSxJQUFJLEtBQ1YyRCxJQUFNLEtBQUssSUFBSWYsR0FBR0MsR0FBR3RILENBQUMsR0FDdEJxSSxJQUFNLEtBQUssSUFBSWhCLEdBQUdDLEdBQUd0SCxDQUFDLEdBQ3RCaUksSUFBSSxLQUNKQyxJQUFJRyxJQUFNRCxHQUNWcEIsS0FBS3FCLElBQU1ELEtBQU87QUFDdEIsU0FBSUYsS0FDRWIsTUFBTWdCLElBQUtKLEtBQUtYLElBQUl0SCxLQUFLa0ksS0FBS1osSUFBSXRILEtBQUssSUFDbENzSCxNQUFNZSxJQUFLSixLQUFLakksSUFBSXFILEtBQUthLElBQUksSUFDakNELEtBQUtaLElBQUlDLEtBQUtZLElBQUksR0FDdkJBLEtBQUtsQixJQUFJLE1BQU1xQixJQUFNRCxJQUFNLElBQUlDLElBQU1ELEdBQ3JDSCxLQUFLLE1BRUxDLElBQUlsQixJQUFJLEtBQUtBLElBQUksSUFBSSxJQUFJaUIsR0FFcEIsSUFBSUUsRUFBSUYsR0FBR0MsR0FBR2xCLEdBQUd2QyxFQUFFLE9BQU87QUFDbkM7QUFFTyxTQUFTNkQsR0FBSUwsR0FBR0MsR0FBR2xCLEdBQUdTLEdBQVM7QUFDcEMsU0FBTyxVQUFVLFdBQVcsSUFBSVgsR0FBV21CLENBQUMsSUFBSSxJQUFJRSxFQUFJRixHQUFHQyxHQUFHbEIsR0FBR1MsS0FBa0IsQ0FBVztBQUNoRztBQUVBLFNBQVNVLEVBQUlGLEdBQUdDLEdBQUdsQixHQUFHUyxHQUFTO0FBQzdCLE9BQUssSUFBSSxDQUFDUSxHQUNWLEtBQUssSUFBSSxDQUFDQyxHQUNWLEtBQUssSUFBSSxDQUFDbEIsR0FDVixLQUFLLFVBQVUsQ0FBQ1M7QUFDbEI7QUFFQXJDLEdBQU8rQyxHQUFLRyxJQUFLOUMsR0FBT0UsR0FBTztBQUFBLEVBQzdCLFNBQVNnQyxHQUFHO0FBQ1YsV0FBQUEsSUFBSUEsS0FBSyxPQUFPOUIsSUFBVyxLQUFLLElBQUlBLEdBQVU4QixDQUFDLEdBQ3hDLElBQUlTLEVBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLElBQUlULEdBQUcsS0FBSyxPQUFPO0FBQUEsRUFDeEQ7QUFBQSxFQUNELE9BQU9BLEdBQUc7QUFDUixXQUFBQSxJQUFJQSxLQUFLLE9BQU8vQixJQUFTLEtBQUssSUFBSUEsR0FBUStCLENBQUMsR0FDcEMsSUFBSVMsRUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssSUFBSVQsR0FBRyxLQUFLLE9BQU87QUFBQSxFQUN4RDtBQUFBLEVBQ0QsTUFBTTtBQUNKLFFBQUlPLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLEtBQUssS0FDbENDLElBQUksTUFBTUQsQ0FBQyxLQUFLLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEdBQ3pDakIsSUFBSSxLQUFLLEdBQ1R1QixJQUFLdkIsS0FBS0EsSUFBSSxNQUFNQSxJQUFJLElBQUlBLEtBQUtrQixHQUNqQzdJLElBQUssSUFBSTJILElBQUl1QjtBQUNqQixXQUFPLElBQUlyQjtBQUFBLE1BQ1RzQixHQUFRUCxLQUFLLE1BQU1BLElBQUksTUFBTUEsSUFBSSxLQUFLNUksR0FBSWtKLENBQUU7QUFBQSxNQUM1Q0MsR0FBUVAsR0FBRzVJLEdBQUlrSixDQUFFO0FBQUEsTUFDakJDLEdBQVFQLElBQUksTUFBTUEsSUFBSSxNQUFNQSxJQUFJLEtBQUs1SSxHQUFJa0osQ0FBRTtBQUFBLE1BQzNDLEtBQUs7QUFBQSxJQUNYO0FBQUEsRUFDRztBQUFBLEVBQ0QsUUFBUTtBQUNOLFdBQU8sSUFBSUosRUFBSU0sR0FBTyxLQUFLLENBQUMsR0FBR0MsRUFBTyxLQUFLLENBQUMsR0FBR0EsRUFBTyxLQUFLLENBQUMsR0FBR2QsR0FBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLEVBQ3BGO0FBQUEsRUFDRCxjQUFjO0FBQ1osWUFBUSxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxNQUFNLEtBQUssQ0FBQyxNQUMxQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FDekIsS0FBSyxLQUFLLFdBQVcsS0FBSyxXQUFXO0FBQUEsRUFDOUM7QUFBQSxFQUNELFlBQVk7QUFDVixVQUFNN0gsSUFBSTZILEdBQU8sS0FBSyxPQUFPO0FBQzdCLFdBQU8sR0FBRzdILE1BQU0sSUFBSSxTQUFTLFVBQVUwSSxHQUFPLEtBQUssQ0FBQyxNQUFNQyxFQUFPLEtBQUssQ0FBQyxJQUFJLFNBQVNBLEVBQU8sS0FBSyxDQUFDLElBQUksT0FBTzNJLE1BQU0sSUFBSSxNQUFNLEtBQUtBO0FBQUEsRUFDbEk7QUFDSCxDQUFDLENBQUM7QUFFRixTQUFTMEksR0FBT3pLLEdBQU87QUFDckIsU0FBQUEsS0FBU0EsS0FBUyxLQUFLLEtBQ2hCQSxJQUFRLElBQUlBLElBQVEsTUFBTUE7QUFDbkM7QUFFQSxTQUFTMEssRUFBTzFLLEdBQU87QUFDckIsU0FBTyxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksR0FBR0EsS0FBUyxDQUFDLENBQUM7QUFDNUM7QUFHQSxTQUFTd0ssR0FBUVAsR0FBRzVJLEdBQUlrSixHQUFJO0FBQzFCLFVBQVFOLElBQUksS0FBSzVJLEtBQU1rSixJQUFLbEosS0FBTTRJLElBQUksS0FDaENBLElBQUksTUFBTU0sSUFDVk4sSUFBSSxNQUFNNUksS0FBTWtKLElBQUtsSixNQUFPLE1BQU00SSxLQUFLLEtBQ3ZDNUksS0FBTTtBQUNkO0FDM1lBLE1BQWVuQixLQUFBLENBQUF6QyxNQUFLLE1BQU1BO0FDRTFCLFNBQVNrTixHQUFPNUksR0FBRzZJLEdBQUc7QUFDcEIsU0FBTyxTQUFTM1AsR0FBRztBQUNqQixXQUFPOEcsSUFBSTlHLElBQUkyUDtBQUFBLEVBQ25CO0FBQ0E7QUFFQSxTQUFTQyxHQUFZOUksR0FBR0MsR0FBRzhJLEdBQUc7QUFDNUIsU0FBTy9JLElBQUksS0FBSyxJQUFJQSxHQUFHK0ksQ0FBQyxHQUFHOUksSUFBSSxLQUFLLElBQUlBLEdBQUc4SSxDQUFDLElBQUkvSSxHQUFHK0ksSUFBSSxJQUFJQSxHQUFHLFNBQVM3UCxHQUFHO0FBQ3hFLFdBQU8sS0FBSyxJQUFJOEcsSUFBSTlHLElBQUkrRyxHQUFHOEksQ0FBQztBQUFBLEVBQ2hDO0FBQ0E7QUFPTyxTQUFTQyxHQUFNRCxHQUFHO0FBQ3ZCLFVBQVFBLElBQUksQ0FBQ0EsTUFBTyxJQUFJRSxLQUFVLFNBQVNqSixHQUFHQyxHQUFHO0FBQy9DLFdBQU9BLElBQUlELElBQUk4SSxHQUFZOUksR0FBR0MsR0FBRzhJLENBQUMsSUFBSTVLLEdBQVMsTUFBTTZCLENBQUMsSUFBSUMsSUFBSUQsQ0FBQztBQUFBLEVBQ25FO0FBQ0E7QUFFZSxTQUFTaUosR0FBUWpKLEdBQUdDLEdBQUc7QUFDcEMsTUFBSTRJLElBQUk1SSxJQUFJRDtBQUNaLFNBQU82SSxJQUFJRCxHQUFPNUksR0FBRzZJLENBQUMsSUFBSTFLLEdBQVMsTUFBTTZCLENBQUMsSUFBSUMsSUFBSUQsQ0FBQztBQUNyRDtBQ3ZCQSxNQUFBa0osS0FBZ0IsU0FBU0MsRUFBU0osR0FBRztBQUNuQyxNQUFJdEMsSUFBUXVDLEdBQU1ELENBQUM7QUFFbkIsV0FBU3RCLEVBQUkyQixHQUFPQyxHQUFLO0FBQ3ZCLFFBQUkvQixJQUFJYixHQUFPMkMsSUFBUUUsR0FBU0YsQ0FBSyxHQUFHLElBQUlDLElBQU1DLEdBQVNELENBQUcsR0FBRyxDQUFDLEdBQzlEOUIsSUFBSWQsRUFBTTJDLEVBQU0sR0FBR0MsRUFBSSxDQUFDLEdBQ3hCcEosSUFBSXdHLEVBQU0yQyxFQUFNLEdBQUdDLEVBQUksQ0FBQyxHQUN4QjNCLElBQVV1QixHQUFRRyxFQUFNLFNBQVNDLEVBQUksT0FBTztBQUNoRCxXQUFPLFNBQVNuUSxHQUFHO0FBQ2pCLGFBQUFrUSxFQUFNLElBQUk5QixFQUFFcE8sQ0FBQyxHQUNia1EsRUFBTSxJQUFJN0IsRUFBRXJPLENBQUMsR0FDYmtRLEVBQU0sSUFBSW5KLEVBQUUvRyxDQUFDLEdBQ2JrUSxFQUFNLFVBQVUxQixFQUFReE8sQ0FBQyxHQUNsQmtRLElBQVE7QUFBQSxJQUNyQjtBQUFBLEVBQ0c7QUFFRDNCLFNBQUFBLEVBQUksUUFBUTBCLEdBRUwxQjtBQUNULEVBQUcsQ0FBQztBQ3pCVyxTQUFBOEIsRUFBU3ZKLEdBQUdDLEdBQUc7QUFDNUIsU0FBT0QsSUFBSSxDQUFDQSxHQUFHQyxJQUFJLENBQUNBLEdBQUcsU0FBUy9HLEdBQUc7QUFDakMsV0FBTzhHLEtBQUssSUFBSTlHLEtBQUsrRyxJQUFJL0c7QUFBQSxFQUM3QjtBQUNBO0FDRkEsSUFBSXNRLEtBQU0sK0NBQ05DLEtBQU0sSUFBSSxPQUFPRCxHQUFJLFFBQVEsR0FBRztBQUVwQyxTQUFTRSxHQUFLekosR0FBRztBQUNmLFNBQU8sV0FBVztBQUNoQixXQUFPQTtBQUFBLEVBQ1g7QUFDQTtBQUVBLFNBQVMwSixHQUFJMUosR0FBRztBQUNkLFNBQU8sU0FBUy9HLEdBQUc7QUFDakIsV0FBTytHLEVBQUUvRyxDQUFDLElBQUk7QUFBQSxFQUNsQjtBQUNBO0FBRWUsU0FBQTBRLEdBQVM1SixHQUFHQyxHQUFHO0FBQzVCLE1BQUk0SixJQUFLTCxHQUFJLFlBQVlDLEdBQUksWUFBWSxHQUNyQ0ssR0FDQUMsR0FDQUMsR0FDQWpSLElBQUksSUFDSm9QLElBQUksQ0FBRSxHQUNOOEIsSUFBSSxDQUFBO0FBTVIsT0FIQWpLLElBQUlBLElBQUksSUFBSUMsSUFBSUEsSUFBSSxLQUdaNkosSUFBS04sR0FBSSxLQUFLeEosQ0FBQyxPQUNmK0osSUFBS04sR0FBSSxLQUFLeEosQ0FBQztBQUNyQixLQUFLK0osSUFBS0QsRUFBRyxTQUFTRixNQUNwQkcsSUFBSy9KLEVBQUUsTUFBTTRKLEdBQUlHLENBQUUsR0FDZjdCLEVBQUVwUCxDQUFDLElBQUdvUCxFQUFFcFAsQ0FBQyxLQUFLaVIsSUFDYjdCLEVBQUUsRUFBRXBQLENBQUMsSUFBSWlSLEtBRVhGLElBQUtBLEVBQUcsQ0FBQyxRQUFRQyxJQUFLQSxFQUFHLENBQUMsS0FDekI1QixFQUFFcFAsQ0FBQyxJQUFHb1AsRUFBRXBQLENBQUMsS0FBS2dSLElBQ2I1QixFQUFFLEVBQUVwUCxDQUFDLElBQUlnUixLQUVkNUIsRUFBRSxFQUFFcFAsQ0FBQyxJQUFJLE1BQ1RrUixFQUFFLEtBQUssRUFBQyxHQUFHbFIsR0FBRyxHQUFHbVIsRUFBT0osR0FBSUMsQ0FBRSxFQUFDLENBQUMsSUFFbENGLElBQUtKLEdBQUk7QUFJWCxTQUFJSSxJQUFLNUosRUFBRSxXQUNUK0osSUFBSy9KLEVBQUUsTUFBTTRKLENBQUUsR0FDWDFCLEVBQUVwUCxDQUFDLElBQUdvUCxFQUFFcFAsQ0FBQyxLQUFLaVIsSUFDYjdCLEVBQUUsRUFBRXBQLENBQUMsSUFBSWlSLElBS1Q3QixFQUFFLFNBQVMsSUFBSzhCLEVBQUUsQ0FBQyxJQUNwQk4sR0FBSU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUNWUCxHQUFLekosQ0FBQyxLQUNMQSxJQUFJZ0ssRUFBRSxRQUFRLFNBQVMvUSxHQUFHO0FBQ3pCLGFBQVNILElBQUksR0FBRzJMLEdBQUczTCxJQUFJa0gsR0FBRyxFQUFFbEg7QUFBRyxNQUFBb1AsR0FBR3pELElBQUl1RixFQUFFbFIsQ0FBQyxHQUFHLENBQUMsSUFBSTJMLEVBQUUsRUFBRXhMLENBQUM7QUFDdEQsV0FBT2lQLEVBQUUsS0FBSyxFQUFFO0FBQUEsRUFDMUI7QUFDQTtBQy9EQSxJQUFJZ0MsS0FBVSxNQUFNLEtBQUssSUFFZEMsS0FBVztBQUFBLEVBQ3BCLFlBQVk7QUFBQSxFQUNaLFlBQVk7QUFBQSxFQUNaLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFDVjtBQUVlLFNBQUFDLEdBQVNySyxHQUFHQyxHQUFHaEcsR0FBRzRPLEdBQUd5QixHQUFHQyxHQUFHO0FBQ3hDLE1BQUlDLEdBQVFDLEdBQVFDO0FBQ3BCLFVBQUlGLElBQVMsS0FBSyxLQUFLeEssSUFBSUEsSUFBSUMsSUFBSUEsQ0FBQyxPQUFHRCxLQUFLd0ssR0FBUXZLLEtBQUt1SyxLQUNyREUsSUFBUTFLLElBQUkvRixJQUFJZ0csSUFBSTRJLE9BQUc1TyxLQUFLK0YsSUFBSTBLLEdBQU83QixLQUFLNUksSUFBSXlLLEtBQ2hERCxJQUFTLEtBQUssS0FBS3hRLElBQUlBLElBQUk0TyxJQUFJQSxDQUFDLE9BQUc1TyxLQUFLd1EsR0FBUTVCLEtBQUs0QixHQUFRQyxLQUFTRCxJQUN0RXpLLElBQUk2SSxJQUFJNUksSUFBSWhHLE1BQUcrRixJQUFJLENBQUNBLEdBQUdDLElBQUksQ0FBQ0EsR0FBR3lLLElBQVEsQ0FBQ0EsR0FBT0YsSUFBUyxDQUFDQSxJQUN0RDtBQUFBLElBQ0wsWUFBWUY7QUFBQSxJQUNaLFlBQVlDO0FBQUEsSUFDWixRQUFRLEtBQUssTUFBTXRLLEdBQUdELENBQUMsSUFBSW1LO0FBQUEsSUFDM0IsT0FBTyxLQUFLLEtBQUtPLENBQUssSUFBSVA7QUFBQSxJQUMxQixRQUFRSztBQUFBLElBQ1IsUUFBUUM7QUFBQSxFQUNaO0FBQ0E7QUN2QkEsSUFBSUU7QUFHRyxTQUFTQyxHQUFTM00sR0FBTztBQUM5QixRQUFNaEQsSUFBSSxLQUFLLE9BQU8sYUFBYyxhQUFhLFlBQVksaUJBQWlCZ0QsSUFBUSxFQUFFO0FBQ3hGLFNBQU9oRCxFQUFFLGFBQWFtUCxLQUFXQyxHQUFVcFAsRUFBRSxHQUFHQSxFQUFFLEdBQUdBLEVBQUUsR0FBR0EsRUFBRSxHQUFHQSxFQUFFLEdBQUdBLEVBQUUsQ0FBQztBQUN6RTtBQUVPLFNBQVM0UCxHQUFTNU0sR0FBTztBQUk5QixTQUhJQSxLQUFTLFNBQ1IwTSxNQUFTQSxJQUFVLFNBQVMsZ0JBQWdCLDhCQUE4QixHQUFHLElBQ2xGQSxFQUFRLGFBQWEsYUFBYTFNLENBQUssR0FDbkMsRUFBRUEsSUFBUTBNLEVBQVEsVUFBVSxRQUFRLFlBQWEsTUFBVVAsTUFDL0RuTSxJQUFRQSxFQUFNLFFBQ1BvTSxHQUFVcE0sRUFBTSxHQUFHQSxFQUFNLEdBQUdBLEVBQU0sR0FBR0EsRUFBTSxHQUFHQSxFQUFNLEdBQUdBLEVBQU0sQ0FBQztBQUN2RTtBQ2RBLFNBQVM2TSxHQUFxQkMsR0FBT0MsR0FBU0MsR0FBU0MsR0FBVTtBQUUvRCxXQUFTQyxFQUFJaEQsR0FBRztBQUNkLFdBQU9BLEVBQUUsU0FBU0EsRUFBRSxJQUFLLElBQUcsTUFBTTtBQUFBLEVBQ25DO0FBRUQsV0FBU2lELEVBQVVDLEdBQUlDLEdBQUlDLEdBQUlDLEdBQUlyRCxHQUFHOEIsR0FBRztBQUN2QyxRQUFJb0IsTUFBT0UsS0FBTUQsTUFBT0UsR0FBSTtBQUMxQixVQUFJelMsSUFBSW9QLEVBQUUsS0FBSyxjQUFjLE1BQU02QyxHQUFTLE1BQU1DLENBQU87QUFDekQsTUFBQWhCLEVBQUUsS0FBSyxFQUFDLEdBQUdsUixJQUFJLEdBQUcsR0FBR21SLEVBQU9tQixHQUFJRSxDQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUd4UyxJQUFJLEdBQUcsR0FBR21SLEVBQU9vQixHQUFJRSxDQUFFLEVBQUMsQ0FBQztBQUFBLElBQ3pFO0FBQVcsT0FBSUQsS0FBTUMsTUFDZnJELEVBQUUsS0FBSyxlQUFlb0QsSUFBS1AsSUFBVVEsSUFBS1AsQ0FBTztBQUFBLEVBRXBEO0FBRUQsV0FBU1EsRUFBT3pMLEdBQUdDLEdBQUdrSSxHQUFHOEIsR0FBRztBQUMxQixJQUFJakssTUFBTUMsS0FDSkQsSUFBSUMsSUFBSSxNQUFLQSxLQUFLLE1BQWNBLElBQUlELElBQUksUUFBS0EsS0FBSyxNQUN0RGlLLEVBQUUsS0FBSyxFQUFDLEdBQUc5QixFQUFFLEtBQUtnRCxFQUFJaEQsQ0FBQyxJQUFJLFdBQVcsTUFBTStDLENBQVEsSUFBSSxHQUFHLEdBQUdoQixFQUFPbEssR0FBR0MsQ0FBQyxFQUFDLENBQUMsS0FDbEVBLEtBQ1RrSSxFQUFFLEtBQUtnRCxFQUFJaEQsQ0FBQyxJQUFJLFlBQVlsSSxJQUFJaUwsQ0FBUTtBQUFBLEVBRTNDO0FBRUQsV0FBU1IsRUFBTTFLLEdBQUdDLEdBQUdrSSxHQUFHOEIsR0FBRztBQUN6QixJQUFJakssTUFBTUMsSUFDUmdLLEVBQUUsS0FBSyxFQUFDLEdBQUc5QixFQUFFLEtBQUtnRCxFQUFJaEQsQ0FBQyxJQUFJLFVBQVUsTUFBTStDLENBQVEsSUFBSSxHQUFHLEdBQUdoQixFQUFPbEssR0FBR0MsQ0FBQyxFQUFDLENBQUMsSUFDakVBLEtBQ1RrSSxFQUFFLEtBQUtnRCxFQUFJaEQsQ0FBQyxJQUFJLFdBQVdsSSxJQUFJaUwsQ0FBUTtBQUFBLEVBRTFDO0FBRUQsV0FBU1EsRUFBTUwsR0FBSUMsR0FBSUMsR0FBSUMsR0FBSXJELEdBQUc4QixHQUFHO0FBQ25DLFFBQUlvQixNQUFPRSxLQUFNRCxNQUFPRSxHQUFJO0FBQzFCLFVBQUl6UyxJQUFJb1AsRUFBRSxLQUFLZ0QsRUFBSWhELENBQUMsSUFBSSxVQUFVLE1BQU0sS0FBSyxNQUFNLEdBQUc7QUFDdEQsTUFBQThCLEVBQUUsS0FBSyxFQUFDLEdBQUdsUixJQUFJLEdBQUcsR0FBR21SLEVBQU9tQixHQUFJRSxDQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUd4UyxJQUFJLEdBQUcsR0FBR21SLEVBQU9vQixHQUFJRSxDQUFFLEVBQUMsQ0FBQztBQUFBLElBQ3BFO0FBQU0sT0FBSUQsTUFBTyxLQUFLQyxNQUFPLE1BQzVCckQsRUFBRSxLQUFLZ0QsRUFBSWhELENBQUMsSUFBSSxXQUFXb0QsSUFBSyxNQUFNQyxJQUFLLEdBQUc7QUFBQSxFQUVqRDtBQUVELFNBQU8sU0FBU3hMLEdBQUdDLEdBQUc7QUFDcEIsUUFBSWtJLElBQUksQ0FBRSxHQUNOOEIsSUFBSSxDQUFBO0FBQ1IsV0FBQWpLLElBQUkrSyxFQUFNL0ssQ0FBQyxHQUFHQyxJQUFJOEssRUFBTTlLLENBQUMsR0FDekJtTCxFQUFVcEwsRUFBRSxZQUFZQSxFQUFFLFlBQVlDLEVBQUUsWUFBWUEsRUFBRSxZQUFZa0ksR0FBRzhCLENBQUMsR0FDdEV3QixFQUFPekwsRUFBRSxRQUFRQyxFQUFFLFFBQVFrSSxHQUFHOEIsQ0FBQyxHQUMvQlMsRUFBTTFLLEVBQUUsT0FBT0MsRUFBRSxPQUFPa0ksR0FBRzhCLENBQUMsR0FDNUJ5QixFQUFNMUwsRUFBRSxRQUFRQSxFQUFFLFFBQVFDLEVBQUUsUUFBUUEsRUFBRSxRQUFRa0ksR0FBRzhCLENBQUMsR0FDbERqSyxJQUFJQyxJQUFJLE1BQ0QsU0FBUy9HLEdBQUc7QUFFakIsZUFESUgsSUFBSSxJQUFJQyxJQUFJaVIsRUFBRSxRQUFRdkYsR0FDbkIsRUFBRTNMLElBQUlDO0FBQUcsUUFBQW1QLEdBQUd6RCxJQUFJdUYsRUFBRWxSLENBQUMsR0FBRyxDQUFDLElBQUkyTCxFQUFFLEVBQUV4TCxDQUFDO0FBQ3ZDLGFBQU9pUCxFQUFFLEtBQUssRUFBRTtBQUFBLElBQ3RCO0FBQUEsRUFDQTtBQUNBO0FBRU8sSUFBSXdELEtBQTBCYixHQUFxQkYsSUFBVSxRQUFRLE9BQU8sTUFBTSxHQUM5RWdCLEtBQTBCZCxHQUFxQkQsSUFBVSxNQUFNLEtBQUssR0FBRyxHQzlEOUVnQixJQUFRLEdBQ1JDLElBQVUsR0FDVkMsSUFBVyxHQUNYQyxLQUFZLEtBQ1pDLElBQ0FDLEdBQ0FDLEtBQVksR0FDWkMsSUFBVyxHQUNYQyxLQUFZLEdBQ1pDLElBQVEsT0FBTyxlQUFnQixZQUFZLFlBQVksTUFBTSxjQUFjLE1BQzNFQyxLQUFXLE9BQU8sVUFBVyxZQUFZLE9BQU8sd0JBQXdCLE9BQU8sc0JBQXNCLEtBQUssTUFBTSxJQUFJLFNBQVNoQyxHQUFHO0FBQUUsYUFBV0EsR0FBRyxFQUFFOztBQUUvSSxTQUFTaUMsS0FBTTtBQUNwQixTQUFPSixNQUFhRyxHQUFTRSxFQUFRLEdBQUdMLElBQVdFLEVBQU0sUUFBUUQ7QUFDbkU7QUFFQSxTQUFTSSxLQUFXO0FBQ2xCLEVBQUFMLElBQVc7QUFDYjtBQUVPLFNBQVNNLEtBQVE7QUFDdEIsT0FBSyxRQUNMLEtBQUssUUFDTCxLQUFLLFFBQVE7QUFDZjtBQUVBQSxHQUFNLFlBQVlDLEdBQU0sWUFBWTtBQUFBLEVBQ2xDLGFBQWFEO0FBQUEsRUFDYixTQUFTLFNBQVNqVCxHQUFVbVQsR0FBT0MsR0FBTTtBQUN2QyxRQUFJLE9BQU9wVCxLQUFhO0FBQVksWUFBTSxJQUFJLFVBQVUsNEJBQTRCO0FBQ3BGLElBQUFvVCxLQUFRQSxLQUFRLE9BQU9MLEdBQUcsSUFBSyxDQUFDSyxNQUFTRCxLQUFTLE9BQU8sSUFBSSxDQUFDQSxJQUMxRCxDQUFDLEtBQUssU0FBU1YsTUFBYSxTQUMxQkEsSUFBVUEsRUFBUyxRQUFRLE9BQzFCRCxLQUFXLE1BQ2hCQyxJQUFXLE9BRWIsS0FBSyxRQUFRelMsR0FDYixLQUFLLFFBQVFvVCxHQUNiQztFQUNEO0FBQUEsRUFDRCxNQUFNLFdBQVc7QUFDZixJQUFJLEtBQUssVUFDUCxLQUFLLFFBQVEsTUFDYixLQUFLLFFBQVEsT0FDYkE7RUFFSDtBQUNIO0FBRU8sU0FBU0gsR0FBTWxULEdBQVVtVCxHQUFPQyxHQUFNO0FBQzNDLE1BQUkzVCxJQUFJLElBQUl3VDtBQUNaLFNBQUF4VCxFQUFFLFFBQVFPLEdBQVVtVCxHQUFPQyxDQUFJLEdBQ3hCM1Q7QUFDVDtBQUVPLFNBQVM2VCxLQUFhO0FBQzNCLEVBQUFQLE1BQ0EsRUFBRVg7QUFFRixXQURJLElBQUlJLElBQVUsR0FDWDtBQUNMLEtBQUssSUFBSUcsSUFBVyxFQUFFLFVBQVUsS0FBRyxFQUFFLE1BQU0sS0FBSyxRQUFXLENBQUMsR0FDNUQsSUFBSSxFQUFFO0FBRVIsSUFBRVA7QUFDSjtBQUVBLFNBQVNtQixLQUFPO0FBQ2QsRUFBQVosS0FBWUQsS0FBWUcsRUFBTSxJQUFHLEtBQU1ELElBQ3ZDUixJQUFRQyxJQUFVO0FBQ2xCLE1BQUk7QUFDRixJQUFBaUI7RUFDSixVQUFZO0FBQ1IsSUFBQWxCLElBQVEsR0FDUm9CLE1BQ0FiLElBQVc7QUFBQSxFQUNaO0FBQ0g7QUFFQSxTQUFTYyxLQUFPO0FBQ2QsTUFBSVYsSUFBTUYsRUFBTSxJQUFLLEdBQUVNLElBQVFKLElBQU1MO0FBQ3JDLEVBQUlTLElBQVFaLE9BQVdLLE1BQWFPLEdBQU9ULEtBQVlLO0FBQ3pEO0FBRUEsU0FBU1MsS0FBTTtBQUViLFdBRElFLEdBQUlDLElBQUtuQixJQUFVb0IsR0FBSVIsSUFBTyxPQUMzQk87QUFDTCxJQUFJQSxFQUFHLFNBQ0RQLElBQU9PLEVBQUcsVUFBT1AsSUFBT08sRUFBRyxRQUMvQkQsSUFBS0MsR0FBSUEsSUFBS0EsRUFBRyxVQUVqQkMsSUFBS0QsRUFBRyxPQUFPQSxFQUFHLFFBQVEsTUFDMUJBLElBQUtELElBQUtBLEVBQUcsUUFBUUUsSUFBS3BCLEtBQVdvQjtBQUd6QyxFQUFBbkIsSUFBV2lCLEdBQ1hMLEdBQU1ELENBQUk7QUFDWjtBQUVBLFNBQVNDLEdBQU1ELEdBQU07QUFDbkIsTUFBSSxDQUFBaEIsR0FDSjtBQUFBLElBQUlDLE1BQVNBLElBQVUsYUFBYUEsQ0FBTztBQUMzQyxRQUFJYyxJQUFRQyxJQUFPVDtBQUNuQixJQUFJUSxJQUFRLE1BQ05DLElBQU8sVUFBVWYsSUFBVSxXQUFXa0IsSUFBTUgsSUFBT1AsRUFBTSxRQUFRRCxFQUFTLElBQzFFTixNQUFVQSxJQUFXLGNBQWNBLENBQVEsT0FFMUNBLE1BQVVJLEtBQVlHLEVBQU0sT0FBT1AsSUFBVyxZQUFZbUIsSUFBTWxCLEVBQVMsSUFDOUVILElBQVEsR0FBR1UsR0FBU1MsRUFBSTtBQUFBO0FBRTVCO0FDM0dlLFNBQUFsQixHQUFTclMsR0FBVW1ULEdBQU9DLEdBQU07QUFDN0MsTUFBSTNULElBQUksSUFBSXdUO0FBQ1osU0FBQUUsSUFBUUEsS0FBUyxPQUFPLElBQUksQ0FBQ0EsR0FDN0IxVCxFQUFFLFFBQVEsQ0FBQW9VLE1BQVc7QUFDbkIsSUFBQXBVLEVBQUUsS0FBSSxHQUNOTyxFQUFTNlQsSUFBVVYsQ0FBSztBQUFBLEVBQzVCLEdBQUtBLEdBQU9DLENBQUksR0FDUDNUO0FBQ1Q7QUNQQSxJQUFJcVUsS0FBVXpVLEdBQVMsU0FBUyxPQUFPLFVBQVUsV0FBVyxHQUN4RDBVLEtBQWEsQ0FBQSxHQUVOQyxLQUFVLEdBQ1ZDLEtBQVksR0FDWkMsS0FBVyxHQUNYQyxJQUFVLEdBQ1ZDLEtBQVUsR0FDVkMsS0FBUyxHQUNUQyxJQUFRO0FBRUosU0FBQUMsR0FBUzFTLEdBQU0vQixHQUFNMFUsR0FBSUMsR0FBTzlTLEdBQU8rUyxHQUFRO0FBQzVELE1BQUlDLElBQVk5UyxFQUFLO0FBQ3JCLE1BQUksQ0FBQzhTO0FBQVcsSUFBQTlTLEVBQUssZUFBZSxDQUFBO0FBQUEsV0FDM0IyUyxLQUFNRztBQUFXO0FBQzFCLEVBQUE3SyxHQUFPakksR0FBTTJTLEdBQUk7QUFBQSxJQUNmLE1BQU0xVTtBQUFBLElBQ04sT0FBTzJVO0FBQUE7QUFBQSxJQUNQLE9BQU85UztBQUFBO0FBQUEsSUFDUCxJQUFJbVM7QUFBQSxJQUNKLE9BQU9DO0FBQUEsSUFDUCxNQUFNVyxFQUFPO0FBQUEsSUFDYixPQUFPQSxFQUFPO0FBQUEsSUFDZCxVQUFVQSxFQUFPO0FBQUEsSUFDakIsTUFBTUEsRUFBTztBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsT0FBT1Y7QUFBQSxFQUNYLENBQUc7QUFDSDtBQUVPLFNBQVNZLEdBQUsvUyxHQUFNMlMsR0FBSTtBQUM3QixNQUFJRCxJQUFXclUsRUFBSTJCLEdBQU0yUyxDQUFFO0FBQzNCLE1BQUlELEVBQVMsUUFBUVA7QUFBUyxVQUFNLElBQUksTUFBTSw2QkFBNkI7QUFDM0UsU0FBT087QUFDVDtBQUVPLFNBQVNwVSxFQUFJMEIsR0FBTTJTLEdBQUk7QUFDNUIsTUFBSUQsSUFBV3JVLEVBQUkyQixHQUFNMlMsQ0FBRTtBQUMzQixNQUFJRCxFQUFTLFFBQVFKO0FBQVMsVUFBTSxJQUFJLE1BQU0sMkJBQTJCO0FBQ3pFLFNBQU9JO0FBQ1Q7QUFFTyxTQUFTclUsRUFBSTJCLEdBQU0yUyxHQUFJO0FBQzVCLE1BQUlELElBQVcxUyxFQUFLO0FBQ3BCLE1BQUksQ0FBQzBTLEtBQVksRUFBRUEsSUFBV0EsRUFBU0MsQ0FBRTtBQUFJLFVBQU0sSUFBSSxNQUFNLHNCQUFzQjtBQUNuRixTQUFPRDtBQUNUO0FBRUEsU0FBU3pLLEdBQU9qSSxHQUFNMlMsR0FBSUssR0FBTTtBQUM5QixNQUFJRixJQUFZOVMsRUFBSyxjQUNqQmlUO0FBSUosRUFBQUgsRUFBVUgsQ0FBRSxJQUFJSyxHQUNoQkEsRUFBSyxRQUFRM0IsR0FBTXFCLEdBQVUsR0FBR00sRUFBSyxJQUFJO0FBRXpDLFdBQVNOLEVBQVNWLEdBQVM7QUFDekIsSUFBQWdCLEVBQUssUUFBUVosSUFDYlksRUFBSyxNQUFNLFFBQVFsRixHQUFPa0YsRUFBSyxPQUFPQSxFQUFLLElBQUksR0FHM0NBLEVBQUssU0FBU2hCLEtBQVNsRSxFQUFNa0UsSUFBVWdCLEVBQUssS0FBSztBQUFBLEVBQ3REO0FBRUQsV0FBU2xGLEVBQU1rRSxHQUFTO0FBQ3RCLFFBQUl2VSxHQUFHb0MsR0FBR25DLEdBQUcwTDtBQUdiLFFBQUk0SixFQUFLLFVBQVVaO0FBQVcsYUFBT2MsRUFBSTtBQUV6QyxTQUFLelYsS0FBS3FWO0FBRVIsVUFEQTFKLElBQUkwSixFQUFVclYsQ0FBQyxHQUNYMkwsRUFBRSxTQUFTNEosRUFBSyxNQUtwQjtBQUFBLFlBQUk1SixFQUFFLFVBQVVrSjtBQUFTLGlCQUFPOUIsR0FBUTFDLENBQUs7QUFHN0MsUUFBSTFFLEVBQUUsVUFBVW1KLE1BQ2RuSixFQUFFLFFBQVFxSixHQUNWckosRUFBRSxNQUFNLFFBQ1JBLEVBQUUsR0FBRyxLQUFLLGFBQWFwSixHQUFNQSxFQUFLLFVBQVVvSixFQUFFLE9BQU9BLEVBQUUsS0FBSyxHQUM1RCxPQUFPMEosRUFBVXJWLENBQUMsS0FJWCxDQUFDQSxJQUFJa1YsTUFDWnZKLEVBQUUsUUFBUXFKLEdBQ1ZySixFQUFFLE1BQU0sUUFDUkEsRUFBRSxHQUFHLEtBQUssVUFBVXBKLEdBQU1BLEVBQUssVUFBVW9KLEVBQUUsT0FBT0EsRUFBRSxLQUFLLEdBQ3pELE9BQU8wSixFQUFVclYsQ0FBQztBQUFBO0FBb0J0QixRQVpBK1MsR0FBUSxXQUFXO0FBQ2pCLE1BQUl3QyxFQUFLLFVBQVVWLE1BQ2pCVSxFQUFLLFFBQVFULElBQ2JTLEVBQUssTUFBTSxRQUFRRyxHQUFNSCxFQUFLLE9BQU9BLEVBQUssSUFBSSxHQUM5Q0csRUFBS25CLENBQU87QUFBQSxJQUVwQixDQUFLLEdBSURnQixFQUFLLFFBQVFYLElBQ2JXLEVBQUssR0FBRyxLQUFLLFNBQVNoVCxHQUFNQSxFQUFLLFVBQVVnVCxFQUFLLE9BQU9BLEVBQUssS0FBSyxHQUM3REEsRUFBSyxVQUFVWCxJQUtuQjtBQUFBLFdBSkFXLEVBQUssUUFBUVYsR0FHYlcsSUFBUSxJQUFJLE1BQU12VixJQUFJc1YsRUFBSyxNQUFNLE1BQU0sR0FDbEN2VixJQUFJLEdBQUdvQyxJQUFJLElBQUlwQyxJQUFJQyxHQUFHLEVBQUVEO0FBQzNCLFNBQUkyTCxJQUFJNEosRUFBSyxNQUFNdlYsQ0FBQyxFQUFFLE1BQU0sS0FBS3VDLEdBQU1BLEVBQUssVUFBVWdULEVBQUssT0FBT0EsRUFBSyxLQUFLLE9BQzFFQyxFQUFNLEVBQUVwVCxDQUFDLElBQUl1SjtBQUdqQixNQUFBNkosRUFBTSxTQUFTcFQsSUFBSTtBQUFBO0FBQUEsRUFDcEI7QUFFRCxXQUFTc1QsRUFBS25CLEdBQVM7QUFLckIsYUFKSXBVLElBQUlvVSxJQUFVZ0IsRUFBSyxXQUFXQSxFQUFLLEtBQUssS0FBSyxNQUFNaEIsSUFBVWdCLEVBQUssUUFBUSxLQUFLQSxFQUFLLE1BQU0sUUFBUUUsQ0FBSSxHQUFHRixFQUFLLFFBQVFSLElBQVEsSUFDOUgvVSxJQUFJLElBQ0pDLElBQUl1VixFQUFNLFFBRVAsRUFBRXhWLElBQUlDO0FBQ1gsTUFBQXVWLEVBQU14VixDQUFDLEVBQUUsS0FBS3VDLEdBQU1wQyxDQUFDO0FBSXZCLElBQUlvVixFQUFLLFVBQVVSLE9BQ2pCUSxFQUFLLEdBQUcsS0FBSyxPQUFPaFQsR0FBTUEsRUFBSyxVQUFVZ1QsRUFBSyxPQUFPQSxFQUFLLEtBQUssR0FDL0RFO0VBRUg7QUFFRCxXQUFTQSxJQUFPO0FBQ2QsSUFBQUYsRUFBSyxRQUFRUCxHQUNiTyxFQUFLLE1BQU0sUUFDWCxPQUFPRixFQUFVSCxDQUFFO0FBQ25CLGFBQVNsVixLQUFLcVY7QUFBVztBQUN6QixXQUFPOVMsRUFBSztBQUFBLEVBQ2I7QUFDSDtBQ3RKZSxTQUFBb1QsR0FBU3BULEdBQU0vQixHQUFNO0FBQ2xDLE1BQUk2VSxJQUFZOVMsRUFBSyxjQUNqQjBTLEdBQ0FXLEdBQ0FoVCxJQUFRLElBQ1I1QztBQUVKLE1BQUtxVixHQUVMO0FBQUEsSUFBQTdVLElBQU9BLEtBQVEsT0FBTyxPQUFPQSxJQUFPO0FBRXBDLFNBQUtSLEtBQUtxVixHQUFXO0FBQ25CLFdBQUtKLElBQVdJLEVBQVVyVixDQUFDLEdBQUcsU0FBU1EsR0FBTTtBQUFFLFFBQUFvQyxJQUFRO0FBQU87QUFBQSxNQUFXO0FBQ3pFLE1BQUFnVCxJQUFTWCxFQUFTLFFBQVFMLE1BQVlLLEVBQVMsUUFBUUYsSUFDdkRFLEVBQVMsUUFBUUQsR0FDakJDLEVBQVMsTUFBTSxRQUNmQSxFQUFTLEdBQUcsS0FBS1csSUFBUyxjQUFjLFVBQVVyVCxHQUFNQSxFQUFLLFVBQVUwUyxFQUFTLE9BQU9BLEVBQVMsS0FBSyxHQUNyRyxPQUFPSSxFQUFVclYsQ0FBQztBQUFBLElBQ25CO0FBRUQsSUFBSTRDLEtBQU8sT0FBT0wsRUFBSztBQUFBO0FBQ3pCO0FDckJlLFNBQVFzVCxHQUFDclYsR0FBTTtBQUM1QixTQUFPLEtBQUssS0FBSyxXQUFXO0FBQzFCLElBQUFtVixHQUFVLE1BQU1uVixDQUFJO0FBQUEsRUFDeEIsQ0FBRztBQUNIO0FDSkEsU0FBU3NWLEdBQVlaLEdBQUkxVSxHQUFNO0FBQzdCLE1BQUl1VixHQUFRQztBQUNaLFNBQU8sV0FBVztBQUNoQixRQUFJZixJQUFXcFUsRUFBSSxNQUFNcVUsQ0FBRSxHQUN2Qk0sSUFBUVAsRUFBUztBQUtyQixRQUFJTyxNQUFVTyxHQUFRO0FBQ3BCLE1BQUFDLElBQVNELElBQVNQO0FBQ2xCLGVBQVN4VixJQUFJLEdBQUdDLElBQUkrVixFQUFPLFFBQVFoVyxJQUFJQyxHQUFHLEVBQUVEO0FBQzFDLFlBQUlnVyxFQUFPaFcsQ0FBQyxFQUFFLFNBQVNRLEdBQU07QUFDM0IsVUFBQXdWLElBQVNBLEVBQU8sU0FDaEJBLEVBQU8sT0FBT2hXLEdBQUcsQ0FBQztBQUNsQjtBQUFBLFFBQ0Q7QUFBQSxJQUVKO0FBRUQsSUFBQWlWLEVBQVMsUUFBUWU7QUFBQSxFQUNyQjtBQUNBO0FBRUEsU0FBU0MsR0FBY2YsR0FBSTFVLEdBQU0wRSxHQUFPO0FBQ3RDLE1BQUk2USxHQUFRQztBQUNaLE1BQUksT0FBTzlRLEtBQVU7QUFBWSxVQUFNLElBQUk7QUFDM0MsU0FBTyxXQUFXO0FBQ2hCLFFBQUkrUCxJQUFXcFUsRUFBSSxNQUFNcVUsQ0FBRSxHQUN2Qk0sSUFBUVAsRUFBUztBQUtyQixRQUFJTyxNQUFVTyxHQUFRO0FBQ3BCLE1BQUFDLEtBQVVELElBQVNQLEdBQU8sTUFBSztBQUMvQixlQUFTclYsSUFBSSxFQUFDLE1BQU1LLEdBQU0sT0FBTzBFLEVBQUssR0FBR2xGLElBQUksR0FBR0MsSUFBSStWLEVBQU8sUUFBUWhXLElBQUlDLEdBQUcsRUFBRUQ7QUFDMUUsWUFBSWdXLEVBQU9oVyxDQUFDLEVBQUUsU0FBU1EsR0FBTTtBQUMzQixVQUFBd1YsRUFBT2hXLENBQUMsSUFBSUc7QUFDWjtBQUFBLFFBQ0Q7QUFFSCxNQUFJSCxNQUFNQyxLQUFHK1YsRUFBTyxLQUFLN1YsQ0FBQztBQUFBLElBQzNCO0FBRUQsSUFBQThVLEVBQVMsUUFBUWU7QUFBQSxFQUNyQjtBQUNBO0FBRWUsU0FBQUUsR0FBUzFWLEdBQU0wRSxHQUFPO0FBQ25DLE1BQUlnUSxJQUFLLEtBQUs7QUFJZCxNQUZBMVUsS0FBUSxJQUVKLFVBQVUsU0FBUyxHQUFHO0FBRXhCLGFBRElnVixJQUFRNVUsRUFBSSxLQUFLLEtBQUksR0FBSXNVLENBQUUsRUFBRSxPQUN4QixJQUFJLEdBQUdqVixJQUFJdVYsRUFBTSxRQUFRclYsR0FBRyxJQUFJRixHQUFHLEVBQUU7QUFDNUMsV0FBS0UsSUFBSXFWLEVBQU0sQ0FBQyxHQUFHLFNBQVNoVjtBQUMxQixlQUFPTCxFQUFFO0FBR2IsV0FBTztBQUFBLEVBQ1I7QUFFRCxTQUFPLEtBQUssTUFBTStFLEtBQVMsT0FBTzRRLEtBQWNHLElBQWVmLEdBQUkxVSxHQUFNMEUsQ0FBSyxDQUFDO0FBQ2pGO0FBRU8sU0FBU2lSLEdBQVdDLEdBQVk1VixHQUFNMEUsR0FBTztBQUNsRCxNQUFJZ1EsSUFBS2tCLEVBQVc7QUFFcEIsU0FBQUEsRUFBVyxLQUFLLFdBQVc7QUFDekIsUUFBSW5CLElBQVdwVSxFQUFJLE1BQU1xVSxDQUFFO0FBQzNCLEtBQUNELEVBQVMsVUFBVUEsRUFBUyxRQUFRLENBQUUsSUFBR3pVLENBQUksSUFBSTBFLEVBQU0sTUFBTSxNQUFNLFNBQVM7QUFBQSxFQUNqRixDQUFHLEdBRU0sU0FBUzNDLEdBQU07QUFDcEIsV0FBTzNCLEVBQUkyQixHQUFNMlMsQ0FBRSxFQUFFLE1BQU0xVSxDQUFJO0FBQUEsRUFDbkM7QUFDQTtBQzdFZSxTQUFBNlYsR0FBU3BQLEdBQUdDLEdBQUc7QUFDNUIsTUFBSWhHO0FBQ0osVUFBUSxPQUFPZ0csS0FBTSxXQUFXc0osSUFDMUJ0SixhQUFhd0csSUFBUXlDLE1BQ3BCalAsSUFBSXdNLEVBQU14RyxDQUFDLE1BQU1BLElBQUloRyxHQUFHaVAsTUFDekJVLElBQW1CNUosR0FBR0MsQ0FBQztBQUMvQjtBQ0pBLFNBQVNVLEdBQVdwSCxHQUFNO0FBQ3hCLFNBQU8sV0FBVztBQUNoQixTQUFLLGdCQUFnQkEsQ0FBSTtBQUFBLEVBQzdCO0FBQ0E7QUFFQSxTQUFTcUgsR0FBYWxHLEdBQVU7QUFDOUIsU0FBTyxXQUFXO0FBQ2hCLFNBQUssa0JBQWtCQSxFQUFTLE9BQU9BLEVBQVMsS0FBSztBQUFBLEVBQ3pEO0FBQ0E7QUFFQSxTQUFTbUcsR0FBYXRILEdBQU02VixHQUFhQyxHQUFRO0FBQy9DLE1BQUlDLEdBQ0FDLElBQVVGLElBQVMsSUFDbkJHO0FBQ0osU0FBTyxXQUFXO0FBQ2hCLFFBQUlDLElBQVUsS0FBSyxhQUFhbFcsQ0FBSTtBQUNwQyxXQUFPa1csTUFBWUYsSUFBVSxPQUN2QkUsTUFBWUgsSUFBV0UsSUFDdkJBLElBQWVKLEVBQVlFLElBQVdHLEdBQVNKLENBQU07QUFBQSxFQUMvRDtBQUNBO0FBRUEsU0FBU3ZPLEdBQWVwRyxHQUFVMFUsR0FBYUMsR0FBUTtBQUNyRCxNQUFJQyxHQUNBQyxJQUFVRixJQUFTLElBQ25CRztBQUNKLFNBQU8sV0FBVztBQUNoQixRQUFJQyxJQUFVLEtBQUssZUFBZS9VLEVBQVMsT0FBT0EsRUFBUyxLQUFLO0FBQ2hFLFdBQU8rVSxNQUFZRixJQUFVLE9BQ3ZCRSxNQUFZSCxJQUFXRSxJQUN2QkEsSUFBZUosRUFBWUUsSUFBV0csR0FBU0osQ0FBTTtBQUFBLEVBQy9EO0FBQ0E7QUFFQSxTQUFTdE8sR0FBYXhILEdBQU02VixHQUFhblIsR0FBTztBQUM5QyxNQUFJcVIsR0FDQUksR0FDQUY7QUFDSixTQUFPLFdBQVc7QUFDaEIsUUFBSUMsR0FBU0osSUFBU3BSLEVBQU0sSUFBSSxHQUFHc1I7QUFDbkMsV0FBSUYsS0FBVSxPQUFhLEtBQUssS0FBSyxnQkFBZ0I5VixDQUFJLEtBQ3pEa1csSUFBVSxLQUFLLGFBQWFsVyxDQUFJLEdBQ2hDZ1csSUFBVUYsSUFBUyxJQUNaSSxNQUFZRixJQUFVLE9BQ3ZCRSxNQUFZSCxLQUFZQyxNQUFZRyxJQUFXRixLQUM5Q0UsSUFBV0gsR0FBU0MsSUFBZUosRUFBWUUsSUFBV0csR0FBU0osQ0FBTTtBQUFBLEVBQ3BGO0FBQ0E7QUFFQSxTQUFTcE8sR0FBZXZHLEdBQVUwVSxHQUFhblIsR0FBTztBQUNwRCxNQUFJcVIsR0FDQUksR0FDQUY7QUFDSixTQUFPLFdBQVc7QUFDaEIsUUFBSUMsR0FBU0osSUFBU3BSLEVBQU0sSUFBSSxHQUFHc1I7QUFDbkMsV0FBSUYsS0FBVSxPQUFhLEtBQUssS0FBSyxrQkFBa0IzVSxFQUFTLE9BQU9BLEVBQVMsS0FBSyxLQUNyRitVLElBQVUsS0FBSyxlQUFlL1UsRUFBUyxPQUFPQSxFQUFTLEtBQUssR0FDNUQ2VSxJQUFVRixJQUFTLElBQ1pJLE1BQVlGLElBQVUsT0FDdkJFLE1BQVlILEtBQVlDLE1BQVlHLElBQVdGLEtBQzlDRSxJQUFXSCxHQUFTQyxJQUFlSixFQUFZRSxJQUFXRyxHQUFTSixDQUFNO0FBQUEsRUFDcEY7QUFDQTtBQUVlLFNBQUFNLEdBQVNwVyxHQUFNMEUsR0FBTztBQUNuQyxNQUFJdkQsSUFBV04sR0FBVWIsQ0FBSSxHQUFHUixJQUFJMkIsTUFBYSxjQUFjb1EsS0FBdUJzRTtBQUN0RixTQUFPLEtBQUssVUFBVTdWLEdBQU0sT0FBTzBFLEtBQVUsY0FDdEN2RCxFQUFTLFFBQVF1RyxLQUFpQkYsSUFBY3JHLEdBQVUzQixHQUFHbVcsR0FBVyxNQUFNLFVBQVUzVixHQUFNMEUsQ0FBSyxDQUFDLElBQ3JHQSxLQUFTLFFBQVF2RCxFQUFTLFFBQVFrRyxLQUFlRCxJQUFZakcsQ0FBUSxLQUNwRUEsRUFBUyxRQUFRb0csS0FBaUJELElBQWNuRyxHQUFVM0IsR0FBR2tGLENBQUssQ0FBQztBQUM1RTtBQzNFQSxTQUFTMlIsR0FBZ0JyVyxHQUFNUixHQUFHO0FBQ2hDLFNBQU8sU0FBU0csR0FBRztBQUNqQixTQUFLLGFBQWFLLEdBQU1SLEVBQUUsS0FBSyxNQUFNRyxDQUFDLENBQUM7QUFBQSxFQUMzQztBQUNBO0FBRUEsU0FBUzJXLEdBQWtCblYsR0FBVTNCLEdBQUc7QUFDdEMsU0FBTyxTQUFTRyxHQUFHO0FBQ2pCLFNBQUssZUFBZXdCLEVBQVMsT0FBT0EsRUFBUyxPQUFPM0IsRUFBRSxLQUFLLE1BQU1HLENBQUMsQ0FBQztBQUFBLEVBQ3ZFO0FBQ0E7QUFFQSxTQUFTNFcsR0FBWXBWLEdBQVV1RCxHQUFPO0FBQ3BDLE1BQUlrUCxHQUFJM087QUFDUixXQUFTK1AsSUFBUTtBQUNmLFFBQUl4VixJQUFJa0YsRUFBTSxNQUFNLE1BQU0sU0FBUztBQUNuQyxXQUFJbEYsTUFBTXlGLE1BQUkyTyxLQUFNM08sSUFBS3pGLE1BQU04VyxHQUFrQm5WLEdBQVUzQixDQUFDLElBQ3JEb1U7QUFBQSxFQUNSO0FBQ0QsU0FBQW9CLEVBQU0sU0FBU3RRLEdBQ1JzUTtBQUNUO0FBRUEsU0FBU3dCLEdBQVV4VyxHQUFNMEUsR0FBTztBQUM5QixNQUFJa1AsR0FBSTNPO0FBQ1IsV0FBUytQLElBQVE7QUFDZixRQUFJeFYsSUFBSWtGLEVBQU0sTUFBTSxNQUFNLFNBQVM7QUFDbkMsV0FBSWxGLE1BQU15RixNQUFJMk8sS0FBTTNPLElBQUt6RixNQUFNNlcsR0FBZ0JyVyxHQUFNUixDQUFDLElBQy9Db1U7QUFBQSxFQUNSO0FBQ0QsU0FBQW9CLEVBQU0sU0FBU3RRLEdBQ1JzUTtBQUNUO0FBRWUsU0FBQXlCLEdBQVN6VyxHQUFNMEUsR0FBTztBQUNuQyxNQUFJTCxJQUFNLFVBQVVyRTtBQUNwQixNQUFJLFVBQVUsU0FBUztBQUFHLFlBQVFxRSxJQUFNLEtBQUssTUFBTUEsQ0FBRyxNQUFNQSxFQUFJO0FBQ2hFLE1BQUlLLEtBQVM7QUFBTSxXQUFPLEtBQUssTUFBTUwsR0FBSyxJQUFJO0FBQzlDLE1BQUksT0FBT0ssS0FBVTtBQUFZLFVBQU0sSUFBSTtBQUMzQyxNQUFJdkQsSUFBV04sR0FBVWIsQ0FBSTtBQUM3QixTQUFPLEtBQUssTUFBTXFFLElBQU1sRCxFQUFTLFFBQVFvVixLQUFjQyxJQUFXclYsR0FBVXVELENBQUssQ0FBQztBQUNwRjtBQ3pDQSxTQUFTZ1MsR0FBY2hDLEdBQUloUSxHQUFPO0FBQ2hDLFNBQU8sV0FBVztBQUNoQixJQUFBb1EsR0FBSyxNQUFNSixDQUFFLEVBQUUsUUFBUSxDQUFDaFEsRUFBTSxNQUFNLE1BQU0sU0FBUztBQUFBLEVBQ3ZEO0FBQ0E7QUFFQSxTQUFTaVMsR0FBY2pDLEdBQUloUSxHQUFPO0FBQ2hDLFNBQU9BLElBQVEsQ0FBQ0EsR0FBTyxXQUFXO0FBQ2hDLElBQUFvUSxHQUFLLE1BQU1KLENBQUUsRUFBRSxRQUFRaFE7QUFBQSxFQUMzQjtBQUNBO0FBRWUsU0FBUWtTLEdBQUNsUyxHQUFPO0FBQzdCLE1BQUlnUSxJQUFLLEtBQUs7QUFFZCxTQUFPLFVBQVUsU0FDWCxLQUFLLE1BQU0sT0FBT2hRLEtBQVUsYUFDeEJnUyxLQUNBQyxJQUFlakMsR0FBSWhRLENBQUssQ0FBQyxJQUM3QnRFLEVBQUksS0FBSyxLQUFNLEdBQUVzVSxDQUFFLEVBQUU7QUFDN0I7QUNwQkEsU0FBU21DLEdBQWlCbkMsR0FBSWhRLEdBQU87QUFDbkMsU0FBTyxXQUFXO0FBQ2hCckUsSUFBQUEsRUFBSSxNQUFNcVUsQ0FBRSxFQUFFLFdBQVcsQ0FBQ2hRLEVBQU0sTUFBTSxNQUFNLFNBQVM7QUFBQSxFQUN6RDtBQUNBO0FBRUEsU0FBU29TLEdBQWlCcEMsR0FBSWhRLEdBQU87QUFDbkMsU0FBT0EsSUFBUSxDQUFDQSxHQUFPLFdBQVc7QUFDaENyRSxJQUFBQSxFQUFJLE1BQU1xVSxDQUFFLEVBQUUsV0FBV2hRO0FBQUEsRUFDN0I7QUFDQTtBQUVlLFNBQVFxUyxHQUFDclMsR0FBTztBQUM3QixNQUFJZ1EsSUFBSyxLQUFLO0FBRWQsU0FBTyxVQUFVLFNBQ1gsS0FBSyxNQUFNLE9BQU9oUSxLQUFVLGFBQ3hCbVMsS0FDQUMsSUFBa0JwQyxHQUFJaFEsQ0FBSyxDQUFDLElBQ2hDdEUsRUFBSSxLQUFLLEtBQU0sR0FBRXNVLENBQUUsRUFBRTtBQUM3QjtBQ3BCQSxTQUFTc0MsR0FBYXRDLEdBQUloUSxHQUFPO0FBQy9CLE1BQUksT0FBT0EsS0FBVTtBQUFZLFVBQU0sSUFBSTtBQUMzQyxTQUFPLFdBQVc7QUFDaEJyRSxJQUFBQSxFQUFJLE1BQU1xVSxDQUFFLEVBQUUsT0FBT2hRO0FBQUEsRUFDekI7QUFDQTtBQUVlLFNBQVF1UyxHQUFDdlMsR0FBTztBQUM3QixNQUFJZ1EsSUFBSyxLQUFLO0FBRWQsU0FBTyxVQUFVLFNBQ1gsS0FBSyxLQUFLc0MsR0FBYXRDLEdBQUloUSxDQUFLLENBQUMsSUFDakN0RSxFQUFJLEtBQUssS0FBTSxHQUFFc1UsQ0FBRSxFQUFFO0FBQzdCO0FDYkEsU0FBU3dDLEdBQVl4QyxHQUFJaFEsR0FBTztBQUM5QixTQUFPLFdBQVc7QUFDaEIsUUFBSStDLElBQUkvQyxFQUFNLE1BQU0sTUFBTSxTQUFTO0FBQ25DLFFBQUksT0FBTytDLEtBQU07QUFBWSxZQUFNLElBQUk7QUFDdkNwSCxJQUFBQSxFQUFJLE1BQU1xVSxDQUFFLEVBQUUsT0FBT2pOO0FBQUEsRUFDekI7QUFDQTtBQUVlLFNBQVEwUCxHQUFDelMsR0FBTztBQUM3QixNQUFJLE9BQU9BLEtBQVU7QUFBWSxVQUFNLElBQUk7QUFDM0MsU0FBTyxLQUFLLEtBQUt3UyxHQUFZLEtBQUssS0FBS3hTLENBQUssQ0FBQztBQUMvQztBQ1ZlLFNBQVEwUyxHQUFDdlUsR0FBTztBQUM3QixFQUFJLE9BQU9BLEtBQVUsZUFBWUEsSUFBUUosR0FBUUksQ0FBSztBQUV0RCxXQUFTcEIsSUFBUyxLQUFLLFNBQVNDLElBQUlELEVBQU8sUUFBUUUsSUFBWSxJQUFJLE1BQU1ELENBQUMsR0FBR0UsSUFBSSxHQUFHQSxJQUFJRixHQUFHLEVBQUVFO0FBQzNGLGFBQVNDLElBQVFKLEVBQU9HLENBQUMsR0FBR25DLElBQUlvQyxFQUFNLFFBQVFDLElBQVdILEVBQVVDLENBQUMsSUFBSSxDQUFBLEdBQUlHLEdBQU12QyxJQUFJLEdBQUdBLElBQUlDLEdBQUcsRUFBRUQ7QUFDaEcsT0FBS3VDLElBQU9GLEVBQU1yQyxDQUFDLE1BQU1xRCxFQUFNLEtBQUtkLEdBQU1BLEVBQUssVUFBVXZDLEdBQUdxQyxDQUFLLEtBQy9EQyxFQUFTLEtBQUtDLENBQUk7QUFLeEIsU0FBTyxJQUFJc1YsRUFBVzFWLEdBQVcsS0FBSyxVQUFVLEtBQUssT0FBTyxLQUFLLEdBQUc7QUFDdEU7QUNiZSxTQUFRMlYsR0FBQzFCLEdBQVk7QUFDbEMsTUFBSUEsRUFBVyxRQUFRLEtBQUs7QUFBSyxVQUFNLElBQUk7QUFFM0MsV0FBU2hRLElBQVUsS0FBSyxTQUFTQyxJQUFVK1AsRUFBVyxTQUFTOVAsSUFBS0YsRUFBUSxRQUFRRyxJQUFLRixFQUFRLFFBQVFuRSxJQUFJLEtBQUssSUFBSW9FLEdBQUlDLENBQUUsR0FBR0MsSUFBUyxJQUFJLE1BQU1GLENBQUUsR0FBR2xFLElBQUksR0FBR0EsSUFBSUYsR0FBRyxFQUFFRTtBQUNySyxhQUFTcUUsSUFBU0wsRUFBUWhFLENBQUMsR0FBR3NFLElBQVNMLEVBQVFqRSxDQUFDLEdBQUduQyxJQUFJd0csRUFBTyxRQUFRRSxJQUFRSCxFQUFPcEUsQ0FBQyxJQUFJLElBQUksTUFBTW5DLENBQUMsR0FBR3NDLEdBQU12QyxJQUFJLEdBQUdBLElBQUlDLEdBQUcsRUFBRUQ7QUFDNUgsT0FBSXVDLElBQU9rRSxFQUFPekcsQ0FBQyxLQUFLMEcsRUFBTzFHLENBQUMsT0FDOUIyRyxFQUFNM0csQ0FBQyxJQUFJdUM7QUFLakIsU0FBT0gsSUFBSWtFLEdBQUksRUFBRWxFO0FBQ2YsSUFBQW9FLEVBQU9wRSxDQUFDLElBQUlnRSxFQUFRaEUsQ0FBQztBQUd2QixTQUFPLElBQUl5VixFQUFXclIsR0FBUSxLQUFLLFVBQVUsS0FBSyxPQUFPLEtBQUssR0FBRztBQUNuRTtBQ2hCQSxTQUFTNkosR0FBTTdQLEdBQU07QUFDbkIsVUFBUUEsSUFBTyxJQUFJLEtBQU0sRUFBQyxNQUFNLE9BQU8sRUFBRSxNQUFNLFNBQVNMLEdBQUc7QUFDekQsUUFBSUgsSUFBSUcsRUFBRSxRQUFRLEdBQUc7QUFDckIsV0FBSUgsS0FBSyxNQUFHRyxJQUFJQSxFQUFFLE1BQU0sR0FBR0gsQ0FBQyxJQUNyQixDQUFDRyxLQUFLQSxNQUFNO0FBQUEsRUFDdkIsQ0FBRztBQUNIO0FBRUEsU0FBUzRYLEdBQVc3QyxHQUFJMVUsR0FBTTZLLEdBQVU7QUFDdEMsTUFBSTJNLEdBQUtDLEdBQUtDLElBQU03SCxHQUFNN1AsQ0FBSSxJQUFJOFUsS0FBT3pVO0FBQ3pDLFNBQU8sV0FBVztBQUNoQixRQUFJb1UsSUFBV2lELEVBQUksTUFBTWhELENBQUUsR0FDdkIxSixJQUFLeUosRUFBUztBQUtsQixJQUFJekosTUFBT3dNLE1BQU1DLEtBQU9ELElBQU14TSxHQUFJLFFBQVEsR0FBR2hMLEdBQU02SyxDQUFRLEdBRTNENEosRUFBUyxLQUFLZ0Q7QUFBQSxFQUNsQjtBQUNBO0FBRWUsU0FBQUUsR0FBUzNYLEdBQU02SyxHQUFVO0FBQ3RDLE1BQUk2SixJQUFLLEtBQUs7QUFFZCxTQUFPLFVBQVUsU0FBUyxJQUNwQnRVLEVBQUksS0FBSyxLQUFNLEdBQUVzVSxDQUFFLEVBQUUsR0FBRyxHQUFHMVUsQ0FBSSxJQUMvQixLQUFLLEtBQUt1WCxHQUFXN0MsR0FBSTFVLEdBQU02SyxDQUFRLENBQUM7QUFDaEQ7QUMvQkEsU0FBUytNLEdBQWVsRCxHQUFJO0FBQzFCLFNBQU8sV0FBVztBQUNoQixRQUFJalIsSUFBUyxLQUFLO0FBQ2xCLGFBQVNqRSxLQUFLLEtBQUs7QUFBYyxVQUFJLENBQUNBLE1BQU1rVjtBQUFJO0FBQ2hELElBQUlqUixLQUFRQSxFQUFPLFlBQVksSUFBSTtBQUFBLEVBQ3ZDO0FBQ0E7QUFFZSxTQUFBb1UsS0FBVztBQUN4QixTQUFPLEtBQUssR0FBRyxjQUFjRCxHQUFlLEtBQUssR0FBRyxDQUFDO0FBQ3ZEO0FDTmUsU0FBUUUsR0FBQ3RXLEdBQVE7QUFDOUIsTUFBSXhCLElBQU8sS0FBSyxPQUNaMFUsSUFBSyxLQUFLO0FBRWQsRUFBSSxPQUFPbFQsS0FBVyxlQUFZQSxJQUFTRixHQUFTRSxDQUFNO0FBRTFELFdBQVNDLElBQVMsS0FBSyxTQUFTQyxJQUFJRCxFQUFPLFFBQVFFLElBQVksSUFBSSxNQUFNRCxDQUFDLEdBQUdFLElBQUksR0FBR0EsSUFBSUYsR0FBRyxFQUFFRTtBQUMzRixhQUFTQyxJQUFRSixFQUFPRyxDQUFDLEdBQUduQyxJQUFJb0MsRUFBTSxRQUFRQyxJQUFXSCxFQUFVQyxDQUFDLElBQUksSUFBSSxNQUFNbkMsQ0FBQyxHQUFHc0MsR0FBTUMsR0FBU3hDLElBQUksR0FBR0EsSUFBSUMsR0FBRyxFQUFFRDtBQUNuSCxPQUFLdUMsSUFBT0YsRUFBTXJDLENBQUMsT0FBT3dDLElBQVVSLEVBQU8sS0FBS08sR0FBTUEsRUFBSyxVQUFVdkMsR0FBR3FDLENBQUssT0FDdkUsY0FBY0UsTUFBTUMsRUFBUSxXQUFXRCxFQUFLLFdBQ2hERCxFQUFTdEMsQ0FBQyxJQUFJd0MsR0FDZHlTLEdBQVMzUyxFQUFTdEMsQ0FBQyxHQUFHUSxHQUFNMFUsR0FBSWxWLEdBQUdzQyxHQUFVMUIsRUFBSTJCLEdBQU0yUyxDQUFFLENBQUM7QUFLaEUsU0FBTyxJQUFJMkMsRUFBVzFWLEdBQVcsS0FBSyxVQUFVM0IsR0FBTTBVLENBQUU7QUFDMUQ7QUNqQmUsU0FBUXFELEdBQUN2VyxHQUFRO0FBQzlCLE1BQUl4QixJQUFPLEtBQUssT0FDWjBVLElBQUssS0FBSztBQUVkLEVBQUksT0FBT2xULEtBQVcsZUFBWUEsSUFBU2EsR0FBWWIsQ0FBTTtBQUU3RCxXQUFTQyxJQUFTLEtBQUssU0FBU0MsSUFBSUQsRUFBTyxRQUFRRSxJQUFZLENBQUUsR0FBRWEsSUFBVSxDQUFFLEdBQUVaLElBQUksR0FBR0EsSUFBSUYsR0FBRyxFQUFFRTtBQUMvRixhQUFTQyxJQUFRSixFQUFPRyxDQUFDLEdBQUduQyxJQUFJb0MsRUFBTSxRQUFRRSxHQUFNdkMsSUFBSSxHQUFHQSxJQUFJQyxHQUFHLEVBQUVEO0FBQ2xFLFVBQUl1QyxJQUFPRixFQUFNckMsQ0FBQyxHQUFHO0FBQ25CLGlCQUFTeUQsSUFBV3pCLEVBQU8sS0FBS08sR0FBTUEsRUFBSyxVQUFVdkMsR0FBR3FDLENBQUssR0FBRzhCLEdBQU9xVSxJQUFVNVgsRUFBSTJCLEdBQU0yUyxDQUFFLEdBQUd0RyxJQUFJLEdBQUdWLElBQUl6SyxFQUFTLFFBQVFtTCxJQUFJVixHQUFHLEVBQUVVO0FBQ25JLFdBQUl6SyxJQUFRVixFQUFTbUwsQ0FBQyxNQUNwQnFHLEdBQVM5USxHQUFPM0QsR0FBTTBVLEdBQUl0RyxHQUFHbkwsR0FBVStVLENBQU87QUFHbEQsUUFBQXJXLEVBQVUsS0FBS3NCLENBQVEsR0FDdkJULEVBQVEsS0FBS1QsQ0FBSTtBQUFBLE1BQ2xCO0FBSUwsU0FBTyxJQUFJc1YsRUFBVzFWLEdBQVdhLEdBQVN4QyxHQUFNMFUsQ0FBRTtBQUNwRDtBQ3ZCQSxJQUFJelMsS0FBWTBELEVBQVUsVUFBVTtBQUVyQixTQUFBc1MsS0FBVztBQUN4QixTQUFPLElBQUloVyxHQUFVLEtBQUssU0FBUyxLQUFLLFFBQVE7QUFDbEQ7QUNBQSxTQUFTaVcsR0FBVWxZLEdBQU02VixHQUFhO0FBQ3BDLE1BQUlFLEdBQ0FJLEdBQ0FGO0FBQ0osU0FBTyxXQUFXO0FBQ2hCLFFBQUlDLElBQVVpQyxFQUFNLE1BQU1uWSxDQUFJLEdBQzFCZ1csS0FBVyxLQUFLLE1BQU0sZUFBZWhXLENBQUksR0FBR21ZLEVBQU0sTUFBTW5ZLENBQUk7QUFDaEUsV0FBT2tXLE1BQVlGLElBQVUsT0FDdkJFLE1BQVlILEtBQVlDLE1BQVlHLElBQVdGLElBQy9DQSxJQUFlSixFQUFZRSxJQUFXRyxHQUFTQyxJQUFXSCxDQUFPO0FBQUEsRUFDM0U7QUFDQTtBQUVBLFNBQVNuTyxHQUFZN0gsR0FBTTtBQUN6QixTQUFPLFdBQVc7QUFDaEIsU0FBSyxNQUFNLGVBQWVBLENBQUk7QUFBQSxFQUNsQztBQUNBO0FBRUEsU0FBUzhILEdBQWM5SCxHQUFNNlYsR0FBYUMsR0FBUTtBQUNoRCxNQUFJQyxHQUNBQyxJQUFVRixJQUFTLElBQ25CRztBQUNKLFNBQU8sV0FBVztBQUNoQixRQUFJQyxJQUFVaUMsRUFBTSxNQUFNblksQ0FBSTtBQUM5QixXQUFPa1csTUFBWUYsSUFBVSxPQUN2QkUsTUFBWUgsSUFBV0UsSUFDdkJBLElBQWVKLEVBQVlFLElBQVdHLEdBQVNKLENBQU07QUFBQSxFQUMvRDtBQUNBO0FBRUEsU0FBUzlOLEdBQWNoSSxHQUFNNlYsR0FBYW5SLEdBQU87QUFDL0MsTUFBSXFSLEdBQ0FJLEdBQ0FGO0FBQ0osU0FBTyxXQUFXO0FBQ2hCLFFBQUlDLElBQVVpQyxFQUFNLE1BQU1uWSxDQUFJLEdBQzFCOFYsSUFBU3BSLEVBQU0sSUFBSSxHQUNuQnNSLElBQVVGLElBQVM7QUFDdkIsV0FBSUEsS0FBVSxTQUFNRSxJQUFVRixLQUFVLEtBQUssTUFBTSxlQUFlOVYsQ0FBSSxHQUFHbVksRUFBTSxNQUFNblksQ0FBSSxLQUNsRmtXLE1BQVlGLElBQVUsT0FDdkJFLE1BQVlILEtBQVlDLE1BQVlHLElBQVdGLEtBQzlDRSxJQUFXSCxHQUFTQyxJQUFlSixFQUFZRSxJQUFXRyxHQUFTSixDQUFNO0FBQUEsRUFDcEY7QUFDQTtBQUVBLFNBQVNzQyxHQUFpQjFELEdBQUkxVSxHQUFNO0FBQ2xDLE1BQUl3WCxHQUFLQyxHQUFLWSxHQUFXaFUsSUFBTSxXQUFXckUsR0FBTThLLElBQVEsU0FBU3pHLEdBQUsrRjtBQUN0RSxTQUFPLFdBQVc7QUFDaEIsUUFBSXFLLElBQVdwVSxFQUFJLE1BQU1xVSxDQUFFLEdBQ3ZCMUosSUFBS3lKLEVBQVMsSUFDZDVKLElBQVc0SixFQUFTLE1BQU1wUSxDQUFHLEtBQUssT0FBTytGLE1BQVdBLElBQVN2QyxHQUFZN0gsQ0FBSSxLQUFLO0FBS3RGLEtBQUlnTCxNQUFPd00sS0FBT2EsTUFBY3hOLE9BQVc0TSxLQUFPRCxJQUFNeE0sR0FBSSxLQUFNLEdBQUUsR0FBR0YsR0FBT3VOLElBQVl4TixDQUFRLEdBRWxHNEosRUFBUyxLQUFLZ0Q7QUFBQSxFQUNsQjtBQUNBO0FBRWUsU0FBQWEsR0FBU3RZLEdBQU0wRSxHQUFPcUQsR0FBVTtBQUM3QyxNQUFJdkksS0FBS1EsS0FBUSxPQUFRLGNBQWN1UixLQUF1QnNFO0FBQzlELFNBQU9uUixLQUFTLE9BQU8sS0FDbEIsV0FBVzFFLEdBQU1rWSxHQUFVbFksR0FBTVIsQ0FBQyxDQUFDLEVBQ25DLEdBQUcsZUFBZVEsR0FBTTZILEdBQVk3SCxDQUFJLENBQUMsSUFDMUMsT0FBTzBFLEtBQVUsYUFBYSxLQUM3QixXQUFXMUUsR0FBTWdJLEdBQWNoSSxHQUFNUixHQUFHbVcsR0FBVyxNQUFNLFdBQVczVixHQUFNMEUsQ0FBSyxDQUFDLENBQUMsRUFDakYsS0FBSzBULEdBQWlCLEtBQUssS0FBS3BZLENBQUksQ0FBQyxJQUN0QyxLQUNDLFdBQVdBLEdBQU04SCxHQUFjOUgsR0FBTVIsR0FBR2tGLENBQUssR0FBR3FELENBQVEsRUFDeEQsR0FBRyxlQUFlL0gsR0FBTSxJQUFJO0FBQ25DO0FDL0VBLFNBQVN1WSxHQUFpQnZZLEdBQU1SLEdBQUd1SSxHQUFVO0FBQzNDLFNBQU8sU0FBU3BJLEdBQUc7QUFDakIsU0FBSyxNQUFNLFlBQVlLLEdBQU1SLEVBQUUsS0FBSyxNQUFNRyxDQUFDLEdBQUdvSSxDQUFRO0FBQUEsRUFDMUQ7QUFDQTtBQUVBLFNBQVN5USxHQUFXeFksR0FBTTBFLEdBQU9xRCxHQUFVO0FBQ3pDLE1BQUlwSSxHQUFHc0Y7QUFDUCxXQUFTK1AsSUFBUTtBQUNmLFFBQUl4VixJQUFJa0YsRUFBTSxNQUFNLE1BQU0sU0FBUztBQUNuQyxXQUFJbEYsTUFBTXlGLE1BQUl0RixLQUFLc0YsSUFBS3pGLE1BQU0rWSxHQUFpQnZZLEdBQU1SLEdBQUd1SSxDQUFRLElBQ3pEcEk7QUFBQSxFQUNSO0FBQ0QsU0FBQXFWLEVBQU0sU0FBU3RRLEdBQ1JzUTtBQUNUO0FBRWUsU0FBQXlELEdBQVN6WSxHQUFNMEUsR0FBT3FELEdBQVU7QUFDN0MsTUFBSTFELElBQU0sWUFBWXJFLEtBQVE7QUFDOUIsTUFBSSxVQUFVLFNBQVM7QUFBRyxZQUFRcUUsSUFBTSxLQUFLLE1BQU1BLENBQUcsTUFBTUEsRUFBSTtBQUNoRSxNQUFJSyxLQUFTO0FBQU0sV0FBTyxLQUFLLE1BQU1MLEdBQUssSUFBSTtBQUM5QyxNQUFJLE9BQU9LLEtBQVU7QUFBWSxVQUFNLElBQUk7QUFDM0MsU0FBTyxLQUFLLE1BQU1MLEdBQUttVSxHQUFXeFksR0FBTTBFLEdBQU9xRCxLQUFtQixFQUFhLENBQUM7QUFDbEY7QUNyQkEsU0FBU3FCLEdBQWExRSxHQUFPO0FBQzNCLFNBQU8sV0FBVztBQUNoQixTQUFLLGNBQWNBO0FBQUEsRUFDdkI7QUFDQTtBQUVBLFNBQVMyRSxHQUFhM0UsR0FBTztBQUMzQixTQUFPLFdBQVc7QUFDaEIsUUFBSW9SLElBQVNwUixFQUFNLElBQUk7QUFDdkIsU0FBSyxjQUFjb1IsS0FBaUI7QUFBQSxFQUN4QztBQUNBO0FBRWUsU0FBUTRDLEdBQUNoVSxHQUFPO0FBQzdCLFNBQU8sS0FBSyxNQUFNLFFBQVEsT0FBT0EsS0FBVSxhQUNyQzJFLEdBQWFzTSxHQUFXLE1BQU0sUUFBUWpSLENBQUssQ0FBQyxJQUM1QzBFLEdBQWExRSxLQUFTLE9BQU8sS0FBS0EsSUFBUSxFQUFFLENBQUM7QUFDckQ7QUNuQkEsU0FBU2lVLEdBQWdCblosR0FBRztBQUMxQixTQUFPLFNBQVNHLEdBQUc7QUFDakIsU0FBSyxjQUFjSCxFQUFFLEtBQUssTUFBTUcsQ0FBQztBQUFBLEVBQ3JDO0FBQ0E7QUFFQSxTQUFTaVosR0FBVWxVLEdBQU87QUFDeEIsTUFBSWtQLEdBQUkzTztBQUNSLFdBQVMrUCxJQUFRO0FBQ2YsUUFBSSxJQUFJdFEsRUFBTSxNQUFNLE1BQU0sU0FBUztBQUNuQyxXQUFJLE1BQU1PLE1BQUkyTyxLQUFNM08sSUFBSyxNQUFNMFQsR0FBZ0IsQ0FBQyxJQUN6Qy9FO0FBQUEsRUFDUjtBQUNELFNBQUFvQixFQUFNLFNBQVN0USxHQUNSc1E7QUFDVDtBQUVlLFNBQVE2RCxHQUFDblUsR0FBTztBQUM3QixNQUFJTCxJQUFNO0FBQ1YsTUFBSSxVQUFVLFNBQVM7QUFBRyxZQUFRQSxJQUFNLEtBQUssTUFBTUEsQ0FBRyxNQUFNQSxFQUFJO0FBQ2hFLE1BQUlLLEtBQVM7QUFBTSxXQUFPLEtBQUssTUFBTUwsR0FBSyxJQUFJO0FBQzlDLE1BQUksT0FBT0ssS0FBVTtBQUFZLFVBQU0sSUFBSTtBQUMzQyxTQUFPLEtBQUssTUFBTUwsR0FBS3VVLEdBQVVsVSxDQUFLLENBQUM7QUFDekM7QUNwQmUsU0FBQW9VLEtBQVc7QUFLeEIsV0FKSTlZLElBQU8sS0FBSyxPQUNaK1ksSUFBTSxLQUFLLEtBQ1hDLElBQU1DLEdBQUssR0FFTnhYLElBQVMsS0FBSyxTQUFTQyxJQUFJRCxFQUFPLFFBQVFHLElBQUksR0FBR0EsSUFBSUYsR0FBRyxFQUFFRTtBQUNqRSxhQUFTQyxJQUFRSixFQUFPRyxDQUFDLEdBQUduQyxJQUFJb0MsRUFBTSxRQUFRRSxHQUFNdkMsSUFBSSxHQUFHQSxJQUFJQyxHQUFHLEVBQUVEO0FBQ2xFLFVBQUl1QyxJQUFPRixFQUFNckMsQ0FBQyxHQUFHO0FBQ25CLFlBQUl3WSxJQUFVNVgsRUFBSTJCLEdBQU1nWCxDQUFHO0FBQzNCLFFBQUF0RSxHQUFTMVMsR0FBTS9CLEdBQU1nWixHQUFLeFosR0FBR3FDLEdBQU87QUFBQSxVQUNsQyxNQUFNbVcsRUFBUSxPQUFPQSxFQUFRLFFBQVFBLEVBQVE7QUFBQSxVQUM3QyxPQUFPO0FBQUEsVUFDUCxVQUFVQSxFQUFRO0FBQUEsVUFDbEIsTUFBTUEsRUFBUTtBQUFBLFFBQ3hCLENBQVM7QUFBQSxNQUNGO0FBSUwsU0FBTyxJQUFJWCxFQUFXNVYsR0FBUSxLQUFLLFVBQVV6QixHQUFNZ1osQ0FBRztBQUN4RDtBQ3JCZSxTQUFBRSxLQUFXO0FBQ3hCLE1BQUkxQixHQUFLQyxHQUFLalgsSUFBTyxNQUFNa1UsSUFBS2xVLEVBQUssS0FBS3lHLElBQU96RyxFQUFLLEtBQUk7QUFDMUQsU0FBTyxJQUFJLFFBQVEsU0FBUzJZLEdBQVNDLEdBQVE7QUFDM0MsUUFBSUMsSUFBUyxFQUFDLE9BQU9ELEVBQU0sR0FDdkJ0SixJQUFNLEVBQUMsT0FBTyxXQUFXO0FBQUUsTUFBSSxFQUFFN0ksTUFBUyxLQUFHa1M7SUFBVSxFQUFFO0FBRTdELElBQUEzWSxFQUFLLEtBQUssV0FBVztBQUNuQixVQUFJaVUsSUFBV3BVLEVBQUksTUFBTXFVLENBQUUsR0FDdkIxSixJQUFLeUosRUFBUztBQUtsQixNQUFJekosTUFBT3dNLE1BQ1RDLEtBQU9ELElBQU14TSxHQUFJLEtBQUksR0FDckJ5TSxFQUFJLEVBQUUsT0FBTyxLQUFLNEIsQ0FBTSxHQUN4QjVCLEVBQUksRUFBRSxVQUFVLEtBQUs0QixDQUFNLEdBQzNCNUIsRUFBSSxFQUFFLElBQUksS0FBSzNILENBQUcsSUFHcEIyRSxFQUFTLEtBQUtnRDtBQUFBLElBQ3BCLENBQUssR0FHR3hRLE1BQVMsS0FBR2tTO0VBQ3BCLENBQUc7QUFDSDtBQ05BLElBQUl6RSxLQUFLO0FBRUYsU0FBUzJDLEVBQVc1VixHQUFRZSxHQUFTeEMsR0FBTTBVLEdBQUk7QUFDcEQsT0FBSyxVQUFValQsR0FDZixLQUFLLFdBQVdlLEdBQ2hCLEtBQUssUUFBUXhDLEdBQ2IsS0FBSyxNQUFNMFU7QUFDYjtBQU1PLFNBQVN1RSxLQUFRO0FBQ3RCLFNBQU8sRUFBRXZFO0FBQ1g7QUFFQSxJQUFJNEUsSUFBc0IzVCxFQUFVO0FBRXBDMFIsRUFBVyxZQUFtQztBQUFBLEVBQzVDLGFBQWFBO0FBQUEsRUFDYixRQUFRUztBQUFBLEVBQ1IsV0FBV0M7QUFBQSxFQUNYLGFBQWF1QixFQUFvQjtBQUFBLEVBQ2pDLGdCQUFnQkEsRUFBb0I7QUFBQSxFQUNwQyxRQUFRbEM7QUFBQSxFQUNSLE9BQU9FO0FBQUEsRUFDUCxXQUFXVztBQUFBLEVBQ1gsWUFBWWE7QUFBQSxFQUNaLE1BQU1RLEVBQW9CO0FBQUEsRUFDMUIsT0FBT0EsRUFBb0I7QUFBQSxFQUMzQixNQUFNQSxFQUFvQjtBQUFBLEVBQzFCLE1BQU1BLEVBQW9CO0FBQUEsRUFDMUIsT0FBT0EsRUFBb0I7QUFBQSxFQUMzQixNQUFNQSxFQUFvQjtBQUFBLEVBQzFCLElBQUkzQjtBQUFBLEVBQ0osTUFBTXZCO0FBQUEsRUFDTixXQUFXSztBQUFBLEVBQ1gsT0FBTzZCO0FBQUEsRUFDUCxZQUFZRztBQUFBLEVBQ1osTUFBTUM7QUFBQSxFQUNOLFdBQVdHO0FBQUEsRUFDWCxRQUFRaEI7QUFBQSxFQUNSLE9BQU9uQztBQUFBLEVBQ1AsT0FBT2tCO0FBQUEsRUFDUCxVQUFVRztBQUFBLEVBQ1YsTUFBTUU7QUFBQSxFQUNOLGFBQWFFO0FBQUEsRUFDYixLQUFLK0I7QUFBQSxFQUNMLENBQUMsT0FBTyxRQUFRLEdBQUdJLEVBQW9CLE9BQU8sUUFBUTtBQUN4RDtBQ3hFTyxNQUFNakssS0FBUyxPQUFLLENBQUM7QUNRckIsU0FBU2tLLEdBQVcsR0FBRztBQUM1QixXQUFTLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSztBQUM5RDtBQ0xBLElBQUlDLEtBQWdCO0FBQUEsRUFDbEIsTUFBTTtBQUFBO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixNQUFNQztBQUNSO0FBRUEsU0FBU3pCLEdBQVFqVyxHQUFNMlMsR0FBSTtBQUV6QixXQURJRSxHQUNHLEVBQUVBLElBQVM3UyxFQUFLLGlCQUFpQixFQUFFNlMsSUFBU0EsRUFBT0YsQ0FBRTtBQUMxRCxRQUFJLEVBQUUzUyxJQUFPQSxFQUFLO0FBQ2hCLFlBQU0sSUFBSSxNQUFNLGNBQWMyUyxhQUFjO0FBR2hELFNBQU9FO0FBQ1Q7QUFFZSxTQUFROEUsR0FBQzFaLEdBQU07QUFDNUIsTUFBSTBVLEdBQ0FFO0FBRUosRUFBSTVVLGFBQWdCcVgsS0FDbEIzQyxJQUFLMVUsRUFBSyxLQUFLQSxJQUFPQSxFQUFLLFVBRTNCMFUsSUFBS3VFLEdBQU8sSUFBR3JFLElBQVM0RSxJQUFlLE9BQU92RyxNQUFPalQsSUFBT0EsS0FBUSxPQUFPLE9BQU9BLElBQU87QUFHM0YsV0FBU3lCLElBQVMsS0FBSyxTQUFTQyxJQUFJRCxFQUFPLFFBQVFHLElBQUksR0FBR0EsSUFBSUYsR0FBRyxFQUFFRTtBQUNqRSxhQUFTQyxJQUFRSixFQUFPRyxDQUFDLEdBQUduQyxJQUFJb0MsRUFBTSxRQUFRRSxHQUFNdkMsSUFBSSxHQUFHQSxJQUFJQyxHQUFHLEVBQUVEO0FBQ2xFLE9BQUl1QyxJQUFPRixFQUFNckMsQ0FBQyxNQUNoQmlWLEdBQVMxUyxHQUFNL0IsR0FBTTBVLEdBQUlsVixHQUFHcUMsR0FBTytTLEtBQVVvRCxHQUFRalcsR0FBTTJTLENBQUUsQ0FBQztBQUtwRSxTQUFPLElBQUkyQyxFQUFXNVYsR0FBUSxLQUFLLFVBQVV6QixHQUFNMFUsQ0FBRTtBQUN2RDtBQ3JDQS9PLEVBQVUsVUFBVSxZQUFZMFA7QUFDaEMxUCxFQUFVLFVBQVUsYUFBYStUO0FDTDFCLFNBQVNDLEVBQVV2TCxHQUFHak0sR0FBR3FOLEdBQUc7QUFDakMsT0FBSyxJQUFJcEIsR0FDVCxLQUFLLElBQUlqTSxHQUNULEtBQUssSUFBSXFOO0FBQ1g7QUFFQW1LLEVBQVUsWUFBWTtBQUFBLEVBQ3BCLGFBQWFBO0FBQUEsRUFDYixPQUFPLFNBQVN2TCxHQUFHO0FBQ2pCLFdBQU9BLE1BQU0sSUFBSSxPQUFPLElBQUl1TCxFQUFVLEtBQUssSUFBSXZMLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ2pFO0FBQUEsRUFDRCxXQUFXLFNBQVNqTSxHQUFHcU4sR0FBRztBQUN4QixXQUFPck4sTUFBTSxJQUFJcU4sTUFBTSxJQUFJLE9BQU8sSUFBSW1LLEVBQVUsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLElBQUl4WCxHQUFHLEtBQUssSUFBSSxLQUFLLElBQUlxTixDQUFDO0FBQUEsRUFDakc7QUFBQSxFQUNELE9BQU8sU0FBU29LLEdBQU87QUFDckIsV0FBTyxDQUFDQSxFQUFNLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHQSxFQUFNLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDL0Q7QUFBQSxFQUNELFFBQVEsU0FBU3pYLEdBQUc7QUFDbEIsV0FBT0EsSUFBSSxLQUFLLElBQUksS0FBSztBQUFBLEVBQzFCO0FBQUEsRUFDRCxRQUFRLFNBQVNxTixHQUFHO0FBQ2xCLFdBQU9BLElBQUksS0FBSyxJQUFJLEtBQUs7QUFBQSxFQUMxQjtBQUFBLEVBQ0QsUUFBUSxTQUFTcUssR0FBVTtBQUN6QixXQUFPLEVBQUVBLEVBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUlBLEVBQVMsQ0FBQyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUM7QUFBQSxFQUN6RTtBQUFBLEVBQ0QsU0FBUyxTQUFTMVgsR0FBRztBQUNuQixZQUFRQSxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQUEsRUFDNUI7QUFBQSxFQUNELFNBQVMsU0FBU3FOLEdBQUc7QUFDbkIsWUFBUUEsSUFBSSxLQUFLLEtBQUssS0FBSztBQUFBLEVBQzVCO0FBQUEsRUFDRCxVQUFVLFNBQVNyTixHQUFHO0FBQ3BCLFdBQU9BLEVBQUUsS0FBTSxFQUFDLE9BQU9BLEVBQUUsTUFBSyxFQUFHLElBQUksS0FBSyxTQUFTLElBQUksRUFBRSxJQUFJQSxFQUFFLFFBQVFBLENBQUMsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFDRCxVQUFVLFNBQVNxTixHQUFHO0FBQ3BCLFdBQU9BLEVBQUUsS0FBTSxFQUFDLE9BQU9BLEVBQUUsTUFBSyxFQUFHLElBQUksS0FBSyxTQUFTLElBQUksRUFBRSxJQUFJQSxFQUFFLFFBQVFBLENBQUMsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFDRCxVQUFVLFdBQVc7QUFDbkIsV0FBTyxlQUFlLEtBQUssSUFBSSxNQUFNLEtBQUssSUFBSSxhQUFhLEtBQUssSUFBSTtBQUFBLEVBQ3JFO0FBQ0g7QUFJc0JtSyxFQUFVO0FDM0NuQixNQUFBRyxJQUFnQixDQUMzQnhZLEdBQ0FmLE1BQ007QUFDQSxRQUFBd1osSUFBTSxTQUFTLGNBQWN6WSxDQUFRO0FBQzNDLE1BQUl5WSxNQUFRO0FBQ0osVUFBQSxJQUFJLE1BQU0sMEJBQTBCelksQ0FBUTtBQUVwRCxNQUFJZixNQUFTLFVBQWEsRUFBRXdaLGFBQWV4WjtBQUN6QyxVQUFNLElBQUksTUFBTSxZQUFZZSxpQkFBd0JmLEdBQU07QUFFckQsU0FBQXdaO0FBQ1QsR0NYYUMsS0FBUSxDQUFDLE1BQWU7QUFDN0IsUUFBQUMsSUFBYUgsRUFBYywyQkFBMkIsV0FBVztBQUN2RSxJQUFFLGFBQWFHLEdBQVksSUFBSSxJQUFJLEVBQUUsR0FDckMsRUFBRSxhQUFhQSxHQUFZLElBQUksSUFBSSxFQUFFLEdBQ3JDLEVBQUUsYUFBYUEsR0FBWSxJQUFJLElBQUksRUFBRSxHQUNyQyxFQUFFLGFBQWFBLEdBQVksSUFBSSxJQUFJLENBQUM7QUFDOUIsUUFBQUMsSUFBYUosRUFBYywyQkFBMkIsV0FBVztBQUN2RSxJQUFFLGFBQWFJLEdBQVksSUFBSSxJQUFJLEVBQUUsR0FDckMsRUFBRSxhQUFhQSxHQUFZLElBQUksSUFBSSxFQUFFLEdBQ3JDLEVBQUUsYUFBYUEsR0FBWSxJQUFJLElBQUksRUFBRSxHQUNyQyxFQUFFLGFBQWFBLEdBQVksSUFBSSxJQUFJLENBQUM7QUFDOUIsUUFBQUMsSUFBY0wsRUFBYyw0QkFBNEIsV0FBVztBQUN6RSxJQUFFLGFBQWFLLEdBQWEsSUFBSSxJQUFJLENBQUM7QUFDdkMsR0NiYUMsS0FBVSxDQUFDLE1BQWU7QUFDL0IsUUFBQUgsSUFBYUgsRUFBYyx3QkFBd0IsV0FBVztBQUNwRSxJQUFFLGFBQWFHLEdBQVksS0FBSyxJQUFJLEVBQUUsR0FDdEMsRUFBRSxhQUFhQSxHQUFZLEtBQUssSUFBSSxFQUFFLEdBQ3RDLEVBQUUsYUFBYUEsR0FBWSxLQUFLLElBQUksRUFBRSxHQUN0QyxFQUFFLGFBQWFBLEdBQVksS0FBSyxJQUFJLEVBQUUsR0FDdEMsRUFBRSxhQUFhQSxHQUFZLEtBQUssSUFBSSxDQUFDO0FBQ3ZDLEdDUGFJLEtBQU8sQ0FBQyxNQUFlO0FBQzVCLFFBQUFDLElBQUtSLEVBQWMsd0JBQXdCLFdBQVc7QUFDMUQsSUFBQTtBQUFBLElBQ0FRO0FBQUEsSUFDQTtBQUFBLElBQ0EsRUFBRSxRQUFRLGtCQUFrQjtBQUFBLElBQzVCLEVBQUUsUUFBUSxpQkFBaUI7QUFBQSxJQUMzQjtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsT0FBTyxFQUFFLFNBQVM7QUFBQSxJQUNwQjtBQUFBLEVBQUE7QUFFSSxRQUFBQyxJQUFLVCxFQUFjLHdCQUF3QixXQUFXO0FBQzFELElBQUE7QUFBQSxJQUNBUztBQUFBLElBQ0E7QUFBQSxJQUNBLEVBQUUsUUFBUSxrQkFBa0I7QUFBQSxJQUM1QixFQUFFLFFBQVEsc0JBQXNCO0FBQUEsSUFDaEM7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLE9BQU8sRUFBRSxTQUFTO0FBQUEsSUFDcEI7QUFBQSxFQUFBO0FBRUksUUFBQUMsSUFBS1YsRUFBYyx3QkFBd0IsV0FBVztBQUMxRCxJQUFBO0FBQUEsSUFDQVU7QUFBQSxJQUNBO0FBQUEsSUFDQSxFQUFFLFFBQVEsa0JBQWtCO0FBQUEsSUFDNUIsRUFBRSxRQUFRLGtCQUFrQjtBQUFBLElBQzVCO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixPQUFPLEVBQUUsU0FBUztBQUFBLElBQ3BCO0FBQUEsRUFBQTtBQUVJLFFBQUFDLElBQUtYLEVBQWMsd0JBQXdCLFdBQVc7QUFDMUQsSUFBQTtBQUFBLElBQ0FXO0FBQUEsSUFDQTtBQUFBLElBQ0EsRUFBRSxRQUFRLGtCQUFrQjtBQUFBLElBQzVCLEVBQUUsUUFBUSxpQkFBaUI7QUFBQSxJQUMzQjtBQUFBLE1BQ0UsVUFBVTtBQUFBLE1BQ1YsT0FBTyxFQUFFLFNBQVM7QUFBQSxJQUNwQjtBQUFBLEVBQUE7QUFFSSxRQUFBQyxJQUFLWixFQUFjLHdCQUF3QixXQUFXO0FBQzFELElBQUE7QUFBQSxJQUNBWTtBQUFBLElBQ0E7QUFBQSxJQUNBLEVBQUUsUUFBUSxrQkFBa0I7QUFBQSxJQUM1QixFQUFFLFFBQVEsaUJBQWlCO0FBQUEsSUFDM0I7QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLE9BQU8sRUFBRSxTQUFTO0FBQUEsSUFDcEI7QUFBQSxFQUFBO0FBRUksUUFBQUMsSUFBS2IsRUFBYyx3QkFBd0IsV0FBVztBQUMxRCxJQUFBO0FBQUEsSUFDQWE7QUFBQSxJQUNBO0FBQUEsSUFDQSxFQUFFLFFBQVEsa0JBQWtCO0FBQUEsSUFDNUIsRUFBRSxRQUFRLGtCQUFrQjtBQUFBLElBQzVCO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixPQUFPLEVBQUUsU0FBUztBQUFBLElBQ3BCO0FBQUEsRUFBQTtBQUVKLEdDbkVhQyxLQUFRLENBQUMsTUFBZTtBQUM3QixRQUFBQyxJQUFPZixFQUFjLHFCQUFxQixXQUFXO0FBQzNELElBQUUsYUFBYWUsR0FBTSxJQUFJLElBQUksRUFBRTtBQUN6QixRQUFBQyxJQUFPaEIsRUFBYyxxQkFBcUIsV0FBVztBQUMzRCxJQUFFLGFBQWFnQixHQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLFFBQUFDLElBQVVqQixFQUFjLHdCQUF3QixXQUFXO0FBQ2pFLElBQUUsYUFBYWlCLEdBQVMsSUFBSSxJQUFJLEVBQUU7QUFDcEMsR0NKYUMsS0FBc0Q7QUFBQSxFQUNqRSxZQUFZLENBQUNoQixFQUFLO0FBQUEsRUFDbEIsY0FBYyxDQUFDSSxFQUFPO0FBQUEsRUFDdEIsV0FBVyxDQUFDQyxFQUFJO0FBQUEsRUFDaEIsWUFBWSxDQUFDTyxFQUFLO0FBQ3BCLEdBRU12YSx5QkFBVTtBQUNoQixXQUFXNGEsS0FBVSxPQUFPLE9BQU9ELEVBQU07QUFDdkMsYUFBV3RXLEtBQVN1VztBQUNsQixJQUFBNWEsR0FBSSxJQUFJcUUsQ0FBSztBQUdKLE1BQUF3VyxLQUFNLENBQUMsR0FBRzdhLEVBQUc7QUNmbkIsTUFBTThhLEdBQVE7QUFBQSxFQU1uQixjQUFjO0FBTGQsSUFBQUMsRUFBQSxzQkFBZTtBQUNmLElBQUFBLEVBQUEsd0JBQWlCO0FBQ2pCLElBQUFBLEVBQUEsdUJBQWdCO0FBRWhCLElBQUFBLEVBQUE7QUE2REEsSUFBQUEsRUFBQSxvQkFBYSxDQUNYQyxHQUNBQyxHQUNBQyxHQUNBQyxHQUNBdFEsTUFDRztBQUNILFlBQU11USxJQUEwQixFQUFFLFVBQVUsS0FBTSxPQUFPLEtBQU0sR0FBR3ZRO0FBQzlELE1BQUMsS0FBSyxrQkFDUnVRLEVBQUssUUFBUSxHQUNiQSxFQUFLLFdBQVc7QUFFbEIsWUFBTTFCLElBQU0yQixHQUFVTCxDQUFTLEVBQUUsT0FBT0MsQ0FBTztBQUUvQyxpQkFBVyxDQUFDalgsR0FBS0ssQ0FBSyxLQUFLLE9BQU8sUUFBUTZXLENBQWlCO0FBQ3JELFFBQUF4QixFQUFBLEtBQUsxVixHQUFLSyxDQUFLO0FBR3JCLFlBQU0vRSxJQUFJb2EsRUFDUCxXQUFXLEVBQ1gsU0FBUzBCLEVBQUssUUFBUSxFQUN0QixNQUFNQSxFQUFLLEtBQUssRUFDaEIsS0FBS0UsRUFBYTtBQUVyQixpQkFBVyxDQUFDdFgsR0FBS0ssQ0FBSyxLQUFLLE9BQU8sUUFBUThXLENBQWU7QUFDckQsUUFBQTdiLEVBQUEsS0FBSzBFLEdBQUtLLENBQUs7QUFBQSxJQUNuQjtBQXJGQSxTQUFLLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBRUEsY0FBYztBQUNaLFVBQU1rWCxJQUFRLE9BQU8sU0FBUyxTQUFTLE1BQU0sMEJBQTBCO0FBRXZFLFFBRFEsUUFBQSxJQUFJLFdBQVdBLENBQUssR0FDeEJBLGFBQWlCLFNBQVNBLEVBQU0sU0FBUyxHQUFHO0FBQ3pDLFdBQUEsVUFBVUEsRUFBTSxDQUFDLEdBQ3RCLEtBQUssZ0JBQWdCO0FBQ3JCO0FBQUEsSUFDRjtBQUNBLFNBQUssZ0JBQWdCO0FBQUEsRUFDdkI7QUFBQSxFQUVBLFVBQVU7QUFDUixVQUFNL1MsSUFBTyxLQUFLLFVBQVVtUyxHQUFPLEtBQUssT0FBTyxJQUFJRTtBQUNuRCxRQUFJclMsTUFBUztBQUdiLGlCQUFXbUksS0FBS25JO0FBQ2QsUUFBQW1JLEVBQUUsSUFBSTtBQUFBLEVBRVY7QUFBQSxFQUVBLFdBQVc7QUFDVCxnQkFBSyxnQkFBZ0IsS0FBSyxnQkFDbkIsS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLGFBQWFuUCxHQUFvQmdhLEdBQVlDLEdBQVkvTixHQUFXO0FBQ2xFLFdBQU8sS0FBSztBQUFBLE1BQ1ZsTTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFBZ2E7QUFBQSxRQUNBLElBQUFDO0FBQUEsUUFDQSxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0EsRUFBRSxHQUFBL04sRUFBRTtBQUFBLE1BQ0o7QUFBQSxRQUNFLFVBQVU7QUFBQSxRQUNWLE9BQU8sS0FBSyxTQUFTO0FBQUEsTUFDdkI7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUFBLEVBRUEsY0FBY2xNLEdBQW9Ca2EsR0FBZ0I7QUFDaEQsV0FBTyxLQUFLO0FBQUEsTUFDVmxhO0FBQUEsTUFDQTtBQUFBLE1BQ0EsRUFBRSxRQUFRLEdBQUc7QUFBQSxNQUNiLEVBQUUsUUFBQWthLEVBQWU7QUFBQSxNQUNqQjtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsT0FBTyxLQUFLLFNBQVM7QUFBQSxNQUN2QjtBQUFBLElBQUE7QUFBQSxFQUVKO0FBOEJGO0FDbEdPLE1BQU1DLEtBQVksTUFBTTtBQUM3QixRQUFNQyxJQUNKLE9BQU8sY0FDUCxPQUFPLFdBQVcsOEJBQThCLEVBQUUsU0FFOUNDLElBQUssU0FBUyxLQUFLO0FBQ3pCLEVBQUFELElBQVNDLEVBQUcsSUFBSSxNQUFNLElBQUlBLEVBQUcsSUFBSSxPQUFPLEdBRXhDLE9BQ0csV0FBVyw4QkFBOEIsRUFDekMsaUJBQWlCLFVBQVUsQ0FBQ25MLE1BQU07QUFDM0IsVUFBQW9MLElBQWNwTCxFQUFFLFVBQVUsU0FBUztBQUNqQyxZQUFBLElBQUksaUJBQWlCb0wsQ0FBVyxHQUV4Q0QsRUFBRyxPQUFPLE1BQU0sR0FDaEJBLEVBQUcsT0FBTyxPQUFPLEdBQ2JDLE1BQWdCLFNBQ2xCRCxFQUFHLElBQUksTUFBTSxJQUViQSxFQUFHLElBQUksT0FBTztBQUFBLEVBQ2hCLENBQ0Q7QUFDTDtBQ2pCQUY7QUFFQSxNQUFNSSxLQUFVLElBQUlqQjtBQUNwQmlCLEdBQVEsUUFBUTsifQ==
