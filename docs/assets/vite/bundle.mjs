var ge = Object.defineProperty;
var ye = (t, e, n) => e in t ? ge(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var T = (t, e, n) => (ye(t, typeof e != "symbol" ? e + "" : e, n), n);
var _e = { value: () => {
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
        if ((i = (t = r[o]).type) && (i = me(n[i], t.name)))
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
function me(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function kt(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = _e, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var lt = "http://www.w3.org/1999/xhtml";
const St = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function it(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), St.hasOwnProperty(e) ? { space: St[e], local: t } : t;
}
function ve(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === lt && e.documentElement.namespaceURI === lt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function xe(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ot(t) {
  var e = it(t);
  return (e.local ? xe : ve)(e);
}
function be() {
}
function yt(t) {
  return t == null ? be : function() {
    return this.querySelector(t);
  };
}
function Ne(t) {
  typeof t != "function" && (t = yt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), c, l, u = 0; u < s; ++u)
      (c = o[u]) && (l = t.call(c, c.__data__, u, o)) && ("__data__" in c && (l.__data__ = c.__data__), a[u] = l);
  return new w(r, this._parents);
}
function ke(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Se() {
  return [];
}
function Pt(t) {
  return t == null ? Se : function() {
    return this.querySelectorAll(t);
  };
}
function Ae(t) {
  return function() {
    return ke(t.apply(this, arguments));
  };
}
function Ee(t) {
  typeof t == "function" ? t = Ae(t) : t = Pt(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, l = 0; l < a; ++l)
      (c = s[l]) && (r.push(t.call(c, c.__data__, l, s)), i.push(c));
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
var Ce = Array.prototype.find;
function $e(t) {
  return function() {
    return Ce.call(this.children, t);
  };
}
function Te() {
  return this.firstElementChild;
}
function Re(t) {
  return this.select(t == null ? Te : $e(typeof t == "function" ? t : Yt(t)));
}
var Me = Array.prototype.filter;
function Fe() {
  return Array.from(this.children);
}
function Ge(t) {
  return function() {
    return Me.call(this.children, t);
  };
}
function De(t) {
  return this.selectAll(t == null ? Fe : Ge(typeof t == "function" ? t : Yt(t)));
}
function Ve(t) {
  typeof t != "function" && (t = Lt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, l = 0; l < s; ++l)
      (c = o[l]) && t.call(c, c.__data__, l, o) && a.push(c);
  return new w(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function Ie() {
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
  for (var s = 0, a, c = e.length, l = o.length; s < l; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Z(t, o[s]);
  for (; s < c; ++s)
    (a = e[s]) && (i[s] = a);
}
function Xe(t, e, n, r, i, o, s) {
  var a, c, l = /* @__PURE__ */ new Map(), u = e.length, f = o.length, h = new Array(u), d;
  for (a = 0; a < u; ++a)
    (c = e[a]) && (h[a] = d = s.call(c, c.__data__, a, e) + "", l.has(d) ? i[a] = c : l.set(d, c));
  for (a = 0; a < f; ++a)
    d = s.call(t, o[a], a, o) + "", (c = l.get(d)) ? (r[a] = c, c.__data__ = o[a], l.delete(d)) : n[a] = new Z(t, o[a]);
  for (a = 0; a < u; ++a)
    (c = e[a]) && l.get(h[a]) === c && (i[a] = c);
}
function Oe(t) {
  return t.__data__;
}
function Pe(t, e) {
  if (!arguments.length)
    return Array.from(this, Oe);
  var n = e ? Xe : He, r = this._parents, i = this._groups;
  typeof t != "function" && (t = qe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), l = 0; l < o; ++l) {
    var u = r[l], f = i[l], h = f.length, d = Le(t.call(u, u && u.__data__, l, r)), p = d.length, y = a[l] = new Array(p), A = s[l] = new Array(p), pe = c[l] = new Array(h);
    n(u, f, y, A, pe, d, e);
    for (var G = 0, B = 0, bt, Nt; G < p; ++G)
      if (bt = y[G]) {
        for (G >= B && (B = G + 1); !(Nt = A[B]) && ++B < p; )
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
    for (var l = n[c], u = r[c], f = l.length, h = a[c] = new Array(f), d, p = 0; p < f; ++p)
      (d = l[p] || u[p]) && (h[p] = d);
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
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), l, u = 0; u < a; ++u)
      (l = s[u]) && (c[u] = l);
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
function ln(t, e) {
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
function un(t) {
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
function dn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? un : typeof e == "function" ? hn : fn)(t, e, n ?? "")) : M(this.node(), t);
}
function M(t, e) {
  return t.style.getPropertyValue(e) || zt(t).getComputedStyle(t, null).getPropertyValue(e);
}
function pn(t) {
  return function() {
    delete this[t];
  };
}
function gn(t, e) {
  return function() {
    this[t] = e;
  };
}
function yn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function _n(t, e) {
  return arguments.length > 1 ? this.each((e == null ? pn : typeof e == "function" ? yn : gn)(t, e)) : this.node()[t];
}
function Ut(t) {
  return t.trim().split(/^|\s+/);
}
function _t(t) {
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
  for (var n = _t(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Jt(t, e) {
  for (var n = _t(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function wn(t) {
  return function() {
    Wt(this, t);
  };
}
function mn(t) {
  return function() {
    Jt(this, t);
  };
}
function vn(t, e) {
  return function() {
    (e.apply(this, arguments) ? Wt : Jt)(this, t);
  };
}
function xn(t, e) {
  var n = Ut(t + "");
  if (arguments.length < 2) {
    for (var r = _t(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? vn : e ? wn : mn)(n, e));
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
function Sn(t) {
  return arguments.length ? this.each(t == null ? bn : (typeof t == "function" ? kn : Nn)(t)) : this.node().textContent;
}
function An() {
  this.innerHTML = "";
}
function En(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Cn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function $n(t) {
  return arguments.length ? this.each(t == null ? An : (typeof t == "function" ? Cn : En)(t)) : this.node().innerHTML;
}
function Tn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Rn() {
  return this.each(Tn);
}
function Mn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fn() {
  return this.each(Mn);
}
function Gn(t) {
  var e = typeof t == "function" ? t : Ot(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Dn() {
  return null;
}
function Vn(t, e) {
  var n = typeof t == "function" ? t : Ot(t), r = e == null ? Dn : typeof e == "function" ? e : yt(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function In() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function qn() {
  return this.each(In);
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
      for (var c = 0, l = a.length, u; c < l; ++c)
        for (i = 0, u = a[c]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name)
            return u.value;
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
  selectChild: Re,
  selectChildren: De,
  filter: Ve,
  data: Pe,
  enter: Ie,
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
  attr: ln,
  style: dn,
  property: _n,
  classed: xn,
  text: Sn,
  html: $n,
  raise: Rn,
  lower: Fn,
  append: Gn,
  insert: Vn,
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
var H = 0.7, j = 1 / H, R = "\\s*([+-]?\\d+)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tr = /^#([0-9a-f]{3,8})$/, er = new RegExp(`^rgb\\(${R},${R},${R}\\)$`), nr = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), rr = new RegExp(`^rgba\\(${R},${R},${R},${X}\\)$`), ir = new RegExp(`^rgba\\(${x},${x},${x},${X}\\)$`), or = new RegExp(`^hsl\\(${X},${x},${x}\\)$`), sr = new RegExp(`^hsla\\(${X},${x},${x},${X}\\)$`), At = {
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
  formatRgb: Ct,
  toString: Ct
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
function Ct() {
  return this.rgb().formatRgb();
}
function O(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = tr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? $t(e) : n === 3 ? new _(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? z(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? z(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = er.exec(t)) ? new _(e[1], e[2], e[3], 1) : (e = nr.exec(t)) ? new _(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = rr.exec(t)) ? z(e[1], e[2], e[3], e[4]) : (e = ir.exec(t)) ? z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = or.exec(t)) ? Mt(e[1], e[2] / 100, e[3] / 100, 1) : (e = sr.exec(t)) ? Mt(e[1], e[2] / 100, e[3] / 100, e[4]) : At.hasOwnProperty(t) ? $t(At[t]) : t === "transparent" ? new _(NaN, NaN, NaN, 0) : null;
}
function $t(t) {
  return new _(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function z(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new _(t, e, n, r);
}
function lr(t) {
  return t instanceof Y || (t = O(t)), t ? (t = t.rgb(), new _(t.r, t.g, t.b, t.opacity)) : new _();
}
function ut(t, e, n, r) {
  return arguments.length === 1 ? lr(t) : new _(t, e, n, r ?? 1);
}
function _(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
wt(_, ut, jt(Y, {
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
    return new _(C(this.r), C(this.g), C(this.b), tt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tt,
  // Deprecated! Use color.formatHex.
  formatHex: Tt,
  formatHex8: ur,
  formatRgb: Rt,
  toString: Rt
}));
function Tt() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}`;
}
function ur() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}${E((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Rt() {
  const t = tt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${C(this.r)}, ${C(this.g)}, ${C(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function tt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function C(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function E(t) {
  return t = C(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Mt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new m(t, e, n, r);
}
function te(t) {
  if (t instanceof m)
    return new m(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = O(t)), !t)
    return new m();
  if (t instanceof m)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new m(s, a, c, t.opacity);
}
function fr(t, e, n, r) {
  return arguments.length === 1 ? te(t) : new m(t, e, n, r ?? 1);
}
function m(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
wt(m, fr, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new m(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new m(this.h, this.s, this.l * t, this.opacity);
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
    return new m(Ft(this.h), U(this.s), U(this.l), tt(this.opacity));
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
function dr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function pr(t) {
  return (t = +t) == 1 ? ne : function(e, n) {
    return n - e ? dr(e, n, t) : ee(isNaN(e) ? n : e);
  };
}
function ne(t, e) {
  var n = e - t;
  return n ? hr(t, n) : ee(isNaN(t) ? e : t);
}
const Gt = function t(e) {
  var n = pr(e);
  function r(i, o) {
    var s = n((i = ut(i)).r, (o = ut(o)).r), a = n(i.g, o.g), c = n(i.b, o.b), l = ne(i.opacity, o.opacity);
    return function(u) {
      return i.r = s(u), i.g = a(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function S(t, e) {
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
function yr(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _r(t, e) {
  var n = ft.lastIndex = ct.lastIndex = 0, r, i, o, s = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = ft.exec(t)) && (i = ct.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, c.push({ i: s, x: S(r, i) })), n = ct.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? c[0] ? yr(c[0].x) : gr(e) : (e = c.length, function(l) {
    for (var u = 0, f; u < e; ++u)
      a[(f = c[u]).i] = f.x(l);
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
function mr(t) {
  return t == null || (K || (K = document.createElementNS("http://www.w3.org/2000/svg", "g")), K.setAttribute("transform", t), !(t = K.transform.baseVal.consolidate())) ? ht : (t = t.matrix, re(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ie(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, f, h, d, p) {
    if (l !== f || u !== h) {
      var y = d.push("translate(", null, e, null, n);
      p.push({ i: y - 4, x: S(l, f) }, { i: y - 2, x: S(u, h) });
    } else
      (f || h) && d.push("translate(" + f + e + h + n);
  }
  function s(l, u, f, h) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: S(l, u) })) : u && f.push(i(f) + "rotate(" + u + r);
  }
  function a(l, u, f, h) {
    l !== u ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: S(l, u) }) : u && f.push(i(f) + "skewX(" + u + r);
  }
  function c(l, u, f, h, d, p) {
    if (l !== f || u !== h) {
      var y = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: y - 4, x: S(l, f) }, { i: y - 2, x: S(u, h) });
    } else
      (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(l, u) {
    var f = [], h = [];
    return l = t(l), u = t(u), o(l.translateX, l.translateY, u.translateX, u.translateY, f, h), s(l.rotate, u.rotate, f, h), a(l.skewX, u.skewX, f, h), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, f, h), l = u = null, function(d) {
      for (var p = -1, y = h.length, A; ++p < y; )
        f[(A = h[p]).i] = A.x(d);
      return f.join("");
    };
  };
}
var vr = ie(wr, "px, ", "px)", "deg)"), xr = ie(mr, ", ", ")", ")"), F = 0, V = 0, D = 0, oe = 1e3, et, I, nt = 0, $ = 0, ot = 0, P = typeof performance == "object" && performance.now ? performance : Date, se = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function mt() {
  return $ || (se(br), $ = P.now() + ot);
}
function br() {
  $ = 0;
}
function rt() {
  this._call = this._time = this._next = null;
}
rt.prototype = ae.prototype = {
  constructor: rt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? mt() : +n) + (e == null ? 0 : +e), !this._next && I !== this && (I ? I._next = this : et = this, I = this), this._call = t, this._time = n, dt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, dt());
  }
};
function ae(t, e, n) {
  var r = new rt();
  return r.restart(t, e, n), r;
}
function Nr() {
  mt(), ++F;
  for (var t = et, e; t; )
    (e = $ - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --F;
}
function Vt() {
  $ = (nt = P.now()) + ot, F = V = 0;
  try {
    Nr();
  } finally {
    F = 0, Sr(), $ = 0;
  }
}
function kr() {
  var t = P.now(), e = t - nt;
  e > oe && (ot -= e, nt = t);
}
function Sr() {
  for (var t, e = et, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : et = n);
  I = t, dt(r);
}
function dt(t) {
  if (!F) {
    V && (V = clearTimeout(V));
    var e = t - $;
    e > 24 ? (t < 1 / 0 && (V = setTimeout(Vt, t - P.now() - ot)), D && (D = clearInterval(D))) : (D || (nt = P.now(), D = setInterval(kr, oe)), F = 1, se(Vt));
  }
}
function It(t, e, n) {
  var r = new rt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ar = Xt("start", "end", "cancel", "interrupt"), Er = [], ce = 0, qt = 1, pt = 2, J = 3, Ht = 4, gt = 5, Q = 6;
function st(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  Cr(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ar,
    tween: Er,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ce
  });
}
function vt(t, e) {
  var n = v(t, e);
  if (n.state > ce)
    throw new Error("too late; already scheduled");
  return n;
}
function b(t, e) {
  var n = v(t, e);
  if (n.state > J)
    throw new Error("too late; already running");
  return n;
}
function v(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Cr(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = ae(o, 0, n.time);
  function o(l) {
    n.state = qt, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var u, f, h, d;
    if (n.state !== qt)
      return c();
    for (u in r)
      if (d = r[u], d.name === n.name) {
        if (d.state === J)
          return It(s);
        d.state === Ht ? (d.state = Q, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[u]) : +u < e && (d.state = Q, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[u]);
      }
    if (It(function() {
      n.state === J && (n.state = Ht, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = pt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === pt) {
      for (n.state = J, i = new Array(h = n.tween.length), u = 0, f = -1; u < h; ++u)
        (d = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function a(l) {
    for (var u = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = gt, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, u);
    n.state === gt && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Q, n.timer.stop(), delete r[e];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function $r(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > pt && r.state < gt, r.state = Q, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Tr(t) {
  return this.each(function() {
    $r(this, t);
  });
}
function Rr(t, e) {
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
function Mr(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = b(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = a;
          break;
        }
      c === l && i.push(a);
    }
    o.tween = i;
  };
}
function Fr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = v(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Rr : Mr)(n, t, e));
}
function xt(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = b(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return v(i, r).value[e];
  };
}
function le(t, e) {
  var n;
  return (typeof e == "number" ? S : e instanceof O ? Gt : (n = O(e)) ? (e = n, Gt) : _r)(t, e);
}
function Gr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Vr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Ir(t, e, n) {
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
  var n = it(t), r = n === "transform" ? xr : le;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Hr : qr)(n, r, xt(this, "attr." + t, e)) : e == null ? (n.local ? Dr : Gr)(n) : (n.local ? Ir : Vr)(n, r, e));
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
    vt(this, t).delay = +e.apply(this, arguments);
  };
}
function Ur(t, e) {
  return e = +e, function() {
    vt(this, t).delay = e;
  };
}
function Kr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? zr : Ur)(e, t)) : v(this.node(), e).delay;
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
  return arguments.length ? this.each((typeof t == "function" ? Wr : Jr)(e, t)) : v(this.node(), e).duration;
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
  return arguments.length ? this.each(Zr(e, t)) : v(this.node(), e).ease;
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
    for (var o = e[i], s = o.length, a = r[i] = [], c, l = 0; l < s; ++l)
      (c = o[l]) && t.call(c, c.__data__, l, o) && a.push(c);
  return new k(r, this._parents, this._name, this._id);
}
function ri(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var c = e[a], l = n[a], u = c.length, f = s[a] = new Array(u), h, d = 0; d < u; ++d)
      (h = c[d] || l[d]) && (f[d] = h);
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
  var r, i, o = ii(e) ? vt : b;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function si(t, e) {
  var n = this._id;
  return arguments.length < 2 ? v(this.node(), n).on.on(t) : this.each(oi(n, t, e));
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
function li(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = yt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], c = a.length, l = o[s] = new Array(c), u, f, h = 0; h < c; ++h)
      (u = a[h]) && (f = t.call(u, u.__data__, h, a)) && ("__data__" in u && (f.__data__ = u.__data__), l[h] = f, st(l[h], e, n, h, l, v(u, n)));
  return new k(o, this._parents, e, n);
}
function ui(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Pt(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], l = c.length, u, f = 0; f < l; ++f)
      if (u = c[f]) {
        for (var h = t.call(u, u.__data__, f, c), d, p = v(u, n), y = 0, A = h.length; y < A; ++y)
          (d = h[y]) && st(d, e, n, y, h, p);
        o.push(h), s.push(u);
      }
  return new k(o, s, e, n);
}
var fi = L.prototype.constructor;
function hi() {
  return new fi(this._groups, this._parents);
}
function di(t, e) {
  var n, r, i;
  return function() {
    var o = M(this, t), s = (this.style.removeProperty(t), M(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function ue(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function pi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = M(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function gi(t, e, n) {
  var r, i, o;
  return function() {
    var s = M(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), M(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
  };
}
function yi(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var c = b(this, t), l = c.on, u = c.value[o] == null ? a || (a = ue(e)) : void 0;
    (l !== n || i !== u) && (r = (n = l).copy()).on(s, i = u), c.on = r;
  };
}
function _i(t, e, n) {
  var r = (t += "") == "transform" ? vr : le;
  return e == null ? this.styleTween(t, di(t, r)).on("end.style." + t, ue(t)) : typeof e == "function" ? this.styleTween(t, gi(t, r, xt(this, "style." + t, e))).each(yi(this._id, t)) : this.styleTween(t, pi(t, r, e), n).on("end.style." + t, null);
}
function wi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function mi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && wi(t, s, n)), r;
  }
  return o._value = e, o;
}
function vi(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, mi(t, e, n ?? ""));
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
function Si(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ki(i)), e;
  }
  return r._value = t, r;
}
function Ai(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Si(t));
}
function Ei() {
  for (var t = this._name, e = this._id, n = fe(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, l = 0; l < a; ++l)
      if (c = s[l]) {
        var u = v(c, e);
        st(c, t, n, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new k(r, this._parents, t, n);
}
function Ci() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var l = b(this, r), u = l.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), l.on = e;
    }), i === 0 && o();
  });
}
var $i = 0;
function k(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function fe() {
  return ++$i;
}
var N = L.prototype;
k.prototype = {
  constructor: k,
  select: li,
  selectAll: ui,
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
  style: _i,
  styleTween: vi,
  text: Ni,
  textTween: Ai,
  remove: ci,
  tween: Fr,
  delay: Kr,
  duration: Qr,
  ease: jr,
  easeVarying: ei,
  end: Ci,
  [Symbol.iterator]: N[Symbol.iterator]
};
const Ti = (t) => +t;
function Ri(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Mi = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ri
};
function Fi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Gi(t) {
  var e, n;
  t instanceof k ? (e = t._id, t = t._name) : (e = fe(), (n = Mi).time = mt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, l = 0; l < a; ++l)
      (c = s[l]) && st(c, t, e, l, s, n || Fi(c, e));
  return new k(r, this._parents, t, e);
}
L.prototype.interrupt = Tr;
L.prototype.transition = Gi;
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
const g = (t, e) => {
  const n = document.querySelector(t);
  if (n === null)
    throw new Error("Cannot find selector " + t);
  if (e !== void 0 && !(n instanceof e))
    throw new Error(`Selector ${t} not of type ${e}`);
  return n;
}, Di = (t) => {
  const e = g("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const n = g("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const r = g("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Vi = (t) => {
  const e = g("svg.purpose g.target", SVGGElement);
  t.createCircle(e, 150, 50, 40), t.createCircle(e, 150, 50, 30), t.createCircle(e, 150, 50, 20), t.createCircle(e, 150, 50, 10), t.createCircle(e, 150, 50, 1);
}, Ii = (t) => {
  const e = g("svg.hick g.choice-01", SVGGElement);
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
  const n = g("svg.hick g.choice-02", SVGGElement);
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
  const r = g("svg.hick g.choice-03", SVGGElement);
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
  const i = g("svg.hick g.choice-04", SVGGElement);
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
  const o = g("svg.hick g.choice-05", SVGGElement);
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
  const s = g("svg.hick g.choice-06", SVGGElement);
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
  const e = g("svg.jakob g.app-1", SVGGElement);
  t.createCircle(e, 40, 50, 35);
  const n = g("svg.jakob g.app-2", SVGGElement);
  t.createCircle(n, 40, 50, 35);
  const r = g("svg.jakob g.your-app", SVGGElement);
  t.createCircle(r, 40, 50, 35);
}, Hi = (t) => {
  const e = g("svg.gradient g", SVGGElement);
  t.createRect(e, 5, 30, 40, 40, 1), t.createRect(e, 50, 30, 40, 40, 2), t.createRect(e, 95, 30, 40, 40, 3), t.createRect(e, 140, 30, 40, 40, 4), t.createRect(e, 185, 30, 40, 40, 5), t.createRect(e, 230, 30, 40, 40, 6);
}, Xi = (t) => {
  const e = g("svg.gestalt g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Oi = (t) => {
  const e = g("svg.proximity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? 8 : 0;
      t.createCircle(e, n * 20 + 100 + i, r * 20 + 20 - i, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
    }
}, Pi = (t) => {
  const e = g("svg.similarity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, he = {
  "02-fitts": [Di],
  "01-purpose": [Vi],
  "03-hick": [Ii],
  "04-jakob": [qi],
  "07-goal-gradient": [Hi],
  "08-gestalt": [Xi],
  "09-law-of-proximity": [Oi],
  "10-law-of-similarity": [Pi]
}, de = /* @__PURE__ */ new Set();
for (const t of Object.values(he))
  for (const e of t)
    de.add(e);
const Li = [...de];
class Yi {
  constructor() {
    T(this, "delayCounter", 0);
    T(this, "delayIncrement", 100);
    T(this, "useTransition", !1);
    T(this, "svgName");
    T(this, "createForm", (e, n, r, i, o) => {
      const s = {
        duration: 2e3,
        delay: 1e3,
        class: "",
        ...o
      };
      this.useTransition || (s.delay = 0, s.duration = 0);
      const a = jn(e).append(n);
      for (const [l, u] of Object.entries(r))
        a.attr(l, u);
      s.class && a.attr("class", s.class);
      const c = a.transition().duration(s.duration).delay(s.delay).ease(Ti);
      for (const [l, u] of Object.entries(i))
        c.attr(l, u);
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
    const e = this.svgName ? he[this.svgName] : Li;
    if (e !== void 0)
      for (const n of e)
        n(this);
  }
  getDelay() {
    return this.delayCounter += this.delayIncrement, this.delayCounter;
  }
  createCircle(e, n, r, i, o) {
    const s = {
      duration: 300,
      delay: this.getDelay(),
      ...o
    };
    return this.createForm(
      e,
      "circle",
      {
        cx: n,
        cy: r,
        r: 0
      },
      { r: i },
      s
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
  createPolyline(e, n) {
    return this.createForm(
      e,
      "polyline",
      { points: "" },
      { points: n },
      {
        duration: 300,
        delay: this.getDelay()
      }
    );
  }
  createRect(e, n, r, i, o, s = 0) {
    return this.createForm(
      e,
      "rect",
      { x: n, y: r, width: i, height: 0, opacity: s * (1 / 6) },
      { height: o },
      {
        duration: 300,
        delay: this.getDelay()
      }
    );
  }
}
const Bi = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
Bi();
const zi = new Yi();
zi.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9ncmFkaWVudC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL2dlc3RhbHQudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9wcm94aW1pdHkudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zaW1pbGFyaXR5LnRzIiwiLi4vLi4vLi4vc3JjL3N2Z0NvbmZpZy50cyIsIi4uLy4uLy4uL3NyYy9TVkdUb29sLnRzIiwiLi4vLi4vLi4vc3JjL3RoZW1lLnRzIiwiLi4vLi4vLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vb3AgPSB7dmFsdWU6ICgpID0+IHt9fTtcblxuZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gYXJndW1lbnRzLmxlbmd0aCwgXyA9IHt9LCB0OyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKCEodCA9IGFyZ3VtZW50c1tpXSArIFwiXCIpIHx8ICh0IGluIF8pIHx8IC9bXFxzLl0vLnRlc3QodCkpIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgdHlwZTogXCIgKyB0KTtcbiAgICBfW3RdID0gW107XG4gIH1cbiAgcmV0dXJuIG5ldyBEaXNwYXRjaChfKTtcbn1cblxuZnVuY3Rpb24gRGlzcGF0Y2goXykge1xuICB0aGlzLl8gPSBfO1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMsIHR5cGVzKSB7XG4gIHJldHVybiB0eXBlbmFtZXMudHJpbSgpLnNwbGl0KC9efFxccysvKS5tYXAoZnVuY3Rpb24odCkge1xuICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgbmFtZSA9IHQuc2xpY2UoaSArIDEpLCB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICBpZiAodCAmJiAhdHlwZXMuaGFzT3duUHJvcGVydHkodCkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0KTtcbiAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICB9KTtcbn1cblxuRGlzcGF0Y2gucHJvdG90eXBlID0gZGlzcGF0Y2gucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogRGlzcGF0Y2gsXG4gIG9uOiBmdW5jdGlvbih0eXBlbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgXyA9IHRoaXMuXyxcbiAgICAgICAgVCA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiwgXyksXG4gICAgICAgIHQsXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IFQubGVuZ3RoO1xuXG4gICAgLy8gSWYgbm8gY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmV0dXJuIHRoZSBjYWxsYmFjayBvZiB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSAmJiAodCA9IGdldChfW3RdLCB0eXBlbmFtZS5uYW1lKSkpIHJldHVybiB0O1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIGEgdHlwZSB3YXMgc3BlY2lmaWVkLCBzZXQgdGhlIGNhbGxiYWNrIGZvciB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICAvLyBPdGhlcndpc2UsIGlmIGEgbnVsbCBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZW1vdmUgY2FsbGJhY2tzIG9mIHRoZSBnaXZlbiBuYW1lLlxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGNhbGxiYWNrOiBcIiArIGNhbGxiYWNrKTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIGVsc2UgaWYgKGNhbGxiYWNrID09IG51bGwpIGZvciAodCBpbiBfKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29weSA9IHt9LCBfID0gdGhpcy5fO1xuICAgIGZvciAodmFyIHQgaW4gXykgY29weVt0XSA9IF9bdF0uc2xpY2UoKTtcbiAgICByZXR1cm4gbmV3IERpc3BhdGNoKGNvcHkpO1xuICB9LFxuICBjYWxsOiBmdW5jdGlvbih0eXBlLCB0aGF0KSB7XG4gICAgaWYgKChuID0gYXJndW1lbnRzLmxlbmd0aCAtIDIpID4gMCkgZm9yICh2YXIgYXJncyA9IG5ldyBBcnJheShuKSwgaSA9IDAsIG4sIHQ7IGkgPCBuOyArK2kpIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9LFxuICBhcHBseTogZnVuY3Rpb24odHlwZSwgdGhhdCwgYXJncykge1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh2YXIgdCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0KHR5cGUsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aCwgYzsgaSA8IG47ICsraSkge1xuICAgIGlmICgoYyA9IHR5cGVbaV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXQodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgIGlmICh0eXBlW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHR5cGVbaV0gPSBub29wLCB0eXBlID0gdHlwZS5zbGljZSgwLCBpKS5jb25jYXQodHlwZS5zbGljZShpICsgMSkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChjYWxsYmFjayAhPSBudWxsKSB0eXBlLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiBjYWxsYmFja30pO1xuICByZXR1cm4gdHlwZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGF0Y2g7XG4iLCJleHBvcnQgdmFyIHhodG1sID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHhodG1sOiB4aHRtbCxcbiAgeGxpbms6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxuICB4bWw6IFwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCIsXG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvXCJcbn07XG4iLCJpbXBvcnQgbmFtZXNwYWNlcyBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIHByZWZpeCA9IG5hbWUgKz0gXCJcIiwgaSA9IHByZWZpeC5pbmRleE9mKFwiOlwiKTtcbiAgaWYgKGkgPj0gMCAmJiAocHJlZml4ID0gbmFtZS5zbGljZSgwLCBpKSkgIT09IFwieG1sbnNcIikgbmFtZSA9IG5hbWUuc2xpY2UoaSArIDEpO1xuICByZXR1cm4gbmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpID8ge3NwYWNlOiBuYW1lc3BhY2VzW3ByZWZpeF0sIGxvY2FsOiBuYW1lfSA6IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG59XG4iLCJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuL25hbWVzcGFjZS5qc1wiO1xuaW1wb3J0IHt4aHRtbH0gZnJvbSBcIi4vbmFtZXNwYWNlcy5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdG9ySW5oZXJpdChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQsXG4gICAgICAgIHVyaSA9IHRoaXMubmFtZXNwYWNlVVJJO1xuICAgIHJldHVybiB1cmkgPT09IHhodG1sICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IHhodG1sXG4gICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxuICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdG9yRml4ZWQoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gKGZ1bGxuYW1lLmxvY2FsXG4gICAgICA/IGNyZWF0b3JGaXhlZFxuICAgICAgOiBjcmVhdG9ySW5oZXJpdCkoZnVsbG5hbWUpO1xufVxuIiwiZnVuY3Rpb24gbm9uZSgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gbm9uZSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiLy8gR2l2ZW4gc29tZXRoaW5nIGFycmF5IGxpa2UgKG9yIG51bGwpLCByZXR1cm5zIHNvbWV0aGluZyB0aGF0IGlzIHN0cmljdGx5IGFuXG4vLyBhcnJheS4gVGhpcyBpcyB1c2VkIHRvIGVuc3VyZSB0aGF0IGFycmF5LWxpa2Ugb2JqZWN0cyBwYXNzZWQgdG8gZDMuc2VsZWN0QWxsXG4vLyBvciBzZWxlY3Rpb24uc2VsZWN0QWxsIGFyZSBjb252ZXJ0ZWQgaW50byBwcm9wZXIgYXJyYXlzIHdoZW4gY3JlYXRpbmcgYVxuLy8gc2VsZWN0aW9uOyB3ZSBkb27igJl0IGV2ZXIgd2FudCB0byBjcmVhdGUgYSBzZWxlY3Rpb24gYmFja2VkIGJ5IGEgbGl2ZVxuLy8gSFRNTENvbGxlY3Rpb24gb3IgTm9kZUxpc3QuIEhvd2V2ZXIsIG5vdGUgdGhhdCBzZWxlY3Rpb24uc2VsZWN0QWxsIHdpbGwgdXNlIGFcbi8vIHN0YXRpYyBOb2RlTGlzdCBhcyBhIGdyb3VwLCBzaW5jZSBpdCBzYWZlbHkgZGVyaXZlZCBmcm9tIHF1ZXJ5U2VsZWN0b3JBbGwuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheSh4KSB7XG4gIHJldHVybiB4ID09IG51bGwgPyBbXSA6IEFycmF5LmlzQXJyYXkoeCkgPyB4IDogQXJyYXkuZnJvbSh4KTtcbn1cbiIsImZ1bmN0aW9uIGVtcHR5KCkge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gZW1wdHkgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IGFycmF5IGZyb20gXCIuLi9hcnJheS5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yQWxsIGZyb20gXCIuLi9zZWxlY3RvckFsbC5qc1wiO1xuXG5mdW5jdGlvbiBhcnJheUFsbChzZWxlY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcnJheShzZWxlY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCA9PT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBhcnJheUFsbChzZWxlY3QpO1xuICBlbHNlIHNlbGVjdCA9IHNlbGVjdG9yQWxsKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gW10sIHBhcmVudHMgPSBbXSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc3ViZ3JvdXBzLnB1c2goc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKTtcbiAgICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE1hdGNoZXIoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuIiwiaW1wb3J0IHtjaGlsZE1hdGNoZXJ9IGZyb20gXCIuLi9tYXRjaGVyLmpzXCI7XG5cbnZhciBmaW5kID0gQXJyYXkucHJvdG90eXBlLmZpbmQ7XG5cbmZ1bmN0aW9uIGNoaWxkRmluZChtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbmQuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoaWxkRmlyc3QoKSB7XG4gIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QobWF0Y2ggPT0gbnVsbCA/IGNoaWxkRmlyc3RcbiAgICAgIDogY2hpbGRGaW5kKHR5cGVvZiBtYXRjaCA9PT0gXCJmdW5jdGlvblwiID8gbWF0Y2ggOiBjaGlsZE1hdGNoZXIobWF0Y2gpKSk7XG59XG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbHRlciA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXI7XG5cbmZ1bmN0aW9uIGNoaWxkcmVuKCkge1xuICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5GaWx0ZXIobWF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdEFsbChtYXRjaCA9PSBudWxsID8gY2hpbGRyZW5cbiAgICAgIDogY2hpbGRyZW5GaWx0ZXIodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoZXIgZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cGRhdGUpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh1cGRhdGUubGVuZ3RoKTtcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2VudGVyIHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbnRlck5vZGUocGFyZW50LCBkYXR1bSkge1xuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBwYXJlbnQub3duZXJEb2N1bWVudDtcbiAgdGhpcy5uYW1lc3BhY2VVUkkgPSBwYXJlbnQubmFtZXNwYWNlVVJJO1xuICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9fZGF0YV9fID0gZGF0dW07XG59XG5cbkVudGVyTm9kZS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBFbnRlck5vZGUsXG4gIGFwcGVuZENoaWxkOiBmdW5jdGlvbihjaGlsZCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5fbmV4dCk7IH0sXG4gIGluc2VydEJlZm9yZTogZnVuY3Rpb24oY2hpbGQsIG5leHQpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIG5leHQpOyB9LFxuICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyB9LFxuICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpOyB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7RW50ZXJOb2RlfSBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBiaW5kSW5kZXgocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSkge1xuICB2YXIgaSA9IDAsXG4gICAgICBub2RlLFxuICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGZpdCBpbnRvIHVwZGF0ZS5cbiAgLy8gUHV0IGFueSBudWxsIG5vZGVzIGludG8gZW50ZXIuXG4gIC8vIFB1dCBhbnkgcmVtYWluaW5nIGRhdGEgaW50byBlbnRlci5cbiAgZm9yICg7IGkgPCBkYXRhTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBkb27igJl0IGZpdCBpbnRvIGV4aXQuXG4gIGZvciAoOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5kS2V5KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEsIGtleSkge1xuICB2YXIgaSxcbiAgICAgIG5vZGUsXG4gICAgICBub2RlQnlLZXlWYWx1ZSA9IG5ldyBNYXAsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGtleVZhbHVlcyA9IG5ldyBBcnJheShncm91cExlbmd0aCksXG4gICAgICBrZXlWYWx1ZTtcblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggbm9kZS5cbiAgLy8gSWYgbXVsdGlwbGUgbm9kZXMgaGF2ZSB0aGUgc2FtZSBrZXksIHRoZSBkdXBsaWNhdGVzIGFyZSBhZGRlZCB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGtleVZhbHVlc1tpXSA9IGtleVZhbHVlID0ga2V5LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApICsgXCJcIjtcbiAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZUJ5S2V5VmFsdWUuc2V0KGtleVZhbHVlLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggZGF0dW0uXG4gIC8vIElmIHRoZXJlIGEgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXksIGpvaW4gYW5kIGFkZCBpdCB0byB1cGRhdGUuXG4gIC8vIElmIHRoZXJlIGlzIG5vdCAob3IgdGhlIGtleSBpcyBhIGR1cGxpY2F0ZSksIGFkZCBpdCB0byBlbnRlci5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGtleVZhbHVlID0ga2V5LmNhbGwocGFyZW50LCBkYXRhW2ldLCBpLCBkYXRhKSArIFwiXCI7XG4gICAgaWYgKG5vZGUgPSBub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWUpKSB7XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICBub2RlQnlLZXlWYWx1ZS5kZWxldGUoa2V5VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYW55IHJlbWFpbmluZyBub2RlcyB0aGF0IHdlcmUgbm90IGJvdW5kIHRvIGRhdGEgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZXNbaV0pID09PSBub2RlKSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRhdHVtKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuX19kYXRhX187XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLCBkYXR1bSk7XG5cbiAgdmFyIGJpbmQgPSBrZXkgPyBiaW5kS2V5IDogYmluZEluZGV4LFxuICAgICAgcGFyZW50cyA9IHRoaXMuX3BhcmVudHMsXG4gICAgICBncm91cHMgPSB0aGlzLl9ncm91cHM7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB2YWx1ZSA9IGNvbnN0YW50KHZhbHVlKTtcblxuICBmb3IgKHZhciBtID0gZ3JvdXBzLmxlbmd0aCwgdXBkYXRlID0gbmV3IEFycmF5KG0pLCBlbnRlciA9IG5ldyBBcnJheShtKSwgZXhpdCA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICB2YXIgcGFyZW50ID0gcGFyZW50c1tqXSxcbiAgICAgICAgZ3JvdXAgPSBncm91cHNbal0sXG4gICAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgICBkYXRhID0gYXJyYXlsaWtlKHZhbHVlLmNhbGwocGFyZW50LCBwYXJlbnQgJiYgcGFyZW50Ll9fZGF0YV9fLCBqLCBwYXJlbnRzKSksXG4gICAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgZW50ZXJHcm91cCA9IGVudGVyW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICB1cGRhdGVHcm91cCA9IHVwZGF0ZVtqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgZXhpdEdyb3VwID0gZXhpdFtqXSA9IG5ldyBBcnJheShncm91cExlbmd0aCk7XG5cbiAgICBiaW5kKHBhcmVudCwgZ3JvdXAsIGVudGVyR3JvdXAsIHVwZGF0ZUdyb3VwLCBleGl0R3JvdXAsIGRhdGEsIGtleSk7XG5cbiAgICAvLyBOb3cgY29ubmVjdCB0aGUgZW50ZXIgbm9kZXMgdG8gdGhlaXIgZm9sbG93aW5nIHVwZGF0ZSBub2RlLCBzdWNoIHRoYXRcbiAgICAvLyBhcHBlbmRDaGlsZCBjYW4gaW5zZXJ0IHRoZSBtYXRlcmlhbGl6ZWQgZW50ZXIgbm9kZSBiZWZvcmUgdGhpcyBub2RlLFxuICAgIC8vIHJhdGhlciB0aGFuIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmVudCBub2RlLlxuICAgIGZvciAodmFyIGkwID0gMCwgaTEgPSAwLCBwcmV2aW91cywgbmV4dDsgaTAgPCBkYXRhTGVuZ3RoOyArK2kwKSB7XG4gICAgICBpZiAocHJldmlvdXMgPSBlbnRlckdyb3VwW2kwXSkge1xuICAgICAgICBpZiAoaTAgPj0gaTEpIGkxID0gaTAgKyAxO1xuICAgICAgICB3aGlsZSAoIShuZXh0ID0gdXBkYXRlR3JvdXBbaTFdKSAmJiArK2kxIDwgZGF0YUxlbmd0aCk7XG4gICAgICAgIHByZXZpb3VzLl9uZXh0ID0gbmV4dCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSA9IG5ldyBTZWxlY3Rpb24odXBkYXRlLCBwYXJlbnRzKTtcbiAgdXBkYXRlLl9lbnRlciA9IGVudGVyO1xuICB1cGRhdGUuX2V4aXQgPSBleGl0O1xuICByZXR1cm4gdXBkYXRlO1xufVxuXG4vLyBHaXZlbiBzb21lIGRhdGEsIHRoaXMgcmV0dXJucyBhbiBhcnJheS1saWtlIHZpZXcgb2YgaXQ6IGFuIG9iamVjdCB0aGF0XG4vLyBleHBvc2VzIGEgbGVuZ3RoIHByb3BlcnR5IGFuZCBhbGxvd3MgbnVtZXJpYyBpbmRleGluZy4gTm90ZSB0aGF0IHVubGlrZVxuLy8gc2VsZWN0QWxsLCB0aGlzIGlzbuKAmXQgd29ycmllZCBhYm91dCDigJxsaXZl4oCdIGNvbGxlY3Rpb25zIGJlY2F1c2UgdGhlIHJlc3VsdGluZ1xuLy8gYXJyYXkgd2lsbCBvbmx5IGJlIHVzZWQgYnJpZWZseSB3aGlsZSBkYXRhIGlzIGJlaW5nIGJvdW5kLiAoSXQgaXMgcG9zc2libGUgdG9cbi8vIGNhdXNlIHRoZSBkYXRhIHRvIGNoYW5nZSB3aGlsZSBpdGVyYXRpbmcgYnkgdXNpbmcgYSBrZXkgZnVuY3Rpb24sIGJ1dCBwbGVhc2Vcbi8vIGRvbuKAmXQ7IHdl4oCZZCByYXRoZXIgYXZvaWQgYSBncmF0dWl0b3VzIGNvcHkuKVxuZnVuY3Rpb24gYXJyYXlsaWtlKGRhdGEpIHtcbiAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gZGF0YVxuICAgID8gZGF0YSAvLyBBcnJheSwgVHlwZWRBcnJheSwgTm9kZUxpc3QsIGFycmF5LWxpa2VcbiAgICA6IEFycmF5LmZyb20oZGF0YSk7IC8vIE1hcCwgU2V0LCBpdGVyYWJsZSwgc3RyaW5nLCBvciBhbnl0aGluZyBlbHNlXG59XG4iLCJpbXBvcnQgc3BhcnNlIGZyb20gXCIuL3NwYXJzZS5qc1wiO1xuaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9leGl0IHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvbmVudGVyLCBvbnVwZGF0ZSwgb25leGl0KSB7XG4gIHZhciBlbnRlciA9IHRoaXMuZW50ZXIoKSwgdXBkYXRlID0gdGhpcywgZXhpdCA9IHRoaXMuZXhpdCgpO1xuICBpZiAodHlwZW9mIG9uZW50ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGVudGVyID0gb25lbnRlcihlbnRlcik7XG4gICAgaWYgKGVudGVyKSBlbnRlciA9IGVudGVyLnNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIGVudGVyID0gZW50ZXIuYXBwZW5kKG9uZW50ZXIgKyBcIlwiKTtcbiAgfVxuICBpZiAob251cGRhdGUgIT0gbnVsbCkge1xuICAgIHVwZGF0ZSA9IG9udXBkYXRlKHVwZGF0ZSk7XG4gICAgaWYgKHVwZGF0ZSkgdXBkYXRlID0gdXBkYXRlLnNlbGVjdGlvbigpO1xuICB9XG4gIGlmIChvbmV4aXQgPT0gbnVsbCkgZXhpdC5yZW1vdmUoKTsgZWxzZSBvbmV4aXQoZXhpdCk7XG4gIHJldHVybiBlbnRlciAmJiB1cGRhdGUgPyBlbnRlci5tZXJnZSh1cGRhdGUpLm9yZGVyKCkgOiB1cGRhdGU7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCkge1xuICB2YXIgc2VsZWN0aW9uID0gY29udGV4dC5zZWxlY3Rpb24gPyBjb250ZXh0LnNlbGVjdGlvbigpIDogY29udGV4dDtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gc2VsZWN0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAtMSwgbSA9IGdyb3Vwcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5leHQpIF4gNCkgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KTtcbiAgICAgICAgbmV4dCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29tcGFyZSkge1xuICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgZnVuY3Rpb24gY29tcGFyZU5vZGUoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBjb21wYXJlKGEuX19kYXRhX18sIGIuX19kYXRhX18pIDogIWEgLSAhYjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHNvcnRncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHNvcnRncm91cCA9IHNvcnRncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNvcnRncm91cFtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRncm91cC5zb3J0KGNvbXBhcmVOb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHNvcnRncm91cHMsIHRoaXMuX3BhcmVudHMpLm9yZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gIGFyZ3VtZW50c1swXSA9IHRoaXM7XG4gIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgbGV0IHNpemUgPSAwO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcykgKytzaXplOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiBzaXplO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5ub2RlKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSBjYWxsYmFjay5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4uL25hbWVzcGFjZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHYpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUoKTtcbiAgICByZXR1cm4gZnVsbG5hbWUubG9jYWxcbiAgICAgICAgPyBub2RlLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbClcbiAgICAgICAgOiBub2RlLmdldEF0dHJpYnV0ZShmdWxsbmFtZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkpKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLm93bmVyRG9jdW1lbnQgJiYgbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSAvLyBub2RlIGlzIGEgTm9kZVxuICAgICAgfHwgKG5vZGUuZG9jdW1lbnQgJiYgbm9kZSkgLy8gbm9kZSBpcyBhIFdpbmRvd1xuICAgICAgfHwgbm9kZS5kZWZhdWx0VmlldzsgLy8gbm9kZSBpcyBhIERvY3VtZW50XG59XG4iLCJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHYsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICAgID8gc3R5bGVSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyBzdHlsZUZ1bmN0aW9uXG4gICAgICAgICAgICA6IHN0eWxlQ29uc3RhbnQpKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSlcbiAgICAgIDogc3R5bGVWYWx1ZSh0aGlzLm5vZGUoKSwgbmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVZhbHVlKG5vZGUsIG5hbWUpIHtcbiAgcmV0dXJuIG5vZGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKVxuICAgICAgfHwgZGVmYXVsdFZpZXcobm9kZSkuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xufVxuIiwiZnVuY3Rpb24gcHJvcGVydHlSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5Q29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbbmFtZV0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIGRlbGV0ZSB0aGlzW25hbWVdO1xuICAgIGVsc2UgdGhpc1tuYW1lXSA9IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IHByb3BlcnR5UmVtb3ZlIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHByb3BlcnR5RnVuY3Rpb25cbiAgICAgICAgICA6IHByb3BlcnR5Q29uc3RhbnQpKG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKClbbmFtZV07XG59XG4iLCJmdW5jdGlvbiBjbGFzc0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRyaW0oKS5zcGxpdCgvXnxcXHMrLyk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzTGlzdChub2RlKSB7XG4gIHJldHVybiBub2RlLmNsYXNzTGlzdCB8fCBuZXcgQ2xhc3NMaXN0KG5vZGUpO1xufVxuXG5mdW5jdGlvbiBDbGFzc0xpc3Qobm9kZSkge1xuICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgdGhpcy5fbmFtZXMgPSBjbGFzc0FycmF5KG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIik7XG59XG5cbkNsYXNzTGlzdC5wcm90b3R5cGUgPSB7XG4gIGFkZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLl9uYW1lcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIGNvbnRhaW5zOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSkgPj0gMDtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xhc3NlZEFkZChub2RlLCBuYW1lcykge1xuICB2YXIgbGlzdCA9IGNsYXNzTGlzdChub2RlKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbGlzdC5hZGQobmFtZXNbaV0pO1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkUmVtb3ZlKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LnJlbW92ZShuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRUcnVlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkQWRkKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZhbHNlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkUmVtb3ZlKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZ1bmN0aW9uKG5hbWVzLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgKHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBjbGFzc2VkQWRkIDogY2xhc3NlZFJlbW92ZSkodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgbmFtZXMgPSBjbGFzc0FycmF5KG5hbWUgKyBcIlwiKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbGlzdCA9IGNsYXNzTGlzdCh0aGlzLm5vZGUoKSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFsaXN0LmNvbnRhaW5zKG5hbWVzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gY2xhc3NlZEZ1bmN0aW9uIDogdmFsdWVcbiAgICAgID8gY2xhc3NlZFRydWVcbiAgICAgIDogY2xhc3NlZEZhbHNlKShuYW1lcywgdmFsdWUpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRSZW1vdmUoKSB7XG4gIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gdGV4dFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gdGV4dEZ1bmN0aW9uXG4gICAgICAgICAgOiB0ZXh0Q29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkudGV4dENvbnRlbnQ7XG59XG4iLCJmdW5jdGlvbiBodG1sUmVtb3ZlKCkge1xuICB0aGlzLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGh0bWxDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaHRtbEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2ID09IG51bGwgPyBcIlwiIDogdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IGh0bWxSZW1vdmUgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGh0bWxGdW5jdGlvblxuICAgICAgICAgIDogaHRtbENvbnN0YW50KSh2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpLmlubmVySFRNTDtcbn1cbiIsImZ1bmN0aW9uIHJhaXNlKCkge1xuICBpZiAodGhpcy5uZXh0U2libGluZykgdGhpcy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyYWlzZSk7XG59XG4iLCJmdW5jdGlvbiBsb3dlcigpIHtcbiAgaWYgKHRoaXMucHJldmlvdXNTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gobG93ZXIpO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgY3JlYXRlID0gdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUgOiBjcmVhdG9yKG5hbWUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kQ2hpbGQoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9KTtcbn1cbiIsImltcG9ydCBjcmVhdG9yIGZyb20gXCIuLi9jcmVhdG9yLmpzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yLmpzXCI7XG5cbmZ1bmN0aW9uIGNvbnN0YW50TnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIGJlZm9yZSkge1xuICB2YXIgY3JlYXRlID0gdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUgOiBjcmVhdG9yKG5hbWUpLFxuICAgICAgc2VsZWN0ID0gYmVmb3JlID09IG51bGwgPyBjb25zdGFudE51bGwgOiB0eXBlb2YgYmVmb3JlID09PSBcImZ1bmN0aW9uXCIgPyBiZWZvcmUgOiBzZWxlY3RvcihiZWZvcmUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKGNyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBzZWxlY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJmdW5jdGlvbiByZW1vdmUoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gocmVtb3ZlKTtcbn1cbiIsImZ1bmN0aW9uIHNlbGVjdGlvbl9jbG9uZVNoYWxsb3coKSB7XG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKGZhbHNlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lRGVlcCgpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUodHJ1ZSksIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRoaXMubmV4dFNpYmxpbmcpIDogY2xvbmU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRlZXApIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGRlZXAgPyBzZWxlY3Rpb25fY2xvbmVEZWVwIDogc2VsZWN0aW9uX2Nsb25lU2hhbGxvdyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLnByb3BlcnR5KFwiX19kYXRhX19cIiwgdmFsdWUpXG4gICAgICA6IHRoaXMubm9kZSgpLl9fZGF0YV9fO1xufVxuIiwiZnVuY3Rpb24gY29udGV4dExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQsIHRoaXMuX19kYXRhX18pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZSh0eXBlbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uO1xuICAgIGlmICghb24pIHJldHVybjtcbiAgICBmb3IgKHZhciBqID0gMCwgaSA9IC0xLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAobyA9IG9uW2pdLCAoIXR5cGVuYW1lLnR5cGUgfHwgby50eXBlID09PSB0eXBlbmFtZS50eXBlKSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uWysraV0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKytpKSBvbi5sZW5ndGggPSBpO1xuICAgIGVsc2UgZGVsZXRlIHRoaXMuX19vbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25BZGQodHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb24sIG8sIGxpc3RlbmVyID0gY29udGV4dExpc3RlbmVyKHZhbHVlKTtcbiAgICBpZiAob24pIGZvciAodmFyIGogPSAwLCBtID0gb24ubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAoKG8gPSBvbltqXSkudHlwZSA9PT0gdHlwZW5hbWUudHlwZSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciA9IGxpc3RlbmVyLCBvLm9wdGlvbnMgPSBvcHRpb25zKTtcbiAgICAgICAgby52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlbmFtZS50eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgbyA9IHt0eXBlOiB0eXBlbmFtZS50eXBlLCBuYW1lOiB0eXBlbmFtZS5uYW1lLCB2YWx1ZTogdmFsdWUsIGxpc3RlbmVyOiBsaXN0ZW5lciwgb3B0aW9uczogb3B0aW9uc307XG4gICAgaWYgKCFvbikgdGhpcy5fX29uID0gW29dO1xuICAgIGVsc2Ugb24ucHVzaChvKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlbmFtZXMgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIpLCBpLCBuID0gdHlwZW5hbWVzLmxlbmd0aCwgdDtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgb24gPSB0aGlzLm5vZGUoKS5fX29uO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGZvciAoaSA9IDAsIG8gPSBvbltqXTsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAoKHQgPSB0eXBlbmFtZXNbaV0pLnR5cGUgPT09IG8udHlwZSAmJiB0Lm5hbWUgPT09IG8ubmFtZSkge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uID0gdmFsdWUgPyBvbkFkZCA6IG9uUmVtb3ZlO1xuICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB0aGlzLmVhY2gob24odHlwZW5hbWVzW2ldLCB2YWx1ZSwgb3B0aW9ucykpO1xuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobm9kZSwgdHlwZSwgcGFyYW1zKSB7XG4gIHZhciB3aW5kb3cgPSBkZWZhdWx0Vmlldyhub2RlKSxcbiAgICAgIGV2ZW50ID0gd2luZG93LkN1c3RvbUV2ZW50O1xuXG4gIGlmICh0eXBlb2YgZXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50ID0gbmV3IGV2ZW50KHR5cGUsIHBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgICBpZiAocGFyYW1zKSBldmVudC5pbml0RXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlKSwgZXZlbnQuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgICBlbHNlIGV2ZW50LmluaXRFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hDb25zdGFudCh0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgcGFyYW1zID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gZGlzcGF0Y2hGdW5jdGlvblxuICAgICAgOiBkaXNwYXRjaENvbnN0YW50KSh0eXBlLCBwYXJhbXMpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKigpIHtcbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHlpZWxkIG5vZGU7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgc2VsZWN0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCBmcm9tIFwiLi9zZWxlY3RDaGlsZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiBmcm9tIFwiLi9zZWxlY3RDaGlsZHJlbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdGEgZnJvbSBcIi4vZGF0YS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbnRlciBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9leGl0IGZyb20gXCIuL2V4aXQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fam9pbiBmcm9tIFwiLi9qb2luLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29yZGVyIGZyb20gXCIuL29yZGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NvcnQgZnJvbSBcIi4vc29ydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jYWxsIGZyb20gXCIuL2NhbGwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZXMgZnJvbSBcIi4vbm9kZXMuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZSBmcm9tIFwiLi9ub2RlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NpemUgZnJvbSBcIi4vc2l6ZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbXB0eSBmcm9tIFwiLi9lbXB0eS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lYWNoIGZyb20gXCIuL2VhY2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3Byb3BlcnR5IGZyb20gXCIuL3Byb3BlcnR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NsYXNzZWQgZnJvbSBcIi4vY2xhc3NlZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faHRtbCBmcm9tIFwiLi9odG1sLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JhaXNlIGZyb20gXCIuL3JhaXNlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2xvd2VyIGZyb20gXCIuL2xvd2VyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2FwcGVuZCBmcm9tIFwiLi9hcHBlbmQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faW5zZXJ0IGZyb20gXCIuL2luc2VydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Nsb25lIGZyb20gXCIuL2Nsb25lLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdHVtIGZyb20gXCIuL2RhdHVtLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Rpc3BhdGNoIGZyb20gXCIuL2Rpc3BhdGNoLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2l0ZXJhdG9yIGZyb20gXCIuL2l0ZXJhdG9yLmpzXCI7XG5cbmV4cG9ydCB2YXIgcm9vdCA9IFtudWxsXTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdGlvbihncm91cHMsIHBhcmVudHMpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF1dLCByb290KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uX3NlbGVjdGlvbigpIHtcbiAgcmV0dXJuIHRoaXM7XG59XG5cblNlbGVjdGlvbi5wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogU2VsZWN0aW9uLFxuICBzZWxlY3Q6IHNlbGVjdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogc2VsZWN0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbixcbiAgZmlsdGVyOiBzZWxlY3Rpb25fZmlsdGVyLFxuICBkYXRhOiBzZWxlY3Rpb25fZGF0YSxcbiAgZW50ZXI6IHNlbGVjdGlvbl9lbnRlcixcbiAgZXhpdDogc2VsZWN0aW9uX2V4aXQsXG4gIGpvaW46IHNlbGVjdGlvbl9qb2luLFxuICBtZXJnZTogc2VsZWN0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHNlbGVjdGlvbl9zZWxlY3Rpb24sXG4gIG9yZGVyOiBzZWxlY3Rpb25fb3JkZXIsXG4gIHNvcnQ6IHNlbGVjdGlvbl9zb3J0LFxuICBjYWxsOiBzZWxlY3Rpb25fY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9ub2RlcyxcbiAgbm9kZTogc2VsZWN0aW9uX25vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX2VtcHR5LFxuICBlYWNoOiBzZWxlY3Rpb25fZWFjaCxcbiAgYXR0cjogc2VsZWN0aW9uX2F0dHIsXG4gIHN0eWxlOiBzZWxlY3Rpb25fc3R5bGUsXG4gIHByb3BlcnR5OiBzZWxlY3Rpb25fcHJvcGVydHksXG4gIGNsYXNzZWQ6IHNlbGVjdGlvbl9jbGFzc2VkLFxuICB0ZXh0OiBzZWxlY3Rpb25fdGV4dCxcbiAgaHRtbDogc2VsZWN0aW9uX2h0bWwsXG4gIHJhaXNlOiBzZWxlY3Rpb25fcmFpc2UsXG4gIGxvd2VyOiBzZWxlY3Rpb25fbG93ZXIsXG4gIGFwcGVuZDogc2VsZWN0aW9uX2FwcGVuZCxcbiAgaW5zZXJ0OiBzZWxlY3Rpb25faW5zZXJ0LFxuICByZW1vdmU6IHNlbGVjdGlvbl9yZW1vdmUsXG4gIGNsb25lOiBzZWxlY3Rpb25fY2xvbmUsXG4gIGRhdHVtOiBzZWxlY3Rpb25fZGF0dW0sXG4gIG9uOiBzZWxlY3Rpb25fb24sXG4gIGRpc3BhdGNoOiBzZWxlY3Rpb25fZGlzcGF0Y2gsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25faXRlcmF0b3Jcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlvbjtcbiIsImltcG9ydCB7U2VsZWN0aW9uLCByb290fSBmcm9tIFwiLi9zZWxlY3Rpb24vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcildXSwgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF0pXG4gICAgICA6IG5ldyBTZWxlY3Rpb24oW1tzZWxlY3Rvcl1dLCByb290KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb2xvcigpIHt9XG5cbmV4cG9ydCB2YXIgZGFya2VyID0gMC43O1xuZXhwb3J0IHZhciBicmlnaHRlciA9IDEgLyBkYXJrZXI7XG5cbnZhciByZUkgPSBcIlxcXFxzKihbKy1dP1xcXFxkKylcXFxccypcIixcbiAgICByZU4gPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPyklXFxcXHMqXCIsXG4gICAgcmVIZXggPSAvXiMoWzAtOWEtZl17Myw4fSkkLyxcbiAgICByZVJnYkludGVnZXIgPSBuZXcgUmVnRXhwKGBecmdiXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfVxcXFwpJGApLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVSZ2JhSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JhXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfSwke3JlTn1cXFxcKSRgKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlSHNsUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xhXFxcXCgke3JlTn0sJHtyZVB9LCR7cmVQfSwke3JlTn1cXFxcKSRgKTtcblxudmFyIG5hbWVkID0ge1xuICBhbGljZWJsdWU6IDB4ZjBmOGZmLFxuICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICBhcXVhOiAweDAwZmZmZixcbiAgYXF1YW1hcmluZTogMHg3ZmZmZDQsXG4gIGF6dXJlOiAweGYwZmZmZixcbiAgYmVpZ2U6IDB4ZjVmNWRjLFxuICBiaXNxdWU6IDB4ZmZlNGM0LFxuICBibGFjazogMHgwMDAwMDAsXG4gIGJsYW5jaGVkYWxtb25kOiAweGZmZWJjZCxcbiAgYmx1ZTogMHgwMDAwZmYsXG4gIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICBicm93bjogMHhhNTJhMmEsXG4gIGJ1cmx5d29vZDogMHhkZWI4ODcsXG4gIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gIGNoYXJ0cmV1c2U6IDB4N2ZmZjAwLFxuICBjaG9jb2xhdGU6IDB4ZDI2OTFlLFxuICBjb3JhbDogMHhmZjdmNTAsXG4gIGNvcm5mbG93ZXJibHVlOiAweDY0OTVlZCxcbiAgY29ybnNpbGs6IDB4ZmZmOGRjLFxuICBjcmltc29uOiAweGRjMTQzYyxcbiAgY3lhbjogMHgwMGZmZmYsXG4gIGRhcmtibHVlOiAweDAwMDA4YixcbiAgZGFya2N5YW46IDB4MDA4YjhiLFxuICBkYXJrZ29sZGVucm9kOiAweGI4ODYwYixcbiAgZGFya2dyYXk6IDB4YTlhOWE5LFxuICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICBkYXJrZ3JleTogMHhhOWE5YTksXG4gIGRhcmtraGFraTogMHhiZGI3NmIsXG4gIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgZGFya29saXZlZ3JlZW46IDB4NTU2YjJmLFxuICBkYXJrb3JhbmdlOiAweGZmOGMwMCxcbiAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gIGRhcmtyZWQ6IDB4OGIwMDAwLFxuICBkYXJrc2FsbW9uOiAweGU5OTY3YSxcbiAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgZGFya3NsYXRlYmx1ZTogMHg0ODNkOGIsXG4gIGRhcmtzbGF0ZWdyYXk6IDB4MmY0ZjRmLFxuICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgZGFya3R1cnF1b2lzZTogMHgwMGNlZDEsXG4gIGRhcmt2aW9sZXQ6IDB4OTQwMGQzLFxuICBkZWVwcGluazogMHhmZjE0OTMsXG4gIGRlZXBza3libHVlOiAweDAwYmZmZixcbiAgZGltZ3JheTogMHg2OTY5NjksXG4gIGRpbWdyZXk6IDB4Njk2OTY5LFxuICBkb2RnZXJibHVlOiAweDFlOTBmZixcbiAgZmlyZWJyaWNrOiAweGIyMjIyMixcbiAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICBmb3Jlc3RncmVlbjogMHgyMjhiMjIsXG4gIGZ1Y2hzaWE6IDB4ZmYwMGZmLFxuICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICBnaG9zdHdoaXRlOiAweGY4ZjhmZixcbiAgZ29sZDogMHhmZmQ3MDAsXG4gIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gIGdyYXk6IDB4ODA4MDgwLFxuICBncmVlbjogMHgwMDgwMDAsXG4gIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgZ3JleTogMHg4MDgwODAsXG4gIGhvbmV5ZGV3OiAweGYwZmZmMCxcbiAgaG90cGluazogMHhmZjY5YjQsXG4gIGluZGlhbnJlZDogMHhjZDVjNWMsXG4gIGluZGlnbzogMHg0YjAwODIsXG4gIGl2b3J5OiAweGZmZmZmMCxcbiAga2hha2k6IDB4ZjBlNjhjLFxuICBsYXZlbmRlcjogMHhlNmU2ZmEsXG4gIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICBsYXduZ3JlZW46IDB4N2NmYzAwLFxuICBsZW1vbmNoaWZmb246IDB4ZmZmYWNkLFxuICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICBsaWdodGNvcmFsOiAweGYwODA4MCxcbiAgbGlnaHRjeWFuOiAweGUwZmZmZixcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICBsaWdodGdyYXk6IDB4ZDNkM2QzLFxuICBsaWdodGdyZWVuOiAweDkwZWU5MCxcbiAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgbGlnaHRwaW5rOiAweGZmYjZjMSxcbiAgbGlnaHRzYWxtb246IDB4ZmZhMDdhLFxuICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgbGlnaHRza3libHVlOiAweDg3Y2VmYSxcbiAgbGlnaHRzbGF0ZWdyYXk6IDB4Nzc4ODk5LFxuICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gIGxpZ2h0c3RlZWxibHVlOiAweGIwYzRkZSxcbiAgbGlnaHR5ZWxsb3c6IDB4ZmZmZmUwLFxuICBsaW1lOiAweDAwZmYwMCxcbiAgbGltZWdyZWVuOiAweDMyY2QzMixcbiAgbGluZW46IDB4ZmFmMGU2LFxuICBtYWdlbnRhOiAweGZmMDBmZixcbiAgbWFyb29uOiAweDgwMDAwMCxcbiAgbWVkaXVtYXF1YW1hcmluZTogMHg2NmNkYWEsXG4gIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICBtZWRpdW1vcmNoaWQ6IDB4YmE1NWQzLFxuICBtZWRpdW1wdXJwbGU6IDB4OTM3MGRiLFxuICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gIG1lZGl1bXNsYXRlYmx1ZTogMHg3YjY4ZWUsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiAweDAwZmE5YSxcbiAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgbWVkaXVtdmlvbGV0cmVkOiAweGM3MTU4NSxcbiAgbWlkbmlnaHRibHVlOiAweDE5MTk3MCxcbiAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgbWlzdHlyb3NlOiAweGZmZTRlMSxcbiAgbW9jY2FzaW46IDB4ZmZlNGI1LFxuICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gIG5hdnk6IDB4MDAwMDgwLFxuICBvbGRsYWNlOiAweGZkZjVlNixcbiAgb2xpdmU6IDB4ODA4MDAwLFxuICBvbGl2ZWRyYWI6IDB4NmI4ZTIzLFxuICBvcmFuZ2U6IDB4ZmZhNTAwLFxuICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICBvcmNoaWQ6IDB4ZGE3MGQ2LFxuICBwYWxlZ29sZGVucm9kOiAweGVlZThhYSxcbiAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgcGFsZXR1cnF1b2lzZTogMHhhZmVlZWUsXG4gIHBhbGV2aW9sZXRyZWQ6IDB4ZGI3MDkzLFxuICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgcGVhY2hwdWZmOiAweGZmZGFiOSxcbiAgcGVydTogMHhjZDg1M2YsXG4gIHBpbms6IDB4ZmZjMGNiLFxuICBwbHVtOiAweGRkYTBkZCxcbiAgcG93ZGVyYmx1ZTogMHhiMGUwZTYsXG4gIHB1cnBsZTogMHg4MDAwODAsXG4gIHJlYmVjY2FwdXJwbGU6IDB4NjYzMzk5LFxuICByZWQ6IDB4ZmYwMDAwLFxuICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICByb3lhbGJsdWU6IDB4NDE2OWUxLFxuICBzYWRkbGVicm93bjogMHg4YjQ1MTMsXG4gIHNhbG1vbjogMHhmYTgwNzIsXG4gIHNhbmR5YnJvd246IDB4ZjRhNDYwLFxuICBzZWFncmVlbjogMHgyZThiNTcsXG4gIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgc2llbm5hOiAweGEwNTIyZCxcbiAgc2lsdmVyOiAweGMwYzBjMCxcbiAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gIHNsYXRlYmx1ZTogMHg2YTVhY2QsXG4gIHNsYXRlZ3JheTogMHg3MDgwOTAsXG4gIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gIHNub3c6IDB4ZmZmYWZhLFxuICBzcHJpbmdncmVlbjogMHgwMGZmN2YsXG4gIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gIHRhbjogMHhkMmI0OGMsXG4gIHRlYWw6IDB4MDA4MDgwLFxuICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgdG9tYXRvOiAweGZmNjM0NyxcbiAgdHVycXVvaXNlOiAweDQwZTBkMCxcbiAgdmlvbGV0OiAweGVlODJlZSxcbiAgd2hlYXQ6IDB4ZjVkZWIzLFxuICB3aGl0ZTogMHhmZmZmZmYsXG4gIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICB5ZWxsb3c6IDB4ZmZmZjAwLFxuICB5ZWxsb3dncmVlbjogMHg5YWNkMzJcbn07XG5cbmRlZmluZShDb2xvciwgY29sb3IsIHtcbiAgY29weShjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnJnYigpLmRpc3BsYXlhYmxlKCk7XG4gIH0sXG4gIGhleDogY29sb3JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IGNvbG9yX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogY29sb3JfZm9ybWF0SGV4OCxcbiAgZm9ybWF0SHNsOiBjb2xvcl9mb3JtYXRIc2wsXG4gIGZvcm1hdFJnYjogY29sb3JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogY29sb3JfZm9ybWF0UmdiXG59KTtcblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXgoKTtcbn1cblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4OCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4OCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIc2woKSB7XG4gIHJldHVybiBoc2xDb252ZXJ0KHRoaXMpLmZvcm1hdEhzbCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRSZ2IoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdFJnYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgdmFyIG0sIGw7XG4gIGZvcm1hdCA9IChmb3JtYXQgKyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChtID0gcmVIZXguZXhlYyhmb3JtYXQpKSA/IChsID0gbVsxXS5sZW5ndGgsIG0gPSBwYXJzZUludChtWzFdLCAxNiksIGwgPT09IDYgPyByZ2JuKG0pIC8vICNmZjAwMDBcbiAgICAgIDogbCA9PT0gMyA/IG5ldyBSZ2IoKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkgLy8gI2YwMFxuICAgICAgOiBsID09PSA4ID8gcmdiYShtID4+IDI0ICYgMHhmZiwgbSA+PiAxNiAmIDB4ZmYsIG0gPj4gOCAmIDB4ZmYsIChtICYgMHhmZikgLyAweGZmKSAvLyAjZmYwMDAwMDBcbiAgICAgIDogbCA9PT0gNCA/IHJnYmEoKG0gPj4gMTIgJiAweGYpIHwgKG0gPj4gOCAmIDB4ZjApLCAobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSkgLyAweGZmKSAvLyAjZjAwMFxuICAgICAgOiBudWxsKSAvLyBpbnZhbGlkIGhleFxuICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgOiAobSA9IHJlUmdiUGVyY2VudC5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCAxKSAvLyByZ2IoMTAwJSwgMCUsIDAlKVxuICAgICAgOiAobSA9IHJlUmdiYUludGVnZXIuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSwgbVsyXSwgbVszXSwgbVs0XSkgLy8gcmdiYSgyNTUsIDAsIDAsIDEpXG4gICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgOiAobSA9IHJlSHNsUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCAxKSAvLyBoc2woMTIwLCA1MCUsIDUwJSlcbiAgICAgIDogKG0gPSByZUhzbGFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIG1bNF0pIC8vIGhzbGEoMTIwLCA1MCUsIDUwJSwgMSlcbiAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIDogZm9ybWF0ID09PSBcInRyYW5zcGFyZW50XCIgPyBuZXcgUmdiKE5hTiwgTmFOLCBOYU4sIDApXG4gICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJnYm4obikge1xuICByZXR1cm4gbmV3IFJnYihuID4+IDE2ICYgMHhmZiwgbiA+PiA4ICYgMHhmZiwgbiAmIDB4ZmYsIDEpO1xufVxuXG5mdW5jdGlvbiByZ2JhKHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPD0gMCkgciA9IGcgPSBiID0gTmFOO1xuICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBSZ2I7XG4gIG8gPSBvLnJnYigpO1xuICByZXR1cm4gbmV3IFJnYihvLnIsIG8uZywgby5iLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByZ2JDb252ZXJ0KHIpIDogbmV3IFJnYihyLCBnLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICB0aGlzLnIgPSArcjtcbiAgdGhpcy5nID0gK2c7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKFJnYiwgcmdiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBSZ2IoY2xhbXBpKHRoaXMuciksIGNsYW1waSh0aGlzLmcpLCBjbGFtcGkodGhpcy5iKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKC0wLjUgPD0gdGhpcy5yICYmIHRoaXMuciA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmcgJiYgdGhpcy5nIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuYiAmJiB0aGlzLmIgPCAyNTUuNSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgaGV4OiByZ2JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IHJnYl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhleDg6IHJnYl9mb3JtYXRIZXg4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gYCMke2hleCh0aGlzLnIpfSR7aGV4KHRoaXMuZyl9JHtoZXgodGhpcy5iKX0ke2hleCgoaXNOYU4odGhpcy5vcGFjaXR5KSA/IDEgOiB0aGlzLm9wYWNpdHkpICogMjU1KX1gO1xufVxuXG5mdW5jdGlvbiByZ2JfZm9ybWF0UmdiKCkge1xuICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gIHJldHVybiBgJHthID09PSAxID8gXCJyZ2IoXCIgOiBcInJnYmEoXCJ9JHtjbGFtcGkodGhpcy5yKX0sICR7Y2xhbXBpKHRoaXMuZyl9LCAke2NsYW1waSh0aGlzLmIpfSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG59XG5cbmZ1bmN0aW9uIGNsYW1wYShvcGFjaXR5KSB7XG4gIHJldHVybiBpc05hTihvcGFjaXR5KSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBvcGFjaXR5KSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1waSh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG59XG5cbmZ1bmN0aW9uIGhleCh2YWx1ZSkge1xuICB2YWx1ZSA9IGNsYW1waSh2YWx1ZSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGNsYW1wKCkge1xuICAgIHJldHVybiBuZXcgSHNsKGNsYW1waCh0aGlzLmgpLCBjbGFtcHQodGhpcy5zKSwgY2xhbXB0KHRoaXMubCksIGNsYW1wYSh0aGlzLm9wYWNpdHkpKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLmwgJiYgdGhpcy5sIDw9IDEpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGZvcm1hdEhzbCgpIHtcbiAgICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gICAgcmV0dXJuIGAke2EgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIn0ke2NsYW1waCh0aGlzLmgpfSwgJHtjbGFtcHQodGhpcy5zKSAqIDEwMH0lLCAke2NsYW1wdCh0aGlzLmwpICogMTAwfSUke2EgPT09IDEgPyBcIilcIiA6IGAsICR7YX0pYH1gO1xuICB9XG59KSk7XG5cbmZ1bmN0aW9uIGNsYW1waCh2YWx1ZSkge1xuICB2YWx1ZSA9ICh2YWx1ZSB8fCAwKSAlIDM2MDtcbiAgcmV0dXJuIHZhbHVlIDwgMCA/IHZhbHVlICsgMzYwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNsYW1wdCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdmFsdWUgfHwgMCkpO1xufVxuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB4ID0+ICgpID0+IHg7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdDtcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2csXG4gICAgcmVCID0gbmV3IFJlZ0V4cChyZUEuc291cmNlLCBcImdcIik7XG5cbmZ1bmN0aW9uIHplcm8oYikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uZShiKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGIodCkgKyBcIlwiO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBiaSA9IHJlQS5sYXN0SW5kZXggPSByZUIubGFzdEluZGV4ID0gMCwgLy8gc2NhbiBpbmRleCBmb3IgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgYm0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYlxuICAgICAgYnMsIC8vIHN0cmluZyBwcmVjZWRpbmcgY3VycmVudCBudW1iZXIgaW4gYiwgaWYgYW55XG4gICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG5cbiAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcblxuICAvLyBJbnRlcnBvbGF0ZSBwYWlycyBvZiBudW1iZXJzIGluIGEgJiBiLlxuICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAmJiAoYm0gPSByZUIuZXhlYyhiKSkpIHtcbiAgICBpZiAoKGJzID0gYm0uaW5kZXgpID4gYmkpIHsgLy8gYSBzdHJpbmcgcHJlY2VkZXMgdGhlIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJzO1xuICAgIH1cbiAgICBpZiAoKGFtID0gYW1bMF0pID09PSAoYm0gPSBibVswXSkpIHsgLy8gbnVtYmVycyBpbiBhICYgYiBtYXRjaFxuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYm07IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgIH0gZWxzZSB7IC8vIGludGVycG9sYXRlIG5vbi1tYXRjaGluZyBudW1iZXJzXG4gICAgICBzWysraV0gPSBudWxsO1xuICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgIH1cbiAgICBiaSA9IHJlQi5sYXN0SW5kZXg7XG4gIH1cblxuICAvLyBBZGQgcmVtYWlucyBvZiBiLlxuICBpZiAoYmkgPCBiLmxlbmd0aCkge1xuICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgZWxzZSBzWysraV0gPSBicztcbiAgfVxuXG4gIC8vIFNwZWNpYWwgb3B0aW1pemF0aW9uIGZvciBvbmx5IGEgc2luZ2xlIG1hdGNoLlxuICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIGVhY2ggb2YgdGhlIG51bWJlcnMgYW5kIHJlam9pbiB0aGUgc3RyaW5nLlxuICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgID8gb25lKHFbMF0ueClcbiAgICAgIDogemVybyhiKSlcbiAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBvOyBpIDwgYjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgICAgfSk7XG59XG4iLCJ2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSB7XG4gIHRyYW5zbGF0ZVg6IDAsXG4gIHRyYW5zbGF0ZVk6IDAsXG4gIHJvdGF0ZTogMCxcbiAgc2tld1g6IDAsXG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhciBzY2FsZVgsIHNjYWxlWSwgc2tld1g7XG4gIGlmIChzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYikpIGEgLz0gc2NhbGVYLCBiIC89IHNjYWxlWDtcbiAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICBpZiAoc2NhbGVZID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpKSBjIC89IHNjYWxlWSwgZCAvPSBzY2FsZVksIHNrZXdYIC89IHNjYWxlWTtcbiAgaWYgKGEgKiBkIDwgYiAqIGMpIGEgPSAtYSwgYiA9IC1iLCBza2V3WCA9IC1za2V3WCwgc2NhbGVYID0gLXNjYWxlWDtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGVYOiBlLFxuICAgIHRyYW5zbGF0ZVk6IGYsXG4gICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICBza2V3WDogTWF0aC5hdGFuKHNrZXdYKSAqIGRlZ3JlZXMsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cbiIsImltcG9ydCBkZWNvbXBvc2UsIHtpZGVudGl0eX0gZnJvbSBcIi4vZGVjb21wb3NlLmpzXCI7XG5cbnZhciBzdmdOb2RlO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGNvbnN0IG0gPSBuZXcgKHR5cGVvZiBET01NYXRyaXggPT09IFwiZnVuY3Rpb25cIiA/IERPTU1hdHJpeCA6IFdlYktpdENTU01hdHJpeCkodmFsdWUgKyBcIlwiKTtcbiAgcmV0dXJuIG0uaXNJZGVudGl0eSA/IGlkZW50aXR5IDogZGVjb21wb3NlKG0uYSwgbS5iLCBtLmMsIG0uZCwgbS5lLCBtLmYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdmcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFzdmdOb2RlKSBzdmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuICBzdmdOb2RlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB2YWx1ZSk7XG4gIGlmICghKHZhbHVlID0gc3ZnTm9kZS50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpKSkgcmV0dXJuIGlkZW50aXR5O1xuICB2YWx1ZSA9IHZhbHVlLm1hdHJpeDtcbiAgcmV0dXJuIGRlY29tcG9zZSh2YWx1ZS5hLCB2YWx1ZS5iLCB2YWx1ZS5jLCB2YWx1ZS5kLCB2YWx1ZS5lLCB2YWx1ZS5mKTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlci5qc1wiO1xuaW1wb3J0IHtwYXJzZUNzcywgcGFyc2VTdmd9IGZyb20gXCIuL3BhcnNlLmpzXCI7XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlLCBweENvbW1hLCBweFBhcmVuLCBkZWdQYXJlbikge1xuXG4gIGZ1bmN0aW9uIHBvcChzKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoID8gcy5wb3AoKSArIFwiIFwiIDogXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChcInRyYW5zbGF0ZShcIiwgbnVsbCwgcHhDb21tYSwgbnVsbCwgcHhQYXJlbik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiIHx8IHliKSB7XG4gICAgICBzLnB1c2goXCJ0cmFuc2xhdGUoXCIgKyB4YiArIHB4Q29tbWEgKyB5YiArIHB4UGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJvdGF0ZShhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIGlmIChhIC0gYiA+IDE4MCkgYiArPSAzNjA7IGVsc2UgaWYgKGIgLSBhID4gMTgwKSBhICs9IDM2MDsgLy8gc2hvcnRlc3QgcGF0aFxuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBza2V3WChhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjYWxlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIsIG51bGwsIFwiLFwiLCBudWxsLCBcIilcIik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiICE9PSAxIHx8IHliICE9PSAxKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiArIHhiICsgXCIsXCIgKyB5YiArIFwiKVwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG4gICAgYSA9IHBhcnNlKGEpLCBiID0gcGFyc2UoYik7XG4gICAgdHJhbnNsYXRlKGEudHJhbnNsYXRlWCwgYS50cmFuc2xhdGVZLCBiLnRyYW5zbGF0ZVgsIGIudHJhbnNsYXRlWSwgcywgcSk7XG4gICAgcm90YXRlKGEucm90YXRlLCBiLnJvdGF0ZSwgcywgcSk7XG4gICAgc2tld1goYS5za2V3WCwgYi5za2V3WCwgcywgcSk7XG4gICAgc2NhbGUoYS5zY2FsZVgsIGEuc2NhbGVZLCBiLnNjYWxlWCwgYi5zY2FsZVksIHMsIHEpO1xuICAgIGEgPSBiID0gbnVsbDsgLy8gZ2NcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IHEubGVuZ3RoLCBvO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlQ3NzLCBcInB4LCBcIiwgXCJweClcIiwgXCJkZWcpXCIpO1xuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlU3ZnLCBcIiwgXCIsIFwiKVwiLCBcIilcIik7XG4iLCJ2YXIgZnJhbWUgPSAwLCAvLyBpcyBhbiBhbmltYXRpb24gZnJhbWUgcGVuZGluZz9cbiAgICB0aW1lb3V0ID0gMCwgLy8gaXMgYSB0aW1lb3V0IHBlbmRpbmc/XG4gICAgaW50ZXJ2YWwgPSAwLCAvLyBhcmUgYW55IHRpbWVycyBhY3RpdmU/XG4gICAgcG9rZURlbGF5ID0gMTAwMCwgLy8gaG93IGZyZXF1ZW50bHkgd2UgY2hlY2sgZm9yIGNsb2NrIHNrZXdcbiAgICB0YXNrSGVhZCxcbiAgICB0YXNrVGFpbCxcbiAgICBjbG9ja0xhc3QgPSAwLFxuICAgIGNsb2NrTm93ID0gMCxcbiAgICBjbG9ja1NrZXcgPSAwLFxuICAgIGNsb2NrID0gdHlwZW9mIHBlcmZvcm1hbmNlID09PSBcIm9iamVjdFwiICYmIHBlcmZvcm1hbmNlLm5vdyA/IHBlcmZvcm1hbmNlIDogRGF0ZSxcbiAgICBzZXRGcmFtZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpIDogZnVuY3Rpb24oZikgeyBzZXRUaW1lb3V0KGYsIDE3KTsgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIGNsb2NrTm93IHx8IChzZXRGcmFtZShjbGVhck5vdyksIGNsb2NrTm93ID0gY2xvY2subm93KCkgKyBjbG9ja1NrZXcpO1xufVxuXG5mdW5jdGlvbiBjbGVhck5vdygpIHtcbiAgY2xvY2tOb3cgPSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVGltZXIoKSB7XG4gIHRoaXMuX2NhbGwgPVxuICB0aGlzLl90aW1lID1cbiAgdGhpcy5fbmV4dCA9IG51bGw7XG59XG5cblRpbWVyLnByb3RvdHlwZSA9IHRpbWVyLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRpbWVyLFxuICByZXN0YXJ0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICB0aW1lID0gKHRpbWUgPT0gbnVsbCA/IG5vdygpIDogK3RpbWUpICsgKGRlbGF5ID09IG51bGwgPyAwIDogK2RlbGF5KTtcbiAgICBpZiAoIXRoaXMuX25leHQgJiYgdGFza1RhaWwgIT09IHRoaXMpIHtcbiAgICAgIGlmICh0YXNrVGFpbCkgdGFza1RhaWwuX25leHQgPSB0aGlzO1xuICAgICAgZWxzZSB0YXNrSGVhZCA9IHRoaXM7XG4gICAgICB0YXNrVGFpbCA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX2NhbGwgPSBjYWxsYmFjaztcbiAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICBzbGVlcCgpO1xuICB9LFxuICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY2FsbCkge1xuICAgICAgdGhpcy5fY2FsbCA9IG51bGw7XG4gICAgICB0aGlzLl90aW1lID0gSW5maW5pdHk7XG4gICAgICBzbGVlcCgpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgdC5yZXN0YXJ0KGNhbGxiYWNrLCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXJGbHVzaCgpIHtcbiAgbm93KCk7IC8vIEdldCB0aGUgY3VycmVudCB0aW1lLCBpZiBub3QgYWxyZWFkeSBzZXQuXG4gICsrZnJhbWU7IC8vIFByZXRlbmQgd2XigJl2ZSBzZXQgYW4gYWxhcm0sIGlmIHdlIGhhdmVu4oCZdCBhbHJlYWR5LlxuICB2YXIgdCA9IHRhc2tIZWFkLCBlO1xuICB3aGlsZSAodCkge1xuICAgIGlmICgoZSA9IGNsb2NrTm93IC0gdC5fdGltZSkgPj0gMCkgdC5fY2FsbC5jYWxsKHVuZGVmaW5lZCwgZSk7XG4gICAgdCA9IHQuX25leHQ7XG4gIH1cbiAgLS1mcmFtZTtcbn1cblxuZnVuY3Rpb24gd2FrZSgpIHtcbiAgY2xvY2tOb3cgPSAoY2xvY2tMYXN0ID0gY2xvY2subm93KCkpICsgY2xvY2tTa2V3O1xuICBmcmFtZSA9IHRpbWVvdXQgPSAwO1xuICB0cnkge1xuICAgIHRpbWVyRmx1c2goKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBmcmFtZSA9IDA7XG4gICAgbmFwKCk7XG4gICAgY2xvY2tOb3cgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBva2UoKSB7XG4gIHZhciBub3cgPSBjbG9jay5ub3coKSwgZGVsYXkgPSBub3cgLSBjbG9ja0xhc3Q7XG4gIGlmIChkZWxheSA+IHBva2VEZWxheSkgY2xvY2tTa2V3IC09IGRlbGF5LCBjbG9ja0xhc3QgPSBub3c7XG59XG5cbmZ1bmN0aW9uIG5hcCgpIHtcbiAgdmFyIHQwLCB0MSA9IHRhc2tIZWFkLCB0MiwgdGltZSA9IEluZmluaXR5O1xuICB3aGlsZSAodDEpIHtcbiAgICBpZiAodDEuX2NhbGwpIHtcbiAgICAgIGlmICh0aW1lID4gdDEuX3RpbWUpIHRpbWUgPSB0MS5fdGltZTtcbiAgICAgIHQwID0gdDEsIHQxID0gdDEuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQyID0gdDEuX25leHQsIHQxLl9uZXh0ID0gbnVsbDtcbiAgICAgIHQxID0gdDAgPyB0MC5fbmV4dCA9IHQyIDogdGFza0hlYWQgPSB0MjtcbiAgICB9XG4gIH1cbiAgdGFza1RhaWwgPSB0MDtcbiAgc2xlZXAodGltZSk7XG59XG5cbmZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgaWYgKGZyYW1lKSByZXR1cm47IC8vIFNvb25lc3QgYWxhcm0gYWxyZWFkeSBzZXQsIG9yIHdpbGwgYmUuXG4gIGlmICh0aW1lb3V0KSB0aW1lb3V0ID0gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB2YXIgZGVsYXkgPSB0aW1lIC0gY2xvY2tOb3c7IC8vIFN0cmljdGx5IGxlc3MgdGhhbiBpZiB3ZSByZWNvbXB1dGVkIGNsb2NrTm93LlxuICBpZiAoZGVsYXkgPiAyNCkge1xuICAgIGlmICh0aW1lIDwgSW5maW5pdHkpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHdha2UsIHRpbWUgLSBjbG9jay5ub3coKSAtIGNsb2NrU2tldyk7XG4gICAgaWYgKGludGVydmFsKSBpbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaW50ZXJ2YWwpIGNsb2NrTGFzdCA9IGNsb2NrLm5vdygpLCBpbnRlcnZhbCA9IHNldEludGVydmFsKHBva2UsIHBva2VEZWxheSk7XG4gICAgZnJhbWUgPSAxLCBzZXRGcmFtZSh3YWtlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtUaW1lcn0gZnJvbSBcIi4vdGltZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICBkZWxheSA9IGRlbGF5ID09IG51bGwgPyAwIDogK2RlbGF5O1xuICB0LnJlc3RhcnQoZWxhcHNlZCA9PiB7XG4gICAgdC5zdG9wKCk7XG4gICAgY2FsbGJhY2soZWxhcHNlZCArIGRlbGF5KTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cbiIsImltcG9ydCB7ZGlzcGF0Y2h9IGZyb20gXCJkMy1kaXNwYXRjaFwiO1xuaW1wb3J0IHt0aW1lciwgdGltZW91dH0gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBlbXB0eU9uID0gZGlzcGF0Y2goXCJzdGFydFwiLCBcImVuZFwiLCBcImNhbmNlbFwiLCBcImludGVycnVwdFwiKTtcbnZhciBlbXB0eVR3ZWVuID0gW107XG5cbmV4cG9ydCB2YXIgQ1JFQVRFRCA9IDA7XG5leHBvcnQgdmFyIFNDSEVEVUxFRCA9IDE7XG5leHBvcnQgdmFyIFNUQVJUSU5HID0gMjtcbmV4cG9ydCB2YXIgU1RBUlRFRCA9IDM7XG5leHBvcnQgdmFyIFJVTk5JTkcgPSA0O1xuZXhwb3J0IHZhciBFTkRJTkcgPSA1O1xuZXhwb3J0IHZhciBFTkRFRCA9IDY7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIGlkLCBpbmRleCwgZ3JvdXAsIHRpbWluZykge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGVzKSBub2RlLl9fdHJhbnNpdGlvbiA9IHt9O1xuICBlbHNlIGlmIChpZCBpbiBzY2hlZHVsZXMpIHJldHVybjtcbiAgY3JlYXRlKG5vZGUsIGlkLCB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBpbmRleDogaW5kZXgsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBncm91cDogZ3JvdXAsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBvbjogZW1wdHlPbixcbiAgICB0d2VlbjogZW1wdHlUd2VlbixcbiAgICB0aW1lOiB0aW1pbmcudGltZSxcbiAgICBkZWxheTogdGltaW5nLmRlbGF5LFxuICAgIGR1cmF0aW9uOiB0aW1pbmcuZHVyYXRpb24sXG4gICAgZWFzZTogdGltaW5nLmVhc2UsXG4gICAgdGltZXI6IG51bGwsXG4gICAgc3RhdGU6IENSRUFURURcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IENSRUFURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHNjaGVkdWxlZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IFNUQVJURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZSB8fCAhKHNjaGVkdWxlID0gc2NoZWR1bGVbaWRdKSkgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNpdGlvbiBub3QgZm91bmRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKG5vZGUsIGlkLCBzZWxmKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHR3ZWVuO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIHNlbGYgdGltZXIgd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBjcmVhdGVkLlxuICAvLyBOb3RlIHRoZSBhY3R1YWwgZGVsYXkgaXMgbm90IGtub3duIHVudGlsIHRoZSBmaXJzdCBjYWxsYmFjayFcbiAgc2NoZWR1bGVzW2lkXSA9IHNlbGY7XG4gIHNlbGYudGltZXIgPSB0aW1lcihzY2hlZHVsZSwgMCwgc2VsZi50aW1lKTtcblxuICBmdW5jdGlvbiBzY2hlZHVsZShlbGFwc2VkKSB7XG4gICAgc2VsZi5zdGF0ZSA9IFNDSEVEVUxFRDtcbiAgICBzZWxmLnRpbWVyLnJlc3RhcnQoc3RhcnQsIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG5cbiAgICAvLyBJZiB0aGUgZWxhcHNlZCBkZWxheSBpcyBsZXNzIHRoYW4gb3VyIGZpcnN0IHNsZWVwLCBzdGFydCBpbW1lZGlhdGVseS5cbiAgICBpZiAoc2VsZi5kZWxheSA8PSBlbGFwc2VkKSBzdGFydChlbGFwc2VkIC0gc2VsZi5kZWxheSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChlbGFwc2VkKSB7XG4gICAgdmFyIGksIGosIG4sIG87XG5cbiAgICAvLyBJZiB0aGUgc3RhdGUgaXMgbm90IFNDSEVEVUxFRCwgdGhlbiB3ZSBwcmV2aW91c2x5IGVycm9yZWQgb24gc3RhcnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNDSEVEVUxFRCkgcmV0dXJuIHN0b3AoKTtcblxuICAgIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICAgIG8gPSBzY2hlZHVsZXNbaV07XG4gICAgICBpZiAoby5uYW1lICE9PSBzZWxmLm5hbWUpIGNvbnRpbnVlO1xuXG4gICAgICAvLyBXaGlsZSB0aGlzIGVsZW1lbnQgYWxyZWFkeSBoYXMgYSBzdGFydGluZyB0cmFuc2l0aW9uIGR1cmluZyB0aGlzIGZyYW1lLFxuICAgICAgLy8gZGVmZXIgc3RhcnRpbmcgYW4gaW50ZXJydXB0aW5nIHRyYW5zaXRpb24gdW50aWwgdGhhdCB0cmFuc2l0aW9uIGhhcyBhXG4gICAgICAvLyBjaGFuY2UgdG8gdGljayAoYW5kIHBvc3NpYmx5IGVuZCk7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzU0IVxuICAgICAgaWYgKG8uc3RhdGUgPT09IFNUQVJURUQpIHJldHVybiB0aW1lb3V0KHN0YXJ0KTtcblxuICAgICAgLy8gSW50ZXJydXB0IHRoZSBhY3RpdmUgdHJhbnNpdGlvbiwgaWYgYW55LlxuICAgICAgaWYgKG8uc3RhdGUgPT09IFJVTk5JTkcpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiaW50ZXJydXB0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuXG4gICAgICAvLyBDYW5jZWwgYW55IHByZS1lbXB0ZWQgdHJhbnNpdGlvbnMuXG4gICAgICBlbHNlIGlmICgraSA8IGlkKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImNhbmNlbFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZlciB0aGUgZmlyc3QgdGljayB0byBlbmQgb2YgdGhlIGN1cnJlbnQgZnJhbWU7IHNlZSBkMy9kMyMxNTc2LlxuICAgIC8vIE5vdGUgdGhlIHRyYW5zaXRpb24gbWF5IGJlIGNhbmNlbGVkIGFmdGVyIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IHRpY2shXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgc2NoZWR1bGVkIGJlZm9yZSB0aGUgc3RhcnQgZXZlbnQ7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzE2IVxuICAgIC8vIEFzc3VtaW5nIHRoaXMgaXMgc3VjY2Vzc2Z1bCwgc3Vic2VxdWVudCBjYWxsYmFja3MgZ28gc3RyYWlnaHQgdG8gdGljay5cbiAgICB0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFNUQVJURUQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IFJVTk5JTkc7XG4gICAgICAgIHNlbGYudGltZXIucmVzdGFydCh0aWNrLCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuICAgICAgICB0aWNrKGVsYXBzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIHN0YXJ0IGV2ZW50LlxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIGRvbmUgYmVmb3JlIHRoZSB0d2VlbiBhcmUgaW5pdGlhbGl6ZWQuXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJUSU5HO1xuICAgIHNlbGYub24uY2FsbChcInN0YXJ0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTVEFSVElORykgcmV0dXJuOyAvLyBpbnRlcnJ1cHRlZFxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVEVEO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdHdlZW4sIGRlbGV0aW5nIG51bGwgdHdlZW4uXG4gICAgdHdlZW4gPSBuZXcgQXJyYXkobiA9IHNlbGYudHdlZW4ubGVuZ3RoKTtcbiAgICBmb3IgKGkgPSAwLCBqID0gLTE7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChvID0gc2VsZi50d2VlbltpXS52YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApKSB7XG4gICAgICAgIHR3ZWVuWysral0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICB0d2Vlbi5sZW5ndGggPSBqICsgMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgIHZhciB0ID0gZWxhcHNlZCA8IHNlbGYuZHVyYXRpb24gPyBzZWxmLmVhc2UuY2FsbChudWxsLCBlbGFwc2VkIC8gc2VsZi5kdXJhdGlvbikgOiAoc2VsZi50aW1lci5yZXN0YXJ0KHN0b3ApLCBzZWxmLnN0YXRlID0gRU5ESU5HLCAxKSxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gdHdlZW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHR3ZWVuW2ldLmNhbGwobm9kZSwgdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGVuZCBldmVudC5cbiAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gRU5ESU5HKSB7XG4gICAgICBzZWxmLm9uLmNhbGwoXCJlbmRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBzZWxmLnN0YXRlID0gRU5ERUQ7XG4gICAgc2VsZi50aW1lci5zdG9wKCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpZF07XG4gICAgZm9yICh2YXIgaSBpbiBzY2hlZHVsZXMpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGRlbGV0ZSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtTVEFSVElORywgRU5ESU5HLCBFTkRFRH0gZnJvbSBcIi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHNjaGVkdWxlLFxuICAgICAgYWN0aXZlLFxuICAgICAgZW1wdHkgPSB0cnVlLFxuICAgICAgaTtcblxuICBpZiAoIXNjaGVkdWxlcykgcmV0dXJuO1xuXG4gIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG5cbiAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgIGlmICgoc2NoZWR1bGUgPSBzY2hlZHVsZXNbaV0pLm5hbWUgIT09IG5hbWUpIHsgZW1wdHkgPSBmYWxzZTsgY29udGludWU7IH1cbiAgICBhY3RpdmUgPSBzY2hlZHVsZS5zdGF0ZSA+IFNUQVJUSU5HICYmIHNjaGVkdWxlLnN0YXRlIDwgRU5ESU5HO1xuICAgIHNjaGVkdWxlLnN0YXRlID0gRU5ERUQ7XG4gICAgc2NoZWR1bGUudGltZXIuc3RvcCgpO1xuICAgIHNjaGVkdWxlLm9uLmNhbGwoYWN0aXZlID8gXCJpbnRlcnJ1cHRcIiA6IFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNjaGVkdWxlLmluZGV4LCBzY2hlZHVsZS5ncm91cCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgfVxuXG4gIGlmIChlbXB0eSkgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xufVxuIiwiaW1wb3J0IGludGVycnVwdCBmcm9tIFwiLi4vaW50ZXJydXB0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBpbnRlcnJ1cHQodGhpcywgbmFtZSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gdHdlZW5SZW1vdmUoaWQsIG5hbWUpIHtcbiAgdmFyIHR3ZWVuMCwgdHdlZW4xO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9IHR3ZWVuMCA9IHR3ZWVuO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMSA9IHR3ZWVuMS5zbGljZSgpO1xuICAgICAgICAgIHR3ZWVuMS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdHdlZW5GdW5jdGlvbihpZCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHR3ZWVuMCwgdHdlZW4xO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSAodHdlZW4wID0gdHdlZW4pLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciB0ID0ge25hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZX0sIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjFbaV0gPSB0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gbikgdHdlZW4xLnB1c2godCk7XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIG5hbWUgKz0gXCJcIjtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgdHdlZW4gPSBnZXQodGhpcy5ub2RlKCksIGlkKS50d2VlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuLmxlbmd0aCwgdDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKCh0ID0gdHdlZW5baV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbCA/IHR3ZWVuUmVtb3ZlIDogdHdlZW5GdW5jdGlvbikoaWQsIG5hbWUsIHZhbHVlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0d2VlblZhbHVlKHRyYW5zaXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBpZCA9IHRyYW5zaXRpb24uX2lkO1xuXG4gIHRyYW5zaXRpb24uZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpO1xuICAgIChzY2hlZHVsZS52YWx1ZSB8fCAoc2NoZWR1bGUudmFsdWUgPSB7fSkpW25hbWVdID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gZ2V0KG5vZGUsIGlkKS52YWx1ZVtuYW1lXTtcbiAgfTtcbn1cbiIsImltcG9ydCB7Y29sb3J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtpbnRlcnBvbGF0ZU51bWJlciwgaW50ZXJwb2xhdGVSZ2IsIGludGVycG9sYXRlU3RyaW5nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgYztcbiAgcmV0dXJuICh0eXBlb2YgYiA9PT0gXCJudW1iZXJcIiA/IGludGVycG9sYXRlTnVtYmVyXG4gICAgICA6IGIgaW5zdGFuY2VvZiBjb2xvciA/IGludGVycG9sYXRlUmdiXG4gICAgICA6IChjID0gY29sb3IoYikpID8gKGIgPSBjLCBpbnRlcnBvbGF0ZVJnYilcbiAgICAgIDogaW50ZXJwb2xhdGVTdHJpbmcpKGEsIGIpO1xufVxuIiwiaW1wb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyBhcyBpbnRlcnBvbGF0ZVRyYW5zZm9ybX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSksIGkgPSBmdWxsbmFtZSA9PT0gXCJ0cmFuc2Zvcm1cIiA/IGludGVycG9sYXRlVHJhbnNmb3JtIDogaW50ZXJwb2xhdGU7XG4gIHJldHVybiB0aGlzLmF0dHJUd2VlbihuYW1lLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbikoZnVsbG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJhdHRyLlwiICsgbmFtZSwgdmFsdWUpKVxuICAgICAgOiB2YWx1ZSA9PSBudWxsID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkoZnVsbG5hbWUpXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KShmdWxsbmFtZSwgaSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgaS5jYWxsKHRoaXMsIHQpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlTlMoZnVsbG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgaS5jYWxsKHRoaXMsIHQpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlTlMoZnVsbG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW4obmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBrZXkgPSBcImF0dHIuXCIgKyBuYW1lO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCAoZnVsbG5hbWUubG9jYWwgPyBhdHRyVHdlZW5OUyA6IGF0dHJUd2VlbikoZnVsbG5hbWUsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge2dldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZGVsYXlGdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGluaXQodGhpcywgaWQpLmRlbGF5ID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlbGF5Q29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gZGVsYXlGdW5jdGlvblxuICAgICAgICAgIDogZGVsYXlDb25zdGFudCkoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZGVsYXk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkdXJhdGlvbkZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkdXJhdGlvbkNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gZHVyYXRpb25GdW5jdGlvblxuICAgICAgICAgIDogZHVyYXRpb25Db25zdGFudCkoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZHVyYXRpb247XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBlYXNlQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaChlYXNlQ29uc3RhbnQoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZWFzZTtcbn1cbiIsImltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBlYXNlVmFyeWluZyhpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIHYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy5lYWNoKGVhc2VWYXJ5aW5nKHRoaXMuX2lkLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHttYXRjaGVyfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIGlmICh0eXBlb2YgbWF0Y2ggIT09IFwiZnVuY3Rpb25cIikgbWF0Y2ggPSBtYXRjaGVyKG1hdGNoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gW10sIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgbWF0Y2guY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcbiAgaWYgKHRyYW5zaXRpb24uX2lkICE9PSB0aGlzLl9pZCkgdGhyb3cgbmV3IEVycm9yO1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSB0cmFuc2l0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihtZXJnZXMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXQsIGluaXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUpIHtcbiAgcmV0dXJuIChuYW1lICsgXCJcIikudHJpbSgpLnNwbGl0KC9efFxccysvKS5ldmVyeShmdW5jdGlvbih0KSB7XG4gICAgdmFyIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiAhdCB8fCB0ID09PSBcInN0YXJ0XCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgb24wLCBvbjEsIHNpdCA9IHN0YXJ0KG5hbWUpID8gaW5pdCA6IHNldDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNpdCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub247XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjApIChvbjEgPSAob24wID0gb24pLmNvcHkoKSkub24obmFtZSwgbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMlxuICAgICAgPyBnZXQodGhpcy5ub2RlKCksIGlkKS5vbi5vbihuYW1lKVxuICAgICAgOiB0aGlzLmVhY2gob25GdW5jdGlvbihpZCwgbmFtZSwgbGlzdGVuZXIpKTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZUZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fX3RyYW5zaXRpb24pIGlmICgraSAhPT0gaWQpIHJldHVybjtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vbihcImVuZC5yZW1vdmVcIiwgcmVtb3ZlRnVuY3Rpb24odGhpcy5faWQpKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0b3J9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkID0gdGhpcy5faWQ7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3Ioc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBzdWJub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChzdWJub2RlID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSkge1xuICAgICAgICBpZiAoXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICBzdWJncm91cFtpXSA9IHN1Ym5vZGU7XG4gICAgICAgIHNjaGVkdWxlKHN1Ymdyb3VwW2ldLCBuYW1lLCBpZCwgaSwgc3ViZ3JvdXAsIGdldChub2RlLCBpZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0b3JBbGx9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkID0gdGhpcy5faWQ7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBmb3IgKHZhciBjaGlsZHJlbiA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSwgY2hpbGQsIGluaGVyaXQgPSBnZXQobm9kZSwgaWQpLCBrID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgayA8IGw7ICsraykge1xuICAgICAgICAgIGlmIChjaGlsZCA9IGNoaWxkcmVuW2tdKSB7XG4gICAgICAgICAgICBzY2hlZHVsZShjaGlsZCwgbmFtZSwgaWQsIGssIGNoaWxkcmVuLCBpbmhlcml0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3ViZ3JvdXBzLnB1c2goY2hpbGRyZW4pO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxudmFyIFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9ncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiaW1wb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyBhcyBpbnRlcnBvbGF0ZVRyYW5zZm9ybX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge3N0eWxlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCBpbnRlcnBvbGF0ZSBmcm9tIFwiLi9pbnRlcnBvbGF0ZS5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZU51bGwobmFtZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpLFxuICAgICAgICBzdHJpbmcxID0gKHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSksIHN0eWxlKHRoaXMsIG5hbWUpKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgc3RyaW5nMTAgPSBzdHJpbmcxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVGdW5jdGlvbihuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpLFxuICAgICAgICB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSxcbiAgICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSBzdHJpbmcxID0gdmFsdWUxID0gKHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSksIHN0eWxlKHRoaXMsIG5hbWUpKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlTWF5YmVSZW1vdmUoaWQsIG5hbWUpIHtcbiAgdmFyIG9uMCwgb24xLCBsaXN0ZW5lcjAsIGtleSA9IFwic3R5bGUuXCIgKyBuYW1lLCBldmVudCA9IFwiZW5kLlwiICsga2V5LCByZW1vdmU7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICBvbiA9IHNjaGVkdWxlLm9uLFxuICAgICAgICBsaXN0ZW5lciA9IHNjaGVkdWxlLnZhbHVlW2tleV0gPT0gbnVsbCA/IHJlbW92ZSB8fCAocmVtb3ZlID0gc3R5bGVSZW1vdmUobmFtZSkpIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmIChvbiAhPT0gb24wIHx8IGxpc3RlbmVyMCAhPT0gbGlzdGVuZXIpIChvbjEgPSAob24wID0gb24pLmNvcHkoKSkub24oZXZlbnQsIGxpc3RlbmVyMCA9IGxpc3RlbmVyKTtcblxuICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGkgPSAobmFtZSArPSBcIlwiKSA9PT0gXCJ0cmFuc2Zvcm1cIiA/IGludGVycG9sYXRlVHJhbnNmb3JtIDogaW50ZXJwb2xhdGU7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVOdWxsKG5hbWUsIGkpKVxuICAgICAgLm9uKFwiZW5kLnN0eWxlLlwiICsgbmFtZSwgc3R5bGVSZW1vdmUobmFtZSkpXG4gICAgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlRnVuY3Rpb24obmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcInN0eWxlLlwiICsgbmFtZSwgdmFsdWUpKSlcbiAgICAgIC5lYWNoKHN0eWxlTWF5YmVSZW1vdmUodGhpcy5faWQsIG5hbWUpKVxuICAgIDogdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVDb25zdGFudChuYW1lLCBpLCB2YWx1ZSksIHByaW9yaXR5KVxuICAgICAgLm9uKFwiZW5kLnN0eWxlLlwiICsgbmFtZSwgbnVsbCk7XG59XG4iLCJmdW5jdGlvbiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCBpLmNhbGwodGhpcywgdCksIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVUd2VlbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIHQsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0ID0gKGkwID0gaSkgJiYgc3R5bGVJbnRlcnBvbGF0ZShuYW1lLCBpLCBwcmlvcml0eSk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciBrZXkgPSBcInN0eWxlLlwiICsgKG5hbWUgKz0gXCJcIik7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSk7XG59XG4iLCJpbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZTEgPSB2YWx1ZSh0aGlzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWUxID09IG51bGwgPyBcIlwiIDogdmFsdWUxO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdGhpcy50d2VlbihcInRleHRcIiwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gdGV4dEZ1bmN0aW9uKHR3ZWVuVmFsdWUodGhpcywgXCJ0ZXh0XCIsIHZhbHVlKSlcbiAgICAgIDogdGV4dENvbnN0YW50KHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiKSk7XG59XG4iLCJmdW5jdGlvbiB0ZXh0SW50ZXJwb2xhdGUoaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSBpLmNhbGwodGhpcywgdCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRUd2Vlbih2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIHRleHRJbnRlcnBvbGF0ZShpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGtleSA9IFwidGV4dFwiO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgdGV4dFR3ZWVuKHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb24sIG5ld0lkfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQwID0gdGhpcy5faWQsXG4gICAgICBpZDEgPSBuZXdJZCgpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHZhciBpbmhlcml0ID0gZ2V0KG5vZGUsIGlkMCk7XG4gICAgICAgIHNjaGVkdWxlKG5vZGUsIG5hbWUsIGlkMSwgaSwgZ3JvdXAsIHtcbiAgICAgICAgICB0aW1lOiBpbmhlcml0LnRpbWUgKyBpbmhlcml0LmRlbGF5ICsgaW5oZXJpdC5kdXJhdGlvbixcbiAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICBkdXJhdGlvbjogaW5oZXJpdC5kdXJhdGlvbixcbiAgICAgICAgICBlYXNlOiBpbmhlcml0LmVhc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQxKTtcbn1cbiIsImltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIG9uMCwgb24xLCB0aGF0ID0gdGhpcywgaWQgPSB0aGF0Ll9pZCwgc2l6ZSA9IHRoYXQuc2l6ZSgpO1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGNhbmNlbCA9IHt2YWx1ZTogcmVqZWN0fSxcbiAgICAgICAgZW5kID0ge3ZhbHVlOiBmdW5jdGlvbigpIHsgaWYgKC0tc2l6ZSA9PT0gMCkgcmVzb2x2ZSgpOyB9fTtcblxuICAgIHRoYXQuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICAgIGlmIChvbiAhPT0gb24wKSB7XG4gICAgICAgIG9uMSA9IChvbjAgPSBvbikuY29weSgpO1xuICAgICAgICBvbjEuXy5jYW5jZWwucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5pbnRlcnJ1cHQucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5lbmQucHVzaChlbmQpO1xuICAgICAgfVxuXG4gICAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgICB9KTtcblxuICAgIC8vIFRoZSBzZWxlY3Rpb24gd2FzIGVtcHR5LCByZXNvbHZlIGVuZCBpbW1lZGlhdGVseVxuICAgIGlmIChzaXplID09PSAwKSByZXNvbHZlKCk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHIgZnJvbSBcIi4vYXR0ci5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0clR3ZWVuIGZyb20gXCIuL2F0dHJUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZGVsYXkgZnJvbSBcIi4vZGVsYXkuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2R1cmF0aW9uIGZyb20gXCIuL2R1cmF0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lYXNlIGZyb20gXCIuL2Vhc2UuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nIGZyb20gXCIuL2Vhc2VWYXJ5aW5nLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGwuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZVR3ZWVuIGZyb20gXCIuL3N0eWxlVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dFR3ZWVuIGZyb20gXCIuL3RleHRUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90d2VlbiBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZW5kIGZyb20gXCIuL2VuZC5qc1wiO1xuXG52YXIgaWQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNpdGlvbihncm91cHMsIHBhcmVudHMsIG5hbWUsIGlkKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG4gIHRoaXMuX25hbWUgPSBuYW1lO1xuICB0aGlzLl9pZCA9IGlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHNlbGVjdGlvbigpLnRyYW5zaXRpb24obmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdJZCgpIHtcbiAgcmV0dXJuICsraWQ7XG59XG5cbnZhciBzZWxlY3Rpb25fcHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZTtcblxuVHJhbnNpdGlvbi5wcm90b3R5cGUgPSB0cmFuc2l0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zaXRpb24sXG4gIHNlbGVjdDogdHJhbnNpdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogdHJhbnNpdGlvbl9zZWxlY3RBbGwsXG4gIHNlbGVjdENoaWxkOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3Byb3RvdHlwZS5zZWxlY3RDaGlsZHJlbixcbiAgZmlsdGVyOiB0cmFuc2l0aW9uX2ZpbHRlcixcbiAgbWVyZ2U6IHRyYW5zaXRpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogdHJhbnNpdGlvbl9zZWxlY3Rpb24sXG4gIHRyYW5zaXRpb246IHRyYW5zaXRpb25fdHJhbnNpdGlvbixcbiAgY2FsbDogc2VsZWN0aW9uX3Byb3RvdHlwZS5jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX3Byb3RvdHlwZS5ub2RlcyxcbiAgbm9kZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fcHJvdG90eXBlLmVtcHR5LFxuICBlYWNoOiBzZWxlY3Rpb25fcHJvdG90eXBlLmVhY2gsXG4gIG9uOiB0cmFuc2l0aW9uX29uLFxuICBhdHRyOiB0cmFuc2l0aW9uX2F0dHIsXG4gIGF0dHJUd2VlbjogdHJhbnNpdGlvbl9hdHRyVHdlZW4sXG4gIHN0eWxlOiB0cmFuc2l0aW9uX3N0eWxlLFxuICBzdHlsZVR3ZWVuOiB0cmFuc2l0aW9uX3N0eWxlVHdlZW4sXG4gIHRleHQ6IHRyYW5zaXRpb25fdGV4dCxcbiAgdGV4dFR3ZWVuOiB0cmFuc2l0aW9uX3RleHRUd2VlbixcbiAgcmVtb3ZlOiB0cmFuc2l0aW9uX3JlbW92ZSxcbiAgdHdlZW46IHRyYW5zaXRpb25fdHdlZW4sXG4gIGRlbGF5OiB0cmFuc2l0aW9uX2RlbGF5LFxuICBkdXJhdGlvbjogdHJhbnNpdGlvbl9kdXJhdGlvbixcbiAgZWFzZTogdHJhbnNpdGlvbl9lYXNlLFxuICBlYXNlVmFyeWluZzogdHJhbnNpdGlvbl9lYXNlVmFyeWluZyxcbiAgZW5kOiB0cmFuc2l0aW9uX2VuZCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXVxufTtcbiIsImV4cG9ydCBjb25zdCBsaW5lYXIgPSB0ID0+ICt0O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb24sIG5ld0lkfSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlIGZyb20gXCIuLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge2Vhc2VDdWJpY0luT3V0fSBmcm9tIFwiZDMtZWFzZVwiO1xuaW1wb3J0IHtub3d9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZGVmYXVsdFRpbWluZyA9IHtcbiAgdGltZTogbnVsbCwgLy8gU2V0IG9uIHVzZS5cbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiAyNTAsXG4gIGVhc2U6IGVhc2VDdWJpY0luT3V0XG59O1xuXG5mdW5jdGlvbiBpbmhlcml0KG5vZGUsIGlkKSB7XG4gIHZhciB0aW1pbmc7XG4gIHdoaWxlICghKHRpbWluZyA9IG5vZGUuX190cmFuc2l0aW9uKSB8fCAhKHRpbWluZyA9IHRpbWluZ1tpZF0pKSB7XG4gICAgaWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJhbnNpdGlvbiAke2lkfSBub3QgZm91bmRgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRpbWluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgaWQsXG4gICAgICB0aW1pbmc7XG5cbiAgaWYgKG5hbWUgaW5zdGFuY2VvZiBUcmFuc2l0aW9uKSB7XG4gICAgaWQgPSBuYW1lLl9pZCwgbmFtZSA9IG5hbWUuX25hbWU7XG4gIH0gZWxzZSB7XG4gICAgaWQgPSBuZXdJZCgpLCAodGltaW5nID0gZGVmYXVsdFRpbWluZykudGltZSA9IG5vdygpLCBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQsIGksIGdyb3VwLCB0aW1pbmcgfHwgaW5oZXJpdChub2RlLCBpZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ludGVycnVwdCBmcm9tIFwiLi9pbnRlcnJ1cHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5cbnNlbGVjdGlvbi5wcm90b3R5cGUuaW50ZXJydXB0ID0gc2VsZWN0aW9uX2ludGVycnVwdDtcbnNlbGVjdGlvbi5wcm90b3R5cGUudHJhbnNpdGlvbiA9IHNlbGVjdGlvbl90cmFuc2l0aW9uO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIFRyYW5zZm9ybShrLCB4LCB5KSB7XG4gIHRoaXMuayA9IGs7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMueSA9IHk7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2Zvcm0sXG4gIHNjYWxlOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGsgPT09IDEgPyB0aGlzIDogbmV3IFRyYW5zZm9ybSh0aGlzLmsgKiBrLCB0aGlzLngsIHRoaXMueSk7XG4gIH0sXG4gIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB4ID09PSAwICYgeSA9PT0gMCA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuaywgdGhpcy54ICsgdGhpcy5rICogeCwgdGhpcy55ICsgdGhpcy5rICogeSk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiBbcG9pbnRbMF0gKiB0aGlzLmsgKyB0aGlzLngsIHBvaW50WzFdICogdGhpcy5rICsgdGhpcy55XTtcbiAgfSxcbiAgYXBwbHlYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggKiB0aGlzLmsgKyB0aGlzLng7XG4gIH0sXG4gIGFwcGx5WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5ICogdGhpcy5rICsgdGhpcy55O1xuICB9LFxuICBpbnZlcnQ6IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIFsobG9jYXRpb25bMF0gLSB0aGlzLngpIC8gdGhpcy5rLCAobG9jYXRpb25bMV0gLSB0aGlzLnkpIC8gdGhpcy5rXTtcbiAgfSxcbiAgaW52ZXJ0WDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCAtIHRoaXMueCkgLyB0aGlzLms7XG4gIH0sXG4gIGludmVydFk6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gKHkgLSB0aGlzLnkpIC8gdGhpcy5rO1xuICB9LFxuICByZXNjYWxlWDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4LmNvcHkoKS5kb21haW4oeC5yYW5nZSgpLm1hcCh0aGlzLmludmVydFgsIHRoaXMpLm1hcCh4LmludmVydCwgeCkpO1xuICB9LFxuICByZXNjYWxlWTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5LmNvcHkoKS5kb21haW4oeS5yYW5nZSgpLm1hcCh0aGlzLmludmVydFksIHRoaXMpLm1hcCh5LmludmVydCwgeSkpO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgdGhpcy54ICsgXCIsXCIgKyB0aGlzLnkgKyBcIikgc2NhbGUoXCIgKyB0aGlzLmsgKyBcIilcIjtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IG5ldyBUcmFuc2Zvcm0oMSwgMCwgMCk7XG5cbnRyYW5zZm9ybS5wcm90b3R5cGUgPSBUcmFuc2Zvcm0ucHJvdG90eXBlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm0obm9kZSkge1xuICB3aGlsZSAoIW5vZGUuX196b29tKSBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkgcmV0dXJuIGlkZW50aXR5O1xuICByZXR1cm4gbm9kZS5fX3pvb207XG59XG4iLCJleHBvcnQgY29uc3Qgc3ZnbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gPFQgZXh0ZW5kcyBFbGVtZW50PihcbiAgc2VsZWN0b3I6IHN0cmluZyxcbiAgdHlwZT86IG5ldyAoKSA9PiBUXG4pOiBUID0+IHtcbiAgY29uc3QgZWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIGlmIChlbHQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBzZWxlY3RvciBcIiArIHNlbGVjdG9yKTtcbiAgfVxuICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmICEoZWx0IGluc3RhbmNlb2YgdHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNlbGVjdG9yICR7c2VsZWN0b3J9IG5vdCBvZiB0eXBlICR7dHlwZX1gKTtcbiAgfVxuICByZXR1cm4gZWx0IGFzIFQ7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGZpdHRzID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYmlnVGFyZ2V0MSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5iaWctdGFyZ2V0MVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMzUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDI1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAxNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgNSk7XG4gIGNvbnN0IGJpZ1RhcmdldDIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmZpdHRzIGcuYmlnLXRhcmdldDJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDM1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAyNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMTUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDUpO1xuICBjb25zdCBzbWFsbFRhcmdldCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5zbWFsbC10YXJnZXRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShzbWFsbFRhcmdldCwgNDAsIDUwLCA1KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgcHVycG9zZSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGJpZ1RhcmdldDEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnB1cnBvc2UgZy50YXJnZXRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCA0MCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDMwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMjApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAxMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDEpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBoaWNrID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZzEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDFcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzEsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMCw0MCA0MCw0MFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnMiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wMlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMixcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDQwIDQwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzMgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDNcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzMsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDQwIDQwLDQwIDQwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzQgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzQsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMjAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNSxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDIwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc2ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA2XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc2LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCw0MCA0MCw0MCAyMCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGpha29iID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYXBwMSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy5hcHAtMVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGFwcDEsIDQwLCA1MCwgMzUpO1xuICBjb25zdCBhcHAyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLmFwcC0yXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYXBwMiwgNDAsIDUwLCAzNSk7XG4gIGNvbnN0IHlvdXJBcHAgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcueW91ci1hcHBcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZSh5b3VyQXBwLCA0MCwgNTAsIDM1KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZ3JhZGllbnQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5ncmFkaWVudCBnXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDUsIDMwLCA0MCwgNDAsIDEpO1xuICB0LmNyZWF0ZVJlY3QoZywgNTAsIDMwLCA0MCwgNDAsIDIpO1xuICB0LmNyZWF0ZVJlY3QoZywgOTUsIDMwLCA0MCwgNDAsIDMpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTQwLCAzMCwgNDAsIDQwLCA0KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDE4NSwgMzAsIDQwLCA0MCwgNSk7XG4gIHQuY3JlYXRlUmVjdChnLCAyMzAsIDMwLCA0MCwgNDAsIDYpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBnZXN0YWx0ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZ2VzdGFsdCBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogXCJmdWxsXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHByb3hpbWl0eSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnByb3hpbWl0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0geCA+IDEgJiYgeSA8IDIgPyA4IDogMDtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCArIG9mZnNldCwgeSAqIDIwICsgMjAgLSBvZmZzZXQsIDUsIHtcbiAgICAgICAgY2xhc3M6IFwiZnVsbFwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBzaW1pbGFyaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuc2ltaWxhcml0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3QgbXlDbGFzcyA9IHggPiAxICYmIHkgPCAyID8gXCJ4eHhcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogbXlDbGFzcyxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4vU1ZHVG9vbFwiO1xuaW1wb3J0IHsgZml0dHMgfSBmcm9tIFwiLi9zdmdzL2ZpdHRzXCI7XG5pbXBvcnQgeyBwdXJwb3NlIH0gZnJvbSBcIi4vc3Zncy9wdXJwb3NlXCI7XG5pbXBvcnQgeyBoaWNrIH0gZnJvbSBcIi4vc3Zncy9oaWNrXCI7XG5pbXBvcnQgeyBqYWtvYiB9IGZyb20gXCIuL3N2Z3MvamFrb2JcIjtcbmltcG9ydCB7IGdyYWRpZW50IH0gZnJvbSBcIi4vc3Zncy9ncmFkaWVudFwiO1xuaW1wb3J0IHsgZ2VzdGFsdCB9IGZyb20gXCIuL3N2Z3MvZ2VzdGFsdFwiO1xuaW1wb3J0IHsgcHJveGltaXR5IH0gZnJvbSBcIi4vc3Zncy9wcm94aW1pdHlcIjtcbmltcG9ydCB7IHNpbWlsYXJpdHkgfSBmcm9tIFwiLi9zdmdzL3NpbWlsYXJpdHlcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiAoKHQ6IFNWR1Rvb2wpID0+IHZvaWQpW10gfSA9IHtcbiAgXCIwMi1maXR0c1wiOiBbZml0dHNdLFxuICBcIjAxLXB1cnBvc2VcIjogW3B1cnBvc2VdLFxuICBcIjAzLWhpY2tcIjogW2hpY2tdLFxuICBcIjA0LWpha29iXCI6IFtqYWtvYl0sXG4gIFwiMDctZ29hbC1ncmFkaWVudFwiOiBbZ3JhZGllbnRdLFxuICBcIjA4LWdlc3RhbHRcIjogW2dlc3RhbHRdLFxuICBcIjA5LWxhdy1vZi1wcm94aW1pdHlcIjogW3Byb3hpbWl0eV0sXG4gIFwiMTAtbGF3LW9mLXNpbWlsYXJpdHlcIjogW3NpbWlsYXJpdHldLFxufTtcblxuY29uc3Qgc2V0ID0gbmV3IFNldDwodDogU1ZHVG9vbCkgPT4gdm9pZD4oKTtcbmZvciAoY29uc3QgdmFsdWVzIG9mIE9iamVjdC52YWx1ZXMoY29uZmlnKSkge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgIHNldC5hZGQodmFsdWUpO1xuICB9XG59XG5leHBvcnQgY29uc3QgYWxsID0gWy4uLnNldF07XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcbmltcG9ydCB7IFRyYW5zaXRpb25PcHRpb25zIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9UcmFuc2l0aW9uT3B0aW9uc1wiO1xuaW1wb3J0IHsgY29uZmlnLCBhbGwgfSBmcm9tIFwiLi9zdmdDb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIFNWR1Rvb2wge1xuICBkZWxheUNvdW50ZXIgPSAwO1xuICBkZWxheUluY3JlbWVudCA9IDEwMDtcbiAgdXNlVHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gIHN2Z05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0U3ZnTmFtZSgpO1xuICB9XG5cbiAgaW5pdFN2Z05hbWUoKSB7XG4gICAgY29uc3QgcmVnZXggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goL14uKlxcL2NhcmRzXFwvKC4qKSguaHRtbCkkLyk7XG4gICAgY29uc29sZS5sb2coXCJyZWdleDogXCIsIHJlZ2V4KTtcbiAgICBpZiAocmVnZXggaW5zdGFuY2VvZiBBcnJheSAmJiByZWdleC5sZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLnN2Z05hbWUgPSByZWdleFsxXTtcbiAgICAgIHRoaXMudXNlVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXNlVHJhbnNpdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdFN2ZygpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdmdOYW1lID8gY29uZmlnW3RoaXMuc3ZnTmFtZV0gOiBhbGw7XG4gICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGYgb2YgbGlzdCkge1xuICAgICAgZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXREZWxheSgpIHtcbiAgICB0aGlzLmRlbGF5Q291bnRlciArPSB0aGlzLmRlbGF5SW5jcmVtZW50O1xuICAgIHJldHVybiB0aGlzLmRlbGF5Q291bnRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgY3g6IG51bWJlcixcbiAgICBjeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBvcHRpb25zPzogUGFydGlhbDxUcmFuc2l0aW9uT3B0aW9ucz5cbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwiY2lyY2xlXCIsXG4gICAgICB7XG4gICAgICAgIGN4LFxuICAgICAgICBjeSxcbiAgICAgICAgcjogMCxcbiAgICAgIH0sXG4gICAgICB7IHIgfSxcbiAgICAgIG9wdHNcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUG9seWdvbihncm91cDogU1ZHR0VsZW1lbnQsIHBvaW50czogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJwb2x5Z29uXCIsXG4gICAgICB7IHBvaW50czogXCJcIiB9LFxuICAgICAgeyBwb2ludHM6IHBvaW50cyB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVQb2x5bGluZShncm91cDogU1ZHR0VsZW1lbnQsIHBvaW50czogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJwb2x5bGluZVwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUmVjdChcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGludGVuc2l0eSA9IDBcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJyZWN0XCIsXG4gICAgICB7IHgsIHksIHdpZHRoLCBoZWlnaHQ6IDAsIG9wYWNpdHk6IGludGVuc2l0eSAqICgxLjAgLyA2KSB9LFxuICAgICAgeyBoZWlnaHQ6IGhlaWdodCB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVGb3JtID0gPFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IHN0cmluZyB9PihcbiAgICBjb250YWluZXI6IFNWR0dFbGVtZW50LFxuICAgIGVsdE5hbWU6IHN0cmluZyxcbiAgICBpbml0aWFsQXR0cmlidXRlczogVCxcbiAgICBmaW5hbEF0dHJpYnV0ZXM6IFBhcnRpYWw8VD4sXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkgPT4ge1xuICAgIGNvbnN0IG9wdHM6IFRyYW5zaXRpb25PcHRpb25zID0ge1xuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICBkZWxheTogMTAwMCxcbiAgICAgIGNsYXNzOiBcIlwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIGlmICghdGhpcy51c2VUcmFuc2l0aW9uKSB7XG4gICAgICBvcHRzLmRlbGF5ID0gMDtcbiAgICAgIG9wdHMuZHVyYXRpb24gPSAwO1xuICAgIH1cbiAgICBjb25zdCBlbHQgPSBkMy5zZWxlY3QoY29udGFpbmVyKS5hcHBlbmQoZWx0TmFtZSk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbml0aWFsQXR0cmlidXRlcykpIHtcbiAgICAgIGVsdC5hdHRyKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAob3B0cy5jbGFzcykge1xuICAgICAgZWx0LmF0dHIoXCJjbGFzc1wiLCBvcHRzLmNsYXNzKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ID0gZWx0XG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24ob3B0cy5kdXJhdGlvbilcbiAgICAgIC5kZWxheShvcHRzLmRlbGF5KVxuICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcik7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhmaW5hbEF0dHJpYnV0ZXMpKSB7XG4gICAgICB0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IGluaXRUaGVtZSA9ICgpID0+IHtcbiAgY29uc3QgaXNEYXJrID1cbiAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzO1xuXG4gIGNvbnN0IGNsID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3Q7XG4gIGlzRGFyayA/IGNsLmFkZChcImRhcmtcIikgOiBjbC5hZGQoXCJsaWdodFwiKTtcblxuICB3aW5kb3dcbiAgICAubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY29sb3JTY2hlbWUgPSBlLm1hdGNoZXMgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29sb3JTY2hlbWU6IFwiLCBjb2xvclNjaGVtZSk7XG5cbiAgICAgIGNsLnJlbW92ZShcImRhcmtcIik7XG4gICAgICBjbC5yZW1vdmUoXCJsaWdodFwiKTtcbiAgICAgIGlmIChjb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIpIHtcbiAgICAgICAgY2wuYWRkKFwiZGFya1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsLmFkZChcImxpZ2h0XCIpO1xuICAgICAgfVxuICAgIH0pO1xufTtcbiIsImltcG9ydCBcIi4vc2Nzcy9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuL1NWR1Rvb2xcIjtcblxuaW1wb3J0IHsgaW5pdFRoZW1lIH0gZnJvbSBcIi4vdGhlbWVcIjtcblxuaW5pdFRoZW1lKCk7XG5cbmNvbnN0IHN2Z1Rvb2wgPSBuZXcgU1ZHVG9vbCgpO1xuc3ZnVG9vbC5pbml0U3ZnKCk7XG4iXSwibmFtZXMiOlsibm9vcCIsImRpc3BhdGNoIiwiaSIsIm4iLCJfIiwidCIsIkRpc3BhdGNoIiwicGFyc2VUeXBlbmFtZXMiLCJ0eXBlbmFtZXMiLCJ0eXBlcyIsIm5hbWUiLCJ0eXBlbmFtZSIsImNhbGxiYWNrIiwiVCIsImdldCIsInNldCIsImNvcHkiLCJ0eXBlIiwidGhhdCIsImFyZ3MiLCJjIiwieGh0bWwiLCJuYW1lc3BhY2VzIiwibmFtZXNwYWNlIiwicHJlZml4IiwiY3JlYXRvckluaGVyaXQiLCJkb2N1bWVudCIsInVyaSIsImNyZWF0b3JGaXhlZCIsImZ1bGxuYW1lIiwiY3JlYXRvciIsIm5vbmUiLCJzZWxlY3RvciIsInNlbGVjdGlvbl9zZWxlY3QiLCJzZWxlY3QiLCJncm91cHMiLCJtIiwic3ViZ3JvdXBzIiwiaiIsImdyb3VwIiwic3ViZ3JvdXAiLCJub2RlIiwic3Vibm9kZSIsIlNlbGVjdGlvbiIsImFycmF5IiwieCIsImVtcHR5Iiwic2VsZWN0b3JBbGwiLCJhcnJheUFsbCIsInNlbGVjdGlvbl9zZWxlY3RBbGwiLCJwYXJlbnRzIiwibWF0Y2hlciIsImNoaWxkTWF0Y2hlciIsImZpbmQiLCJjaGlsZEZpbmQiLCJtYXRjaCIsImNoaWxkRmlyc3QiLCJzZWxlY3Rpb25fc2VsZWN0Q2hpbGQiLCJmaWx0ZXIiLCJjaGlsZHJlbiIsImNoaWxkcmVuRmlsdGVyIiwic2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIiwic2VsZWN0aW9uX2ZpbHRlciIsInNwYXJzZSIsInVwZGF0ZSIsInNlbGVjdGlvbl9lbnRlciIsIkVudGVyTm9kZSIsInBhcmVudCIsImRhdHVtIiwiY2hpbGQiLCJuZXh0IiwiY29uc3RhbnQkMSIsImJpbmRJbmRleCIsImVudGVyIiwiZXhpdCIsImRhdGEiLCJncm91cExlbmd0aCIsImRhdGFMZW5ndGgiLCJiaW5kS2V5Iiwia2V5Iiwibm9kZUJ5S2V5VmFsdWUiLCJrZXlWYWx1ZXMiLCJrZXlWYWx1ZSIsInNlbGVjdGlvbl9kYXRhIiwidmFsdWUiLCJiaW5kIiwiY29uc3RhbnQiLCJhcnJheWxpa2UiLCJlbnRlckdyb3VwIiwidXBkYXRlR3JvdXAiLCJleGl0R3JvdXAiLCJpMCIsImkxIiwicHJldmlvdXMiLCJzZWxlY3Rpb25fZXhpdCIsInNlbGVjdGlvbl9qb2luIiwib25lbnRlciIsIm9udXBkYXRlIiwib25leGl0Iiwic2VsZWN0aW9uX21lcmdlIiwiY29udGV4dCIsInNlbGVjdGlvbiIsImdyb3VwczAiLCJncm91cHMxIiwibTAiLCJtMSIsIm1lcmdlcyIsImdyb3VwMCIsImdyb3VwMSIsIm1lcmdlIiwic2VsZWN0aW9uX29yZGVyIiwic2VsZWN0aW9uX3NvcnQiLCJjb21wYXJlIiwiYXNjZW5kaW5nIiwiY29tcGFyZU5vZGUiLCJhIiwiYiIsInNvcnRncm91cHMiLCJzb3J0Z3JvdXAiLCJzZWxlY3Rpb25fY2FsbCIsInNlbGVjdGlvbl9ub2RlcyIsInNlbGVjdGlvbl9ub2RlIiwic2VsZWN0aW9uX3NpemUiLCJzaXplIiwic2VsZWN0aW9uX2VtcHR5Iiwic2VsZWN0aW9uX2VhY2giLCJhdHRyUmVtb3ZlIiwiYXR0clJlbW92ZU5TIiwiYXR0ckNvbnN0YW50IiwiYXR0ckNvbnN0YW50TlMiLCJhdHRyRnVuY3Rpb24iLCJ2IiwiYXR0ckZ1bmN0aW9uTlMiLCJzZWxlY3Rpb25fYXR0ciIsImRlZmF1bHRWaWV3Iiwic3R5bGVSZW1vdmUiLCJzdHlsZUNvbnN0YW50IiwicHJpb3JpdHkiLCJzdHlsZUZ1bmN0aW9uIiwic2VsZWN0aW9uX3N0eWxlIiwic3R5bGVWYWx1ZSIsInByb3BlcnR5UmVtb3ZlIiwicHJvcGVydHlDb25zdGFudCIsInByb3BlcnR5RnVuY3Rpb24iLCJzZWxlY3Rpb25fcHJvcGVydHkiLCJjbGFzc0FycmF5Iiwic3RyaW5nIiwiY2xhc3NMaXN0IiwiQ2xhc3NMaXN0IiwiY2xhc3NlZEFkZCIsIm5hbWVzIiwibGlzdCIsImNsYXNzZWRSZW1vdmUiLCJjbGFzc2VkVHJ1ZSIsImNsYXNzZWRGYWxzZSIsImNsYXNzZWRGdW5jdGlvbiIsInNlbGVjdGlvbl9jbGFzc2VkIiwidGV4dFJlbW92ZSIsInRleHRDb25zdGFudCIsInRleHRGdW5jdGlvbiIsInNlbGVjdGlvbl90ZXh0IiwiaHRtbFJlbW92ZSIsImh0bWxDb25zdGFudCIsImh0bWxGdW5jdGlvbiIsInNlbGVjdGlvbl9odG1sIiwicmFpc2UiLCJzZWxlY3Rpb25fcmFpc2UiLCJsb3dlciIsInNlbGVjdGlvbl9sb3dlciIsInNlbGVjdGlvbl9hcHBlbmQiLCJjcmVhdGUiLCJjb25zdGFudE51bGwiLCJzZWxlY3Rpb25faW5zZXJ0IiwiYmVmb3JlIiwicmVtb3ZlIiwic2VsZWN0aW9uX3JlbW92ZSIsInNlbGVjdGlvbl9jbG9uZVNoYWxsb3ciLCJjbG9uZSIsInNlbGVjdGlvbl9jbG9uZURlZXAiLCJzZWxlY3Rpb25fY2xvbmUiLCJkZWVwIiwic2VsZWN0aW9uX2RhdHVtIiwiY29udGV4dExpc3RlbmVyIiwibGlzdGVuZXIiLCJldmVudCIsIm9uUmVtb3ZlIiwib24iLCJvbkFkZCIsIm9wdGlvbnMiLCJvIiwic2VsZWN0aW9uX29uIiwiZGlzcGF0Y2hFdmVudCIsInBhcmFtcyIsIndpbmRvdyIsImRpc3BhdGNoQ29uc3RhbnQiLCJkaXNwYXRjaEZ1bmN0aW9uIiwic2VsZWN0aW9uX2Rpc3BhdGNoIiwic2VsZWN0aW9uX2l0ZXJhdG9yIiwicm9vdCIsInNlbGVjdGlvbl9zZWxlY3Rpb24iLCJkZWZpbmUiLCJjb25zdHJ1Y3RvciIsImZhY3RvcnkiLCJwcm90b3R5cGUiLCJleHRlbmQiLCJkZWZpbml0aW9uIiwiQ29sb3IiLCJkYXJrZXIiLCJicmlnaHRlciIsInJlSSIsInJlTiIsInJlUCIsInJlSGV4IiwicmVSZ2JJbnRlZ2VyIiwicmVSZ2JQZXJjZW50IiwicmVSZ2JhSW50ZWdlciIsInJlUmdiYVBlcmNlbnQiLCJyZUhzbFBlcmNlbnQiLCJyZUhzbGFQZXJjZW50IiwibmFtZWQiLCJjb2xvciIsImNoYW5uZWxzIiwiY29sb3JfZm9ybWF0SGV4IiwiY29sb3JfZm9ybWF0SGV4OCIsImNvbG9yX2Zvcm1hdEhzbCIsImNvbG9yX2Zvcm1hdFJnYiIsImhzbENvbnZlcnQiLCJmb3JtYXQiLCJsIiwicmdibiIsIlJnYiIsInJnYmEiLCJoc2xhIiwiciIsImciLCJyZ2JDb252ZXJ0IiwicmdiIiwib3BhY2l0eSIsImsiLCJjbGFtcGkiLCJjbGFtcGEiLCJyZ2JfZm9ybWF0SGV4IiwicmdiX2Zvcm1hdEhleDgiLCJyZ2JfZm9ybWF0UmdiIiwiaGV4IiwiaCIsInMiLCJIc2wiLCJtaW4iLCJtYXgiLCJoc2wiLCJtMiIsImhzbDJyZ2IiLCJjbGFtcGgiLCJjbGFtcHQiLCJsaW5lYXIiLCJkIiwiZXhwb25lbnRpYWwiLCJ5IiwiZ2FtbWEiLCJub2dhbW1hIiwiaW50ZXJwb2xhdGVSZ2IiLCJyZ2JHYW1tYSIsInN0YXJ0IiwiZW5kIiwiY29sb3JSZ2IiLCJpbnRlcnBvbGF0ZU51bWJlciIsInJlQSIsInJlQiIsInplcm8iLCJvbmUiLCJpbnRlcnBvbGF0ZVN0cmluZyIsImJpIiwiYW0iLCJibSIsImJzIiwicSIsIm51bWJlciIsImRlZ3JlZXMiLCJpZGVudGl0eSIsImRlY29tcG9zZSIsImUiLCJmIiwic2NhbGVYIiwic2NhbGVZIiwic2tld1giLCJzdmdOb2RlIiwicGFyc2VDc3MiLCJwYXJzZVN2ZyIsImludGVycG9sYXRlVHJhbnNmb3JtIiwicGFyc2UiLCJweENvbW1hIiwicHhQYXJlbiIsImRlZ1BhcmVuIiwicG9wIiwidHJhbnNsYXRlIiwieGEiLCJ5YSIsInhiIiwieWIiLCJyb3RhdGUiLCJzY2FsZSIsImludGVycG9sYXRlVHJhbnNmb3JtQ3NzIiwiaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmciLCJmcmFtZSIsInRpbWVvdXQiLCJpbnRlcnZhbCIsInBva2VEZWxheSIsInRhc2tIZWFkIiwidGFza1RhaWwiLCJjbG9ja0xhc3QiLCJjbG9ja05vdyIsImNsb2NrU2tldyIsImNsb2NrIiwic2V0RnJhbWUiLCJub3ciLCJjbGVhck5vdyIsIlRpbWVyIiwidGltZXIiLCJkZWxheSIsInRpbWUiLCJzbGVlcCIsInRpbWVyRmx1c2giLCJ3YWtlIiwibmFwIiwicG9rZSIsInQwIiwidDEiLCJ0MiIsImVsYXBzZWQiLCJlbXB0eU9uIiwiZW1wdHlUd2VlbiIsIkNSRUFURUQiLCJTQ0hFRFVMRUQiLCJTVEFSVElORyIsIlNUQVJURUQiLCJSVU5OSU5HIiwiRU5ESU5HIiwiRU5ERUQiLCJzY2hlZHVsZSIsImlkIiwiaW5kZXgiLCJ0aW1pbmciLCJzY2hlZHVsZXMiLCJpbml0Iiwic2VsZiIsInR3ZWVuIiwic3RvcCIsInRpY2siLCJpbnRlcnJ1cHQiLCJhY3RpdmUiLCJzZWxlY3Rpb25faW50ZXJydXB0IiwidHdlZW5SZW1vdmUiLCJ0d2VlbjAiLCJ0d2VlbjEiLCJ0d2VlbkZ1bmN0aW9uIiwidHJhbnNpdGlvbl90d2VlbiIsInR3ZWVuVmFsdWUiLCJ0cmFuc2l0aW9uIiwiaW50ZXJwb2xhdGUiLCJ2YWx1ZTEiLCJzdHJpbmcwMCIsInN0cmluZzEiLCJpbnRlcnBvbGF0ZTAiLCJzdHJpbmcwIiwic3RyaW5nMTAiLCJ0cmFuc2l0aW9uX2F0dHIiLCJhdHRySW50ZXJwb2xhdGUiLCJhdHRySW50ZXJwb2xhdGVOUyIsImF0dHJUd2Vlbk5TIiwiYXR0clR3ZWVuIiwidHJhbnNpdGlvbl9hdHRyVHdlZW4iLCJkZWxheUZ1bmN0aW9uIiwiZGVsYXlDb25zdGFudCIsInRyYW5zaXRpb25fZGVsYXkiLCJkdXJhdGlvbkZ1bmN0aW9uIiwiZHVyYXRpb25Db25zdGFudCIsInRyYW5zaXRpb25fZHVyYXRpb24iLCJlYXNlQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2Vhc2UiLCJlYXNlVmFyeWluZyIsInRyYW5zaXRpb25fZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2ZpbHRlciIsIlRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uX21lcmdlIiwib25GdW5jdGlvbiIsIm9uMCIsIm9uMSIsInNpdCIsInRyYW5zaXRpb25fb24iLCJyZW1vdmVGdW5jdGlvbiIsInRyYW5zaXRpb25fcmVtb3ZlIiwidHJhbnNpdGlvbl9zZWxlY3QiLCJ0cmFuc2l0aW9uX3NlbGVjdEFsbCIsImluaGVyaXQiLCJ0cmFuc2l0aW9uX3NlbGVjdGlvbiIsInN0eWxlTnVsbCIsInN0eWxlIiwic3R5bGVNYXliZVJlbW92ZSIsImxpc3RlbmVyMCIsInRyYW5zaXRpb25fc3R5bGUiLCJzdHlsZUludGVycG9sYXRlIiwic3R5bGVUd2VlbiIsInRyYW5zaXRpb25fc3R5bGVUd2VlbiIsInRyYW5zaXRpb25fdGV4dCIsInRleHRJbnRlcnBvbGF0ZSIsInRleHRUd2VlbiIsInRyYW5zaXRpb25fdGV4dFR3ZWVuIiwidHJhbnNpdGlvbl90cmFuc2l0aW9uIiwiaWQwIiwiaWQxIiwibmV3SWQiLCJ0cmFuc2l0aW9uX2VuZCIsInJlc29sdmUiLCJyZWplY3QiLCJjYW5jZWwiLCJzZWxlY3Rpb25fcHJvdG90eXBlIiwiY3ViaWNJbk91dCIsImRlZmF1bHRUaW1pbmciLCJlYXNlQ3ViaWNJbk91dCIsInNlbGVjdGlvbl90cmFuc2l0aW9uIiwiVHJhbnNmb3JtIiwicG9pbnQiLCJsb2NhdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJlbHQiLCJmaXR0cyIsImJpZ1RhcmdldDEiLCJiaWdUYXJnZXQyIiwic21hbGxUYXJnZXQiLCJwdXJwb3NlIiwiaGljayIsImcxIiwiZzIiLCJnMyIsImc0IiwiZzUiLCJnNiIsImpha29iIiwiYXBwMSIsImFwcDIiLCJ5b3VyQXBwIiwiZ3JhZGllbnQiLCJnZXN0YWx0IiwicHJveGltaXR5Iiwib2Zmc2V0Iiwic2ltaWxhcml0eSIsIm15Q2xhc3MiLCJjb25maWciLCJ2YWx1ZXMiLCJhbGwiLCJTVkdUb29sIiwiX19wdWJsaWNGaWVsZCIsImNvbnRhaW5lciIsImVsdE5hbWUiLCJpbml0aWFsQXR0cmlidXRlcyIsImZpbmFsQXR0cmlidXRlcyIsIm9wdHMiLCJkMy5zZWxlY3QiLCJkMy5lYXNlTGluZWFyIiwicmVnZXgiLCJjeCIsImN5IiwicG9pbnRzIiwid2lkdGgiLCJoZWlnaHQiLCJpbnRlbnNpdHkiLCJpbml0VGhlbWUiLCJpc0RhcmsiLCJjbCIsImNvbG9yU2NoZW1lIiwic3ZnVG9vbCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBSUEsS0FBTyxFQUFDLE9BQU8sTUFBTTtBQUFBLEVBQUU7QUFFM0IsU0FBU0MsS0FBVztBQUNsQixXQUFTQyxJQUFJLEdBQUdDLElBQUksVUFBVSxRQUFRQyxJQUFJLENBQUEsR0FBSUMsR0FBR0gsSUFBSUMsR0FBRyxFQUFFRCxHQUFHO0FBQzNELFFBQUksRUFBRUcsSUFBSSxVQUFVSCxDQUFDLElBQUksT0FBUUcsS0FBS0QsS0FBTSxRQUFRLEtBQUtDLENBQUM7QUFBRyxZQUFNLElBQUksTUFBTSxtQkFBbUJBLENBQUM7QUFDakcsSUFBQUQsRUFBRUMsQ0FBQyxJQUFJO0VBQ1I7QUFDRCxTQUFPLElBQUlDLEVBQVNGLENBQUM7QUFDdkI7QUFFQSxTQUFTRSxFQUFTRixH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QixZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFBQSxFQUN0QixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUEsRUFDZixLQUFLO0FBQUEsRUFDTCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixRQUFRO0FBQUEsRUFDUixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxZQUFZO0FBQUEsRUFDWixRQUFRO0FBQUEsRUFDUixhQUFhO0FBQ2Y7QUFF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
