var de = Object.defineProperty;
var ye = (t, e, n) => e in t ? de(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var R = (t, e, n) => (ye(t, typeof e != "symbol" ? e + "" : e, n), n);
var _e = { value: () => {
} };
function Pt() {
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
function me(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
W.prototype = Pt.prototype = {
  constructor: W,
  on: function(t, e) {
    var n = this._, r = me(t + "", n), i, o = -1, s = r.length;
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
        n[i] = Ct(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = Ct(n[i], t.name, null);
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
function Ct(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = _e, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ct = "http://www.w3.org/1999/xhtml";
const St = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ct,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function it(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), St.hasOwnProperty(e) ? { space: St[e], local: t } : t;
}
function we(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ct && e.documentElement.namespaceURI === ct ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function xe(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xt(t) {
  var e = it(t);
  return (e.local ? xe : we)(e);
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
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), l, c, u = 0; u < s; ++u)
      (l = o[u]) && (c = t.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new m(r, this._parents);
}
function Ce(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Se() {
  return [];
}
function Ot(t) {
  return t == null ? Se : function() {
    return this.querySelectorAll(t);
  };
}
function ke(t) {
  return function() {
    return Ce(t.apply(this, arguments));
  };
}
function Ee(t) {
  typeof t == "function" ? t = ke(t) : t = Ot(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), i.push(l));
  return new m(r, i);
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
var Ae = Array.prototype.find;
function $e(t) {
  return function() {
    return Ae.call(this.children, t);
  };
}
function Re() {
  return this.firstElementChild;
}
function Te(t) {
  return this.select(t == null ? Re : $e(typeof t == "function" ? t : Yt(t)));
}
var Ge = Array.prototype.filter;
function Me() {
  return Array.from(this.children);
}
function Ve(t) {
  return function() {
    return Ge.call(this.children, t);
  };
}
function Fe(t) {
  return this.selectAll(t == null ? Me : Ve(typeof t == "function" ? t : Yt(t)));
}
function De(t) {
  typeof t != "function" && (t = Lt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new m(r, this._parents);
}
function zt(t) {
  return new Array(t.length);
}
function Ie() {
  return new m(this._enter || this._groups.map(zt), this._parents);
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
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Z(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (i[s] = a);
}
function Pe(t, e, n, r, i, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), u = e.length, f = o.length, h = new Array(u), p;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (h[a] = p = s.call(l, l.__data__, a, e) + "", c.has(p) ? i[a] = l : c.set(p, l));
  for (a = 0; a < f; ++a)
    p = s.call(t, o[a], a, o) + "", (l = c.get(p)) ? (r[a] = l, l.__data__ = o[a], c.delete(p)) : n[a] = new Z(t, o[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && c.get(h[a]) === l && (i[a] = l);
}
function Xe(t) {
  return t.__data__;
}
function Oe(t, e) {
  if (!arguments.length)
    return Array.from(this, Xe);
  var n = e ? Pe : He, r = this._parents, i = this._groups;
  typeof t != "function" && (t = qe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = r[c], f = i[c], h = f.length, p = Le(t.call(u, u && u.__data__, c, r)), d = p.length, y = a[c] = new Array(d), k = s[c] = new Array(d), ge = l[c] = new Array(h);
    n(u, f, y, k, ge, p, e);
    for (var V = 0, z = 0, bt, Nt; V < d; ++V)
      if (bt = y[V]) {
        for (V >= z && (z = V + 1); !(Nt = k[z]) && ++z < d; )
          ;
        bt._next = Nt || null;
      }
  }
  return s = new m(s, r), s._enter = a, s._exit = l, s;
}
function Le(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ye() {
  return new m(this._exit || this._groups.map(zt), this._parents);
}
function ze(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Be(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), l = 0; l < s; ++l)
    for (var c = n[l], u = r[l], f = c.length, h = a[l] = new Array(f), p, d = 0; d < f; ++d)
      (p = c[d] || u[d]) && (h[d] = p);
  for (; l < i; ++l)
    a[l] = n[l];
  return new m(a, this._parents);
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
    for (var s = n[o], a = s.length, l = i[o] = new Array(a), c, u = 0; u < a; ++u)
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new m(i, this._parents).order();
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
function ln(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function cn(t, e) {
  var n = it(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? rn : nn : typeof e == "function" ? n.local ? ln : an : n.local ? sn : on)(n, e));
}
function Bt(t) {
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
function pn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? un : typeof e == "function" ? hn : fn)(t, e, n ?? "")) : G(this.node(), t);
}
function G(t, e) {
  return t.style.getPropertyValue(e) || Bt(t).getComputedStyle(t, null).getPropertyValue(e);
}
function gn(t) {
  return function() {
    delete this[t];
  };
}
function dn(t, e) {
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
  return arguments.length > 1 ? this.each((e == null ? gn : typeof e == "function" ? yn : dn)(t, e)) : this.node()[t];
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
function mn(t) {
  return function() {
    Wt(this, t);
  };
}
function vn(t) {
  return function() {
    Jt(this, t);
  };
}
function wn(t, e) {
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
  return this.each((typeof e == "function" ? wn : e ? mn : vn)(n, e));
}
function bn() {
  this.textContent = "";
}
function Nn(t) {
  return function() {
    this.textContent = t;
  };
}
function Cn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Sn(t) {
  return arguments.length ? this.each(t == null ? bn : (typeof t == "function" ? Cn : Nn)(t)) : this.node().textContent;
}
function kn() {
  this.innerHTML = "";
}
function En(t) {
  return function() {
    this.innerHTML = t;
  };
}
function An(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function $n(t) {
  return arguments.length ? this.each(t == null ? kn : (typeof t == "function" ? An : En)(t)) : this.node().innerHTML;
}
function Rn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Tn() {
  return this.each(Rn);
}
function Gn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mn() {
  return this.each(Gn);
}
function Vn(t) {
  var e = typeof t == "function" ? t : Xt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Fn() {
  return null;
}
function Dn(t, e) {
  var n = typeof t == "function" ? t : Xt(t), r = e == null ? Fn : typeof e == "function" ? e : yt(e);
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
function Pn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xn(t) {
  return this.select(t ? Pn : Hn);
}
function On(t) {
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
function zn(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Bn(t, e, n) {
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
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (i = 0, u = a[l]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? Bn : zn, i = 0; i < o; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Qt(t, e, n) {
  var r = Bt(t), i = r.CustomEvent;
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
function m(t, e) {
  this._groups = t, this._parents = e;
}
function L() {
  return new m([[document.documentElement]], Zt);
}
function Zn() {
  return this;
}
m.prototype = L.prototype = {
  constructor: m,
  select: Ne,
  selectAll: Ee,
  selectChild: Te,
  selectChildren: Fe,
  filter: De,
  data: Oe,
  enter: Ie,
  exit: Ye,
  join: ze,
  merge: Be,
  selection: Zn,
  order: Ue,
  sort: Ke,
  call: Je,
  nodes: Qe,
  node: Ze,
  size: je,
  empty: tn,
  each: en,
  attr: cn,
  style: pn,
  property: _n,
  classed: xn,
  text: Sn,
  html: $n,
  raise: Tn,
  lower: Mn,
  append: Vn,
  insert: Dn,
  remove: qn,
  clone: Xn,
  datum: On,
  on: Un,
  dispatch: Jn,
  [Symbol.iterator]: Qn
};
function jn(t) {
  return typeof t == "string" ? new m([[document.querySelector(t)]], [document.documentElement]) : new m([[t]], Zt);
}
function mt(t, e, n) {
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
var H = 0.7, j = 1 / H, T = "\\s*([+-]?\\d+)\\s*", P = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tr = /^#([0-9a-f]{3,8})$/, er = new RegExp(`^rgb\\(${T},${T},${T}\\)$`), nr = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), rr = new RegExp(`^rgba\\(${T},${T},${T},${P}\\)$`), ir = new RegExp(`^rgba\\(${x},${x},${x},${P}\\)$`), or = new RegExp(`^hsl\\(${P},${x},${x}\\)$`), sr = new RegExp(`^hsla\\(${P},${x},${x},${P}\\)$`), kt = {
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
mt(Y, X, {
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
  formatHsl: lr,
  formatRgb: At,
  toString: At
});
function Et() {
  return this.rgb().formatHex();
}
function ar() {
  return this.rgb().formatHex8();
}
function lr() {
  return te(this).formatHsl();
}
function At() {
  return this.rgb().formatRgb();
}
function X(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = tr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? $t(e) : n === 3 ? new _(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? B(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? B(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = er.exec(t)) ? new _(e[1], e[2], e[3], 1) : (e = nr.exec(t)) ? new _(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = rr.exec(t)) ? B(e[1], e[2], e[3], e[4]) : (e = ir.exec(t)) ? B(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = or.exec(t)) ? Gt(e[1], e[2] / 100, e[3] / 100, 1) : (e = sr.exec(t)) ? Gt(e[1], e[2] / 100, e[3] / 100, e[4]) : kt.hasOwnProperty(t) ? $t(kt[t]) : t === "transparent" ? new _(NaN, NaN, NaN, 0) : null;
}
function $t(t) {
  return new _(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function B(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new _(t, e, n, r);
}
function cr(t) {
  return t instanceof Y || (t = X(t)), t ? (t = t.rgb(), new _(t.r, t.g, t.b, t.opacity)) : new _();
}
function ut(t, e, n, r) {
  return arguments.length === 1 ? cr(t) : new _(t, e, n, r ?? 1);
}
function _(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
mt(_, ut, jt(Y, {
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
    return new _(A(this.r), A(this.g), A(this.b), tt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Rt,
  // Deprecated! Use color.formatHex.
  formatHex: Rt,
  formatHex8: ur,
  formatRgb: Tt,
  toString: Tt
}));
function Rt() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}`;
}
function ur() {
  return `#${E(this.r)}${E(this.g)}${E(this.b)}${E((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tt() {
  const t = tt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${A(this.r)}, ${A(this.g)}, ${A(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function tt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function A(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function E(t) {
  return t = A(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Gt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new v(t, e, n, r);
}
function te(t) {
  if (t instanceof v)
    return new v(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = X(t)), !t)
    return new v();
  if (t instanceof v)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, l = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? o + i : 2 - o - i, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new v(s, a, l, t.opacity);
}
function fr(t, e, n, r) {
  return arguments.length === 1 ? te(t) : new v(t, e, n, r ?? 1);
}
function v(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
mt(v, fr, jt(Y, {
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
    return new v(Mt(this.h), U(this.s), U(this.l), tt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = tt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Mt(this.h)}, ${U(this.s) * 100}%, ${U(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Mt(t) {
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
function gr(t) {
  return (t = +t) == 1 ? ne : function(e, n) {
    return n - e ? pr(e, n, t) : ee(isNaN(e) ? n : e);
  };
}
function ne(t, e) {
  var n = e - t;
  return n ? hr(t, n) : ee(isNaN(t) ? e : t);
}
const Vt = function t(e) {
  var n = gr(e);
  function r(i, o) {
    var s = n((i = ut(i)).r, (o = ut(o)).r), a = n(i.g, o.g), l = n(i.b, o.b), c = ne(i.opacity, o.opacity);
    return function(u) {
      return i.r = s(u), i.g = a(u), i.b = l(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function S(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var ft = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, lt = new RegExp(ft.source, "g");
function dr(t) {
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
  var n = ft.lastIndex = lt.lastIndex = 0, r, i, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = ft.exec(t)) && (i = lt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, l.push({ i: s, x: S(r, i) })), n = lt.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? yr(l[0].x) : dr(e) : (e = l.length, function(c) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(c);
    return a.join("");
  });
}
var Ft = 180 / Math.PI, ht = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function re(t, e, n, r, i, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * r) && (n -= t * l, r -= e * l), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, l /= a), t * r < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Ft,
    skewX: Math.atan(l) * Ft,
    scaleX: s,
    scaleY: a
  };
}
var K;
function mr(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ht : re(e.a, e.b, e.c, e.d, e.e, e.f);
}
function vr(t) {
  return t == null || (K || (K = document.createElementNS("http://www.w3.org/2000/svg", "g")), K.setAttribute("transform", t), !(t = K.transform.baseVal.consolidate())) ? ht : (t = t.matrix, re(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ie(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, f, h, p, d) {
    if (c !== f || u !== h) {
      var y = p.push("translate(", null, e, null, n);
      d.push({ i: y - 4, x: S(c, f) }, { i: y - 2, x: S(u, h) });
    } else
      (f || h) && p.push("translate(" + f + e + h + n);
  }
  function s(c, u, f, h) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: S(c, u) })) : u && f.push(i(f) + "rotate(" + u + r);
  }
  function a(c, u, f, h) {
    c !== u ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: S(c, u) }) : u && f.push(i(f) + "skewX(" + u + r);
  }
  function l(c, u, f, h, p, d) {
    if (c !== f || u !== h) {
      var y = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: y - 4, x: S(c, f) }, { i: y - 2, x: S(u, h) });
    } else
      (f !== 1 || h !== 1) && p.push(i(p) + "scale(" + f + "," + h + ")");
  }
  return function(c, u) {
    var f = [], h = [];
    return c = t(c), u = t(u), o(c.translateX, c.translateY, u.translateX, u.translateY, f, h), s(c.rotate, u.rotate, f, h), a(c.skewX, u.skewX, f, h), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, f, h), c = u = null, function(p) {
      for (var d = -1, y = h.length, k; ++d < y; )
        f[(k = h[d]).i] = k.x(p);
      return f.join("");
    };
  };
}
var wr = ie(mr, "px, ", "px)", "deg)"), xr = ie(vr, ", ", ")", ")"), M = 0, D = 0, F = 0, oe = 1e3, et, I, nt = 0, $ = 0, ot = 0, O = typeof performance == "object" && performance.now ? performance : Date, se = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function vt() {
  return $ || (se(br), $ = O.now() + ot);
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
    n = (n == null ? vt() : +n) + (e == null ? 0 : +e), !this._next && I !== this && (I ? I._next = this : et = this, I = this), this._call = t, this._time = n, pt();
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
  vt(), ++M;
  for (var t = et, e; t; )
    (e = $ - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --M;
}
function Dt() {
  $ = (nt = O.now()) + ot, M = D = 0;
  try {
    Nr();
  } finally {
    M = 0, Sr(), $ = 0;
  }
}
function Cr() {
  var t = O.now(), e = t - nt;
  e > oe && (ot -= e, nt = t);
}
function Sr() {
  for (var t, e = et, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : et = n);
  I = t, pt(r);
}
function pt(t) {
  if (!M) {
    D && (D = clearTimeout(D));
    var e = t - $;
    e > 24 ? (t < 1 / 0 && (D = setTimeout(Dt, t - O.now() - ot)), F && (F = clearInterval(F))) : (F || (nt = O.now(), F = setInterval(Cr, oe)), M = 1, se(Dt));
  }
}
function It(t, e, n) {
  var r = new rt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var kr = Pt("start", "end", "cancel", "interrupt"), Er = [], le = 0, qt = 1, gt = 2, J = 3, Ht = 4, dt = 5, Q = 6;
function st(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  Ar(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: kr,
    tween: Er,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: le
  });
}
function wt(t, e) {
  var n = w(t, e);
  if (n.state > le)
    throw new Error("too late; already scheduled");
  return n;
}
function b(t, e) {
  var n = w(t, e);
  if (n.state > J)
    throw new Error("too late; already running");
  return n;
}
function w(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Ar(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = ae(o, 0, n.time);
  function o(c) {
    n.state = qt, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, f, h, p;
    if (n.state !== qt)
      return l();
    for (u in r)
      if (p = r[u], p.name === n.name) {
        if (p.state === J)
          return It(s);
        p.state === Ht ? (p.state = Q, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[u]) : +u < e && (p.state = Q, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[u]);
      }
    if (It(function() {
      n.state === J && (n.state = Ht, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = gt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === gt) {
      for (n.state = J, i = new Array(h = n.tween.length), u = 0, f = -1; u < h; ++u)
        (p = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = p);
      i.length = f + 1;
    }
  }
  function a(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = dt, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, u);
    n.state === dt && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Q, n.timer.stop(), delete r[e];
    for (var c in r)
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
      i = r.state > gt && r.state < dt, r.state = Q, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Rr(t) {
  return this.each(function() {
    $r(this, t);
  });
}
function Tr(t, e) {
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
function Gr(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = b(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = a;
          break;
        }
      l === c && i.push(a);
    }
    o.tween = i;
  };
}
function Mr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = w(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Tr : Gr)(n, t, e));
}
function xt(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = b(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return w(i, r).value[e];
  };
}
function ce(t, e) {
  var n;
  return (typeof e == "number" ? S : e instanceof X ? Vt : (n = X(e)) ? (e = n, Vt) : _r)(t, e);
}
function Vr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Fr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Dr(t, e, n) {
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
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a)));
  };
}
function Hr(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a)));
  };
}
function Pr(t, e) {
  var n = it(t), r = n === "transform" ? xr : ce;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Hr : qr)(n, r, xt(this, "attr." + t, e)) : e == null ? (n.local ? Fr : Vr)(n) : (n.local ? Ir : Dr)(n, r, e));
}
function Xr(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Or(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Lr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Or(t, o)), n;
  }
  return i._value = e, i;
}
function Yr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Xr(t, o)), n;
  }
  return i._value = e, i;
}
function zr(t, e) {
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
function Br(t, e) {
  return function() {
    wt(this, t).delay = +e.apply(this, arguments);
  };
}
function Ur(t, e) {
  return e = +e, function() {
    wt(this, t).delay = e;
  };
}
function Kr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Br : Ur)(e, t)) : w(this.node(), e).delay;
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
  return arguments.length ? this.each((typeof t == "function" ? Wr : Jr)(e, t)) : w(this.node(), e).duration;
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
  return arguments.length ? this.each(Zr(e, t)) : w(this.node(), e).ease;
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
    for (var o = e[i], s = o.length, a = r[i] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new C(r, this._parents, this._name, this._id);
}
function ri(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], c = n[a], u = l.length, f = s[a] = new Array(u), h, p = 0; p < u; ++p)
      (h = l[p] || c[p]) && (f[p] = h);
  for (; a < r; ++a)
    s[a] = e[a];
  return new C(s, this._parents, this._name, this._id);
}
function ii(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function oi(t, e, n) {
  var r, i, o = ii(e) ? wt : b;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function si(t, e) {
  var n = this._id;
  return arguments.length < 2 ? w(this.node(), n).on.on(t) : this.each(oi(n, t, e));
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
function li() {
  return this.on("end.remove", ai(this._id));
}
function ci(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = yt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], l = a.length, c = o[s] = new Array(l), u, f, h = 0; h < l; ++h)
      (u = a[h]) && (f = t.call(u, u.__data__, h, a)) && ("__data__" in u && (f.__data__ = u.__data__), c[h] = f, st(c[h], e, n, h, c, w(u, n)));
  return new C(o, this._parents, e, n);
}
function ui(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ot(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var l = r[a], c = l.length, u, f = 0; f < c; ++f)
      if (u = l[f]) {
        for (var h = t.call(u, u.__data__, f, l), p, d = w(u, n), y = 0, k = h.length; y < k; ++y)
          (p = h[y]) && st(p, e, n, y, h, d);
        o.push(h), s.push(u);
      }
  return new C(o, s, e, n);
}
var fi = L.prototype.constructor;
function hi() {
  return new fi(this._groups, this._parents);
}
function pi(t, e) {
  var n, r, i;
  return function() {
    var o = G(this, t), s = (this.style.removeProperty(t), G(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function ue(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = G(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function di(t, e, n) {
  var r, i, o;
  return function() {
    var s = G(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), G(this, t))), s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a));
  };
}
function yi(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = b(this, t), c = l.on, u = l.value[o] == null ? a || (a = ue(e)) : void 0;
    (c !== n || i !== u) && (r = (n = c).copy()).on(s, i = u), l.on = r;
  };
}
function _i(t, e, n) {
  var r = (t += "") == "transform" ? wr : ce;
  return e == null ? this.styleTween(t, pi(t, r)).on("end.style." + t, ue(t)) : typeof e == "function" ? this.styleTween(t, di(t, r, xt(this, "style." + t, e))).each(yi(this._id, t)) : this.styleTween(t, gi(t, r, e), n).on("end.style." + t, null);
}
function mi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function vi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && mi(t, s, n)), r;
  }
  return o._value = e, o;
}
function wi(t, e, n) {
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
function Ci(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Si(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ci(i)), e;
  }
  return r._value = t, r;
}
function ki(t) {
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
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var u = w(l, e);
        st(l, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new C(r, this._parents, t, n);
}
function Ai() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var c = b(this, r), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), i === 0 && o();
  });
}
var $i = 0;
function C(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function fe() {
  return ++$i;
}
var N = L.prototype;
C.prototype = {
  constructor: C,
  select: ci,
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
  attr: Pr,
  attrTween: zr,
  style: _i,
  styleTween: wi,
  text: Ni,
  textTween: ki,
  remove: li,
  tween: Mr,
  delay: Kr,
  duration: Qr,
  ease: jr,
  easeVarying: ei,
  end: Ai,
  [Symbol.iterator]: N[Symbol.iterator]
};
const Ri = (t) => +t;
function Ti(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Gi = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ti
};
function Mi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Vi(t) {
  var e, n;
  t instanceof C ? (e = t._id, t = t._name) : (e = fe(), (n = Gi).time = vt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && st(l, t, e, c, s, n || Mi(l, e));
  return new C(r, this._parents, t, e);
}
L.prototype.interrupt = Rr;
L.prototype.transition = Vi;
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
}, Fi = (t) => {
  const e = g("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const n = g("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const r = g("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Di = (t) => {
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
}, Pi = (t) => {
  const e = g("svg.gestalt g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Xi = (t) => {
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
}, Oi = (t) => {
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
}, Li = (t) => {
  const e = g("svg.commonRegion g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Yi = (t) => {
  const e = g("svg.simplicity g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2), t.createRect(e, 100 - 8, 12, 97, 77, 2);
}, zi = (t) => {
  const e = g("svg.miller g", SVGGElement);
  t.createCircle(e, 130, 20, 5, { class: "full" }), t.createCircle(e, 150, 20, 5, { class: "full" }), t.createCircle(e, 170, 20, 5, { class: "full" }), t.createCircle(e, 170, 40, 5, { class: "full" }), t.createCircle(e, 170, 60, 5, { class: "full" }), t.createCircle(e, 170, 80, 5, { class: "full" });
}, Bi = (t) => {
  const e = g("svg.tesler g", SVGGElement);
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 20, 5, {
      class: n >= 3 ? "empty" : "full"
    });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 50, 5, { class: n % 2 ? "empty" : "full" });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 80, 5, { class: n < 3 ? "empty" : "full" });
}, Ui = (t) => {
  const e = g("svg.postel g", SVGGElement);
  t.createCircle(e, 80, 50, 35, { class: "full" }), t.createCircle(e, 220, 50, 35, { class: "empty" });
}, Ki = (t) => {
  const e = g("svg.zeigarnik g", SVGGElement);
  for (let n = 1; n < 5; n++)
    t.createRect(e, 50, n * 15, 200, 10, 6, "emptyrect");
  t.createRect(e, 50, 5 * 15, 150, 10, 6, "fullrect");
}, Wi = (t) => {
  const e = g("svg.vonRestorff g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n === 2 && r === 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, he = {
  fitts: [Fi],
  purpose: [Di],
  hick: [Ii],
  jakob: [qi],
  gradient: [Hi],
  gestalt: [Pi],
  proximity: [Xi],
  similarity: [Oi],
  commonRegion: [Li],
  simplicity: [Yi],
  miller: [zi],
  tesler: [Bi],
  postel: [Ui],
  zeigarnik: [Ki],
  vonRestorff: [Wi]
}, pe = /* @__PURE__ */ new Set();
for (const t of Object.values(he))
  for (const e of t)
    pe.add(e);
const Ji = [...pe];
class Qi {
  constructor() {
    R(this, "delayCounter", 0);
    R(this, "delayIncrement", 100);
    R(this, "useTransition", !1);
    R(this, "svgName");
    R(this, "createForm", (e, n, r, i, o) => {
      const s = {
        duration: 2e3,
        delay: 1e3,
        class: "",
        ...o
      };
      this.useTransition || (s.delay = 0, s.duration = 0);
      const a = jn(e).append(n);
      for (const [c, u] of Object.entries(r))
        a.attr(c, u);
      s.class && a.attr("class", s.class);
      const l = a.transition().duration(s.duration).delay(s.delay).ease(Ri);
      for (const [c, u] of Object.entries(i))
        l.attr(c, u);
    });
    this.initSvgName();
  }
  initSvgName() {
    const e = window.uxlawImageName;
    if (e) {
      this.svgName = e, this.useTransition = !0;
      return;
    }
    this.useTransition = !1;
  }
  initSvg() {
    const e = this.svgName ? he[this.svgName] : Ji;
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
  createRect(e, n, r, i, o, s = 6, a = "empty") {
    return this.createForm(
      e,
      "rect",
      { x: n, y: r, width: i, height: 0, opacity: s * (1 / 6) },
      { height: o },
      {
        duration: 300,
        delay: this.getDelay(),
        class: a
      }
    );
  }
}
const Zi = () => {
  ji(), document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  ), document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 0%, 25%, 0.1)"
  );
}, ji = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
Zi();
const to = new Qi();
to.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9ncmFkaWVudC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL2dlc3RhbHQudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9wcm94aW1pdHkudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zaW1pbGFyaXR5LnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvY29tbW9uUmVnaW9uLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc2ltcGxpY2l0eS50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL21pbGxlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Rlc2xlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Bvc3RlbC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3plaWdhcm5pay50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3ZvblJlc3RvcmZmLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z0NvbmZpZy50cyIsIi4uLy4uLy4uL3NyYy9TVkdUb29sLnRzIiwiLi4vLi4vLi4vc3JjL3RoZW1lLnRzIiwiLi4vLi4vLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vb3AgPSB7dmFsdWU6ICgpID0+IHt9fTtcblxuZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gYXJndW1lbnRzLmxlbmd0aCwgXyA9IHt9LCB0OyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKCEodCA9IGFyZ3VtZW50c1tpXSArIFwiXCIpIHx8ICh0IGluIF8pIHx8IC9bXFxzLl0vLnRlc3QodCkpIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgdHlwZTogXCIgKyB0KTtcbiAgICBfW3RdID0gW107XG4gIH1cbiAgcmV0dXJuIG5ldyBEaXNwYXRjaChfKTtcbn1cblxuZnVuY3Rpb24gRGlzcGF0Y2goXykge1xuICB0aGlzLl8gPSBfO1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMsIHR5cGVzKSB7XG4gIHJldHVybiB0eXBlbmFtZXMudHJpbSgpLnNwbGl0KC9efFxccysvKS5tYXAoZnVuY3Rpb24odCkge1xuICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgbmFtZSA9IHQuc2xpY2UoaSArIDEpLCB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICBpZiAodCAmJiAhdHlwZXMuaGFzT3duUHJvcGVydHkodCkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0KTtcbiAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICB9KTtcbn1cblxuRGlzcGF0Y2gucHJvdG90eXBlID0gZGlzcGF0Y2gucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogRGlzcGF0Y2gsXG4gIG9uOiBmdW5jdGlvbih0eXBlbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgXyA9IHRoaXMuXyxcbiAgICAgICAgVCA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiwgXyksXG4gICAgICAgIHQsXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IFQubGVuZ3RoO1xuXG4gICAgLy8gSWYgbm8gY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmV0dXJuIHRoZSBjYWxsYmFjayBvZiB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSAmJiAodCA9IGdldChfW3RdLCB0eXBlbmFtZS5uYW1lKSkpIHJldHVybiB0O1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIGEgdHlwZSB3YXMgc3BlY2lmaWVkLCBzZXQgdGhlIGNhbGxiYWNrIGZvciB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICAvLyBPdGhlcndpc2UsIGlmIGEgbnVsbCBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZW1vdmUgY2FsbGJhY2tzIG9mIHRoZSBnaXZlbiBuYW1lLlxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGNhbGxiYWNrOiBcIiArIGNhbGxiYWNrKTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIGVsc2UgaWYgKGNhbGxiYWNrID09IG51bGwpIGZvciAodCBpbiBfKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29weSA9IHt9LCBfID0gdGhpcy5fO1xuICAgIGZvciAodmFyIHQgaW4gXykgY29weVt0XSA9IF9bdF0uc2xpY2UoKTtcbiAgICByZXR1cm4gbmV3IERpc3BhdGNoKGNvcHkpO1xuICB9LFxuICBjYWxsOiBmdW5jdGlvbih0eXBlLCB0aGF0KSB7XG4gICAgaWYgKChuID0gYXJndW1lbnRzLmxlbmd0aCAtIDIpID4gMCkgZm9yICh2YXIgYXJncyA9IG5ldyBBcnJheShuKSwgaSA9IDAsIG4sIHQ7IGkgPCBuOyArK2kpIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9LFxuICBhcHBseTogZnVuY3Rpb24odHlwZSwgdGhhdCwgYXJncykge1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh2YXIgdCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0KHR5cGUsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aCwgYzsgaSA8IG47ICsraSkge1xuICAgIGlmICgoYyA9IHR5cGVbaV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXQodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgIGlmICh0eXBlW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHR5cGVbaV0gPSBub29wLCB0eXBlID0gdHlwZS5zbGljZSgwLCBpKS5jb25jYXQodHlwZS5zbGljZShpICsgMSkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChjYWxsYmFjayAhPSBudWxsKSB0eXBlLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiBjYWxsYmFja30pO1xuICByZXR1cm4gdHlwZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGF0Y2g7XG4iLCJleHBvcnQgdmFyIHhodG1sID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHhodG1sOiB4aHRtbCxcbiAgeGxpbms6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxuICB4bWw6IFwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCIsXG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvXCJcbn07XG4iLCJpbXBvcnQgbmFtZXNwYWNlcyBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIHByZWZpeCA9IG5hbWUgKz0gXCJcIiwgaSA9IHByZWZpeC5pbmRleE9mKFwiOlwiKTtcbiAgaWYgKGkgPj0gMCAmJiAocHJlZml4ID0gbmFtZS5zbGljZSgwLCBpKSkgIT09IFwieG1sbnNcIikgbmFtZSA9IG5hbWUuc2xpY2UoaSArIDEpO1xuICByZXR1cm4gbmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpID8ge3NwYWNlOiBuYW1lc3BhY2VzW3ByZWZpeF0sIGxvY2FsOiBuYW1lfSA6IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG59XG4iLCJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuL25hbWVzcGFjZS5qc1wiO1xuaW1wb3J0IHt4aHRtbH0gZnJvbSBcIi4vbmFtZXNwYWNlcy5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdG9ySW5oZXJpdChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQsXG4gICAgICAgIHVyaSA9IHRoaXMubmFtZXNwYWNlVVJJO1xuICAgIHJldHVybiB1cmkgPT09IHhodG1sICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IHhodG1sXG4gICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxuICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdG9yRml4ZWQoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gKGZ1bGxuYW1lLmxvY2FsXG4gICAgICA/IGNyZWF0b3JGaXhlZFxuICAgICAgOiBjcmVhdG9ySW5oZXJpdCkoZnVsbG5hbWUpO1xufVxuIiwiZnVuY3Rpb24gbm9uZSgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gbm9uZSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiLy8gR2l2ZW4gc29tZXRoaW5nIGFycmF5IGxpa2UgKG9yIG51bGwpLCByZXR1cm5zIHNvbWV0aGluZyB0aGF0IGlzIHN0cmljdGx5IGFuXG4vLyBhcnJheS4gVGhpcyBpcyB1c2VkIHRvIGVuc3VyZSB0aGF0IGFycmF5LWxpa2Ugb2JqZWN0cyBwYXNzZWQgdG8gZDMuc2VsZWN0QWxsXG4vLyBvciBzZWxlY3Rpb24uc2VsZWN0QWxsIGFyZSBjb252ZXJ0ZWQgaW50byBwcm9wZXIgYXJyYXlzIHdoZW4gY3JlYXRpbmcgYVxuLy8gc2VsZWN0aW9uOyB3ZSBkb27igJl0IGV2ZXIgd2FudCB0byBjcmVhdGUgYSBzZWxlY3Rpb24gYmFja2VkIGJ5IGEgbGl2ZVxuLy8gSFRNTENvbGxlY3Rpb24gb3IgTm9kZUxpc3QuIEhvd2V2ZXIsIG5vdGUgdGhhdCBzZWxlY3Rpb24uc2VsZWN0QWxsIHdpbGwgdXNlIGFcbi8vIHN0YXRpYyBOb2RlTGlzdCBhcyBhIGdyb3VwLCBzaW5jZSBpdCBzYWZlbHkgZGVyaXZlZCBmcm9tIHF1ZXJ5U2VsZWN0b3JBbGwuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheSh4KSB7XG4gIHJldHVybiB4ID09IG51bGwgPyBbXSA6IEFycmF5LmlzQXJyYXkoeCkgPyB4IDogQXJyYXkuZnJvbSh4KTtcbn1cbiIsImZ1bmN0aW9uIGVtcHR5KCkge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gZW1wdHkgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IGFycmF5IGZyb20gXCIuLi9hcnJheS5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yQWxsIGZyb20gXCIuLi9zZWxlY3RvckFsbC5qc1wiO1xuXG5mdW5jdGlvbiBhcnJheUFsbChzZWxlY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcnJheShzZWxlY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCA9PT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBhcnJheUFsbChzZWxlY3QpO1xuICBlbHNlIHNlbGVjdCA9IHNlbGVjdG9yQWxsKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gW10sIHBhcmVudHMgPSBbXSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc3ViZ3JvdXBzLnB1c2goc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKTtcbiAgICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE1hdGNoZXIoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuIiwiaW1wb3J0IHtjaGlsZE1hdGNoZXJ9IGZyb20gXCIuLi9tYXRjaGVyLmpzXCI7XG5cbnZhciBmaW5kID0gQXJyYXkucHJvdG90eXBlLmZpbmQ7XG5cbmZ1bmN0aW9uIGNoaWxkRmluZChtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbmQuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoaWxkRmlyc3QoKSB7XG4gIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QobWF0Y2ggPT0gbnVsbCA/IGNoaWxkRmlyc3RcbiAgICAgIDogY2hpbGRGaW5kKHR5cGVvZiBtYXRjaCA9PT0gXCJmdW5jdGlvblwiID8gbWF0Y2ggOiBjaGlsZE1hdGNoZXIobWF0Y2gpKSk7XG59XG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbHRlciA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXI7XG5cbmZ1bmN0aW9uIGNoaWxkcmVuKCkge1xuICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5GaWx0ZXIobWF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdEFsbChtYXRjaCA9PSBudWxsID8gY2hpbGRyZW5cbiAgICAgIDogY2hpbGRyZW5GaWx0ZXIodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoZXIgZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cGRhdGUpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh1cGRhdGUubGVuZ3RoKTtcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2VudGVyIHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbnRlck5vZGUocGFyZW50LCBkYXR1bSkge1xuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBwYXJlbnQub3duZXJEb2N1bWVudDtcbiAgdGhpcy5uYW1lc3BhY2VVUkkgPSBwYXJlbnQubmFtZXNwYWNlVVJJO1xuICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9fZGF0YV9fID0gZGF0dW07XG59XG5cbkVudGVyTm9kZS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBFbnRlck5vZGUsXG4gIGFwcGVuZENoaWxkOiBmdW5jdGlvbihjaGlsZCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5fbmV4dCk7IH0sXG4gIGluc2VydEJlZm9yZTogZnVuY3Rpb24oY2hpbGQsIG5leHQpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIG5leHQpOyB9LFxuICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyB9LFxuICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpOyB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7RW50ZXJOb2RlfSBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBiaW5kSW5kZXgocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSkge1xuICB2YXIgaSA9IDAsXG4gICAgICBub2RlLFxuICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGZpdCBpbnRvIHVwZGF0ZS5cbiAgLy8gUHV0IGFueSBudWxsIG5vZGVzIGludG8gZW50ZXIuXG4gIC8vIFB1dCBhbnkgcmVtYWluaW5nIGRhdGEgaW50byBlbnRlci5cbiAgZm9yICg7IGkgPCBkYXRhTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBkb27igJl0IGZpdCBpbnRvIGV4aXQuXG4gIGZvciAoOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5kS2V5KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEsIGtleSkge1xuICB2YXIgaSxcbiAgICAgIG5vZGUsXG4gICAgICBub2RlQnlLZXlWYWx1ZSA9IG5ldyBNYXAsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGtleVZhbHVlcyA9IG5ldyBBcnJheShncm91cExlbmd0aCksXG4gICAgICBrZXlWYWx1ZTtcblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggbm9kZS5cbiAgLy8gSWYgbXVsdGlwbGUgbm9kZXMgaGF2ZSB0aGUgc2FtZSBrZXksIHRoZSBkdXBsaWNhdGVzIGFyZSBhZGRlZCB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGtleVZhbHVlc1tpXSA9IGtleVZhbHVlID0ga2V5LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApICsgXCJcIjtcbiAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZUJ5S2V5VmFsdWUuc2V0KGtleVZhbHVlLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggZGF0dW0uXG4gIC8vIElmIHRoZXJlIGEgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXksIGpvaW4gYW5kIGFkZCBpdCB0byB1cGRhdGUuXG4gIC8vIElmIHRoZXJlIGlzIG5vdCAob3IgdGhlIGtleSBpcyBhIGR1cGxpY2F0ZSksIGFkZCBpdCB0byBlbnRlci5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGtleVZhbHVlID0ga2V5LmNhbGwocGFyZW50LCBkYXRhW2ldLCBpLCBkYXRhKSArIFwiXCI7XG4gICAgaWYgKG5vZGUgPSBub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWUpKSB7XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICBub2RlQnlLZXlWYWx1ZS5kZWxldGUoa2V5VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYW55IHJlbWFpbmluZyBub2RlcyB0aGF0IHdlcmUgbm90IGJvdW5kIHRvIGRhdGEgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZXNbaV0pID09PSBub2RlKSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRhdHVtKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuX19kYXRhX187XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLCBkYXR1bSk7XG5cbiAgdmFyIGJpbmQgPSBrZXkgPyBiaW5kS2V5IDogYmluZEluZGV4LFxuICAgICAgcGFyZW50cyA9IHRoaXMuX3BhcmVudHMsXG4gICAgICBncm91cHMgPSB0aGlzLl9ncm91cHM7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB2YWx1ZSA9IGNvbnN0YW50KHZhbHVlKTtcblxuICBmb3IgKHZhciBtID0gZ3JvdXBzLmxlbmd0aCwgdXBkYXRlID0gbmV3IEFycmF5KG0pLCBlbnRlciA9IG5ldyBBcnJheShtKSwgZXhpdCA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICB2YXIgcGFyZW50ID0gcGFyZW50c1tqXSxcbiAgICAgICAgZ3JvdXAgPSBncm91cHNbal0sXG4gICAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgICBkYXRhID0gYXJyYXlsaWtlKHZhbHVlLmNhbGwocGFyZW50LCBwYXJlbnQgJiYgcGFyZW50Ll9fZGF0YV9fLCBqLCBwYXJlbnRzKSksXG4gICAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgZW50ZXJHcm91cCA9IGVudGVyW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICB1cGRhdGVHcm91cCA9IHVwZGF0ZVtqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgZXhpdEdyb3VwID0gZXhpdFtqXSA9IG5ldyBBcnJheShncm91cExlbmd0aCk7XG5cbiAgICBiaW5kKHBhcmVudCwgZ3JvdXAsIGVudGVyR3JvdXAsIHVwZGF0ZUdyb3VwLCBleGl0R3JvdXAsIGRhdGEsIGtleSk7XG5cbiAgICAvLyBOb3cgY29ubmVjdCB0aGUgZW50ZXIgbm9kZXMgdG8gdGhlaXIgZm9sbG93aW5nIHVwZGF0ZSBub2RlLCBzdWNoIHRoYXRcbiAgICAvLyBhcHBlbmRDaGlsZCBjYW4gaW5zZXJ0IHRoZSBtYXRlcmlhbGl6ZWQgZW50ZXIgbm9kZSBiZWZvcmUgdGhpcyBub2RlLFxuICAgIC8vIHJhdGhlciB0aGFuIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmVudCBub2RlLlxuICAgIGZvciAodmFyIGkwID0gMCwgaTEgPSAwLCBwcmV2aW91cywgbmV4dDsgaTAgPCBkYXRhTGVuZ3RoOyArK2kwKSB7XG4gICAgICBpZiAocHJldmlvdXMgPSBlbnRlckdyb3VwW2kwXSkge1xuICAgICAgICBpZiAoaTAgPj0gaTEpIGkxID0gaTAgKyAxO1xuICAgICAgICB3aGlsZSAoIShuZXh0ID0gdXBkYXRlR3JvdXBbaTFdKSAmJiArK2kxIDwgZGF0YUxlbmd0aCk7XG4gICAgICAgIHByZXZpb3VzLl9uZXh0ID0gbmV4dCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSA9IG5ldyBTZWxlY3Rpb24odXBkYXRlLCBwYXJlbnRzKTtcbiAgdXBkYXRlLl9lbnRlciA9IGVudGVyO1xuICB1cGRhdGUuX2V4aXQgPSBleGl0O1xuICByZXR1cm4gdXBkYXRlO1xufVxuXG4vLyBHaXZlbiBzb21lIGRhdGEsIHRoaXMgcmV0dXJucyBhbiBhcnJheS1saWtlIHZpZXcgb2YgaXQ6IGFuIG9iamVjdCB0aGF0XG4vLyBleHBvc2VzIGEgbGVuZ3RoIHByb3BlcnR5IGFuZCBhbGxvd3MgbnVtZXJpYyBpbmRleGluZy4gTm90ZSB0aGF0IHVubGlrZVxuLy8gc2VsZWN0QWxsLCB0aGlzIGlzbuKAmXQgd29ycmllZCBhYm91dCDigJxsaXZl4oCdIGNvbGxlY3Rpb25zIGJlY2F1c2UgdGhlIHJlc3VsdGluZ1xuLy8gYXJyYXkgd2lsbCBvbmx5IGJlIHVzZWQgYnJpZWZseSB3aGlsZSBkYXRhIGlzIGJlaW5nIGJvdW5kLiAoSXQgaXMgcG9zc2libGUgdG9cbi8vIGNhdXNlIHRoZSBkYXRhIHRvIGNoYW5nZSB3aGlsZSBpdGVyYXRpbmcgYnkgdXNpbmcgYSBrZXkgZnVuY3Rpb24sIGJ1dCBwbGVhc2Vcbi8vIGRvbuKAmXQ7IHdl4oCZZCByYXRoZXIgYXZvaWQgYSBncmF0dWl0b3VzIGNvcHkuKVxuZnVuY3Rpb24gYXJyYXlsaWtlKGRhdGEpIHtcbiAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gZGF0YVxuICAgID8gZGF0YSAvLyBBcnJheSwgVHlwZWRBcnJheSwgTm9kZUxpc3QsIGFycmF5LWxpa2VcbiAgICA6IEFycmF5LmZyb20oZGF0YSk7IC8vIE1hcCwgU2V0LCBpdGVyYWJsZSwgc3RyaW5nLCBvciBhbnl0aGluZyBlbHNlXG59XG4iLCJpbXBvcnQgc3BhcnNlIGZyb20gXCIuL3NwYXJzZS5qc1wiO1xuaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9leGl0IHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvbmVudGVyLCBvbnVwZGF0ZSwgb25leGl0KSB7XG4gIHZhciBlbnRlciA9IHRoaXMuZW50ZXIoKSwgdXBkYXRlID0gdGhpcywgZXhpdCA9IHRoaXMuZXhpdCgpO1xuICBpZiAodHlwZW9mIG9uZW50ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGVudGVyID0gb25lbnRlcihlbnRlcik7XG4gICAgaWYgKGVudGVyKSBlbnRlciA9IGVudGVyLnNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIGVudGVyID0gZW50ZXIuYXBwZW5kKG9uZW50ZXIgKyBcIlwiKTtcbiAgfVxuICBpZiAob251cGRhdGUgIT0gbnVsbCkge1xuICAgIHVwZGF0ZSA9IG9udXBkYXRlKHVwZGF0ZSk7XG4gICAgaWYgKHVwZGF0ZSkgdXBkYXRlID0gdXBkYXRlLnNlbGVjdGlvbigpO1xuICB9XG4gIGlmIChvbmV4aXQgPT0gbnVsbCkgZXhpdC5yZW1vdmUoKTsgZWxzZSBvbmV4aXQoZXhpdCk7XG4gIHJldHVybiBlbnRlciAmJiB1cGRhdGUgPyBlbnRlci5tZXJnZSh1cGRhdGUpLm9yZGVyKCkgOiB1cGRhdGU7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCkge1xuICB2YXIgc2VsZWN0aW9uID0gY29udGV4dC5zZWxlY3Rpb24gPyBjb250ZXh0LnNlbGVjdGlvbigpIDogY29udGV4dDtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gc2VsZWN0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAtMSwgbSA9IGdyb3Vwcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5leHQpIF4gNCkgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KTtcbiAgICAgICAgbmV4dCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29tcGFyZSkge1xuICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgZnVuY3Rpb24gY29tcGFyZU5vZGUoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBjb21wYXJlKGEuX19kYXRhX18sIGIuX19kYXRhX18pIDogIWEgLSAhYjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHNvcnRncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHNvcnRncm91cCA9IHNvcnRncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNvcnRncm91cFtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRncm91cC5zb3J0KGNvbXBhcmVOb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHNvcnRncm91cHMsIHRoaXMuX3BhcmVudHMpLm9yZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gIGFyZ3VtZW50c1swXSA9IHRoaXM7XG4gIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgbGV0IHNpemUgPSAwO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcykgKytzaXplOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiBzaXplO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5ub2RlKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSBjYWxsYmFjay5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4uL25hbWVzcGFjZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHYpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUoKTtcbiAgICByZXR1cm4gZnVsbG5hbWUubG9jYWxcbiAgICAgICAgPyBub2RlLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbClcbiAgICAgICAgOiBub2RlLmdldEF0dHJpYnV0ZShmdWxsbmFtZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkpKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLm93bmVyRG9jdW1lbnQgJiYgbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSAvLyBub2RlIGlzIGEgTm9kZVxuICAgICAgfHwgKG5vZGUuZG9jdW1lbnQgJiYgbm9kZSkgLy8gbm9kZSBpcyBhIFdpbmRvd1xuICAgICAgfHwgbm9kZS5kZWZhdWx0VmlldzsgLy8gbm9kZSBpcyBhIERvY3VtZW50XG59XG4iLCJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHYsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICAgID8gc3R5bGVSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyBzdHlsZUZ1bmN0aW9uXG4gICAgICAgICAgICA6IHN0eWxlQ29uc3RhbnQpKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSlcbiAgICAgIDogc3R5bGVWYWx1ZSh0aGlzLm5vZGUoKSwgbmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVZhbHVlKG5vZGUsIG5hbWUpIHtcbiAgcmV0dXJuIG5vZGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKVxuICAgICAgfHwgZGVmYXVsdFZpZXcobm9kZSkuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xufVxuIiwiZnVuY3Rpb24gcHJvcGVydHlSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5Q29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbbmFtZV0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIGRlbGV0ZSB0aGlzW25hbWVdO1xuICAgIGVsc2UgdGhpc1tuYW1lXSA9IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IHByb3BlcnR5UmVtb3ZlIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHByb3BlcnR5RnVuY3Rpb25cbiAgICAgICAgICA6IHByb3BlcnR5Q29uc3RhbnQpKG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKClbbmFtZV07XG59XG4iLCJmdW5jdGlvbiBjbGFzc0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRyaW0oKS5zcGxpdCgvXnxcXHMrLyk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzTGlzdChub2RlKSB7XG4gIHJldHVybiBub2RlLmNsYXNzTGlzdCB8fCBuZXcgQ2xhc3NMaXN0KG5vZGUpO1xufVxuXG5mdW5jdGlvbiBDbGFzc0xpc3Qobm9kZSkge1xuICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgdGhpcy5fbmFtZXMgPSBjbGFzc0FycmF5KG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIik7XG59XG5cbkNsYXNzTGlzdC5wcm90b3R5cGUgPSB7XG4gIGFkZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLl9uYW1lcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIGNvbnRhaW5zOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSkgPj0gMDtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xhc3NlZEFkZChub2RlLCBuYW1lcykge1xuICB2YXIgbGlzdCA9IGNsYXNzTGlzdChub2RlKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbGlzdC5hZGQobmFtZXNbaV0pO1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkUmVtb3ZlKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LnJlbW92ZShuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRUcnVlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkQWRkKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZhbHNlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkUmVtb3ZlKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZ1bmN0aW9uKG5hbWVzLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgKHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBjbGFzc2VkQWRkIDogY2xhc3NlZFJlbW92ZSkodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgbmFtZXMgPSBjbGFzc0FycmF5KG5hbWUgKyBcIlwiKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbGlzdCA9IGNsYXNzTGlzdCh0aGlzLm5vZGUoKSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFsaXN0LmNvbnRhaW5zKG5hbWVzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gY2xhc3NlZEZ1bmN0aW9uIDogdmFsdWVcbiAgICAgID8gY2xhc3NlZFRydWVcbiAgICAgIDogY2xhc3NlZEZhbHNlKShuYW1lcywgdmFsdWUpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRSZW1vdmUoKSB7XG4gIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gdGV4dFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gdGV4dEZ1bmN0aW9uXG4gICAgICAgICAgOiB0ZXh0Q29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkudGV4dENvbnRlbnQ7XG59XG4iLCJmdW5jdGlvbiBodG1sUmVtb3ZlKCkge1xuICB0aGlzLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGh0bWxDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaHRtbEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2ID09IG51bGwgPyBcIlwiIDogdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IGh0bWxSZW1vdmUgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGh0bWxGdW5jdGlvblxuICAgICAgICAgIDogaHRtbENvbnN0YW50KSh2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpLmlubmVySFRNTDtcbn1cbiIsImZ1bmN0aW9uIHJhaXNlKCkge1xuICBpZiAodGhpcy5uZXh0U2libGluZykgdGhpcy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyYWlzZSk7XG59XG4iLCJmdW5jdGlvbiBsb3dlcigpIHtcbiAgaWYgKHRoaXMucHJldmlvdXNTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gobG93ZXIpO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgY3JlYXRlID0gdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUgOiBjcmVhdG9yKG5hbWUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kQ2hpbGQoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9KTtcbn1cbiIsImltcG9ydCBjcmVhdG9yIGZyb20gXCIuLi9jcmVhdG9yLmpzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yLmpzXCI7XG5cbmZ1bmN0aW9uIGNvbnN0YW50TnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIGJlZm9yZSkge1xuICB2YXIgY3JlYXRlID0gdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUgOiBjcmVhdG9yKG5hbWUpLFxuICAgICAgc2VsZWN0ID0gYmVmb3JlID09IG51bGwgPyBjb25zdGFudE51bGwgOiB0eXBlb2YgYmVmb3JlID09PSBcImZ1bmN0aW9uXCIgPyBiZWZvcmUgOiBzZWxlY3RvcihiZWZvcmUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKGNyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBzZWxlY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJmdW5jdGlvbiByZW1vdmUoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gocmVtb3ZlKTtcbn1cbiIsImZ1bmN0aW9uIHNlbGVjdGlvbl9jbG9uZVNoYWxsb3coKSB7XG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKGZhbHNlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lRGVlcCgpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUodHJ1ZSksIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRoaXMubmV4dFNpYmxpbmcpIDogY2xvbmU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRlZXApIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGRlZXAgPyBzZWxlY3Rpb25fY2xvbmVEZWVwIDogc2VsZWN0aW9uX2Nsb25lU2hhbGxvdyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLnByb3BlcnR5KFwiX19kYXRhX19cIiwgdmFsdWUpXG4gICAgICA6IHRoaXMubm9kZSgpLl9fZGF0YV9fO1xufVxuIiwiZnVuY3Rpb24gY29udGV4dExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQsIHRoaXMuX19kYXRhX18pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZSh0eXBlbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uO1xuICAgIGlmICghb24pIHJldHVybjtcbiAgICBmb3IgKHZhciBqID0gMCwgaSA9IC0xLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAobyA9IG9uW2pdLCAoIXR5cGVuYW1lLnR5cGUgfHwgby50eXBlID09PSB0eXBlbmFtZS50eXBlKSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uWysraV0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKytpKSBvbi5sZW5ndGggPSBpO1xuICAgIGVsc2UgZGVsZXRlIHRoaXMuX19vbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25BZGQodHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb24sIG8sIGxpc3RlbmVyID0gY29udGV4dExpc3RlbmVyKHZhbHVlKTtcbiAgICBpZiAob24pIGZvciAodmFyIGogPSAwLCBtID0gb24ubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAoKG8gPSBvbltqXSkudHlwZSA9PT0gdHlwZW5hbWUudHlwZSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciA9IGxpc3RlbmVyLCBvLm9wdGlvbnMgPSBvcHRpb25zKTtcbiAgICAgICAgby52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlbmFtZS50eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgbyA9IHt0eXBlOiB0eXBlbmFtZS50eXBlLCBuYW1lOiB0eXBlbmFtZS5uYW1lLCB2YWx1ZTogdmFsdWUsIGxpc3RlbmVyOiBsaXN0ZW5lciwgb3B0aW9uczogb3B0aW9uc307XG4gICAgaWYgKCFvbikgdGhpcy5fX29uID0gW29dO1xuICAgIGVsc2Ugb24ucHVzaChvKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlbmFtZXMgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIpLCBpLCBuID0gdHlwZW5hbWVzLmxlbmd0aCwgdDtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgb24gPSB0aGlzLm5vZGUoKS5fX29uO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGZvciAoaSA9IDAsIG8gPSBvbltqXTsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAoKHQgPSB0eXBlbmFtZXNbaV0pLnR5cGUgPT09IG8udHlwZSAmJiB0Lm5hbWUgPT09IG8ubmFtZSkge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uID0gdmFsdWUgPyBvbkFkZCA6IG9uUmVtb3ZlO1xuICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB0aGlzLmVhY2gob24odHlwZW5hbWVzW2ldLCB2YWx1ZSwgb3B0aW9ucykpO1xuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobm9kZSwgdHlwZSwgcGFyYW1zKSB7XG4gIHZhciB3aW5kb3cgPSBkZWZhdWx0Vmlldyhub2RlKSxcbiAgICAgIGV2ZW50ID0gd2luZG93LkN1c3RvbUV2ZW50O1xuXG4gIGlmICh0eXBlb2YgZXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50ID0gbmV3IGV2ZW50KHR5cGUsIHBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgICBpZiAocGFyYW1zKSBldmVudC5pbml0RXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlKSwgZXZlbnQuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgICBlbHNlIGV2ZW50LmluaXRFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hDb25zdGFudCh0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgcGFyYW1zID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gZGlzcGF0Y2hGdW5jdGlvblxuICAgICAgOiBkaXNwYXRjaENvbnN0YW50KSh0eXBlLCBwYXJhbXMpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKigpIHtcbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHlpZWxkIG5vZGU7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgc2VsZWN0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCBmcm9tIFwiLi9zZWxlY3RDaGlsZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiBmcm9tIFwiLi9zZWxlY3RDaGlsZHJlbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdGEgZnJvbSBcIi4vZGF0YS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbnRlciBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9leGl0IGZyb20gXCIuL2V4aXQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fam9pbiBmcm9tIFwiLi9qb2luLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29yZGVyIGZyb20gXCIuL29yZGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NvcnQgZnJvbSBcIi4vc29ydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jYWxsIGZyb20gXCIuL2NhbGwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZXMgZnJvbSBcIi4vbm9kZXMuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZSBmcm9tIFwiLi9ub2RlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NpemUgZnJvbSBcIi4vc2l6ZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbXB0eSBmcm9tIFwiLi9lbXB0eS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lYWNoIGZyb20gXCIuL2VhY2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3Byb3BlcnR5IGZyb20gXCIuL3Byb3BlcnR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NsYXNzZWQgZnJvbSBcIi4vY2xhc3NlZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faHRtbCBmcm9tIFwiLi9odG1sLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JhaXNlIGZyb20gXCIuL3JhaXNlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2xvd2VyIGZyb20gXCIuL2xvd2VyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2FwcGVuZCBmcm9tIFwiLi9hcHBlbmQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faW5zZXJ0IGZyb20gXCIuL2luc2VydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Nsb25lIGZyb20gXCIuL2Nsb25lLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdHVtIGZyb20gXCIuL2RhdHVtLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Rpc3BhdGNoIGZyb20gXCIuL2Rpc3BhdGNoLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2l0ZXJhdG9yIGZyb20gXCIuL2l0ZXJhdG9yLmpzXCI7XG5cbmV4cG9ydCB2YXIgcm9vdCA9IFtudWxsXTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdGlvbihncm91cHMsIHBhcmVudHMpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF1dLCByb290KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uX3NlbGVjdGlvbigpIHtcbiAgcmV0dXJuIHRoaXM7XG59XG5cblNlbGVjdGlvbi5wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogU2VsZWN0aW9uLFxuICBzZWxlY3Q6IHNlbGVjdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogc2VsZWN0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbixcbiAgZmlsdGVyOiBzZWxlY3Rpb25fZmlsdGVyLFxuICBkYXRhOiBzZWxlY3Rpb25fZGF0YSxcbiAgZW50ZXI6IHNlbGVjdGlvbl9lbnRlcixcbiAgZXhpdDogc2VsZWN0aW9uX2V4aXQsXG4gIGpvaW46IHNlbGVjdGlvbl9qb2luLFxuICBtZXJnZTogc2VsZWN0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHNlbGVjdGlvbl9zZWxlY3Rpb24sXG4gIG9yZGVyOiBzZWxlY3Rpb25fb3JkZXIsXG4gIHNvcnQ6IHNlbGVjdGlvbl9zb3J0LFxuICBjYWxsOiBzZWxlY3Rpb25fY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9ub2RlcyxcbiAgbm9kZTogc2VsZWN0aW9uX25vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX2VtcHR5LFxuICBlYWNoOiBzZWxlY3Rpb25fZWFjaCxcbiAgYXR0cjogc2VsZWN0aW9uX2F0dHIsXG4gIHN0eWxlOiBzZWxlY3Rpb25fc3R5bGUsXG4gIHByb3BlcnR5OiBzZWxlY3Rpb25fcHJvcGVydHksXG4gIGNsYXNzZWQ6IHNlbGVjdGlvbl9jbGFzc2VkLFxuICB0ZXh0OiBzZWxlY3Rpb25fdGV4dCxcbiAgaHRtbDogc2VsZWN0aW9uX2h0bWwsXG4gIHJhaXNlOiBzZWxlY3Rpb25fcmFpc2UsXG4gIGxvd2VyOiBzZWxlY3Rpb25fbG93ZXIsXG4gIGFwcGVuZDogc2VsZWN0aW9uX2FwcGVuZCxcbiAgaW5zZXJ0OiBzZWxlY3Rpb25faW5zZXJ0LFxuICByZW1vdmU6IHNlbGVjdGlvbl9yZW1vdmUsXG4gIGNsb25lOiBzZWxlY3Rpb25fY2xvbmUsXG4gIGRhdHVtOiBzZWxlY3Rpb25fZGF0dW0sXG4gIG9uOiBzZWxlY3Rpb25fb24sXG4gIGRpc3BhdGNoOiBzZWxlY3Rpb25fZGlzcGF0Y2gsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25faXRlcmF0b3Jcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlvbjtcbiIsImltcG9ydCB7U2VsZWN0aW9uLCByb290fSBmcm9tIFwiLi9zZWxlY3Rpb24vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcildXSwgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF0pXG4gICAgICA6IG5ldyBTZWxlY3Rpb24oW1tzZWxlY3Rvcl1dLCByb290KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb2xvcigpIHt9XG5cbmV4cG9ydCB2YXIgZGFya2VyID0gMC43O1xuZXhwb3J0IHZhciBicmlnaHRlciA9IDEgLyBkYXJrZXI7XG5cbnZhciByZUkgPSBcIlxcXFxzKihbKy1dP1xcXFxkKylcXFxccypcIixcbiAgICByZU4gPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPyklXFxcXHMqXCIsXG4gICAgcmVIZXggPSAvXiMoWzAtOWEtZl17Myw4fSkkLyxcbiAgICByZVJnYkludGVnZXIgPSBuZXcgUmVnRXhwKGBecmdiXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfVxcXFwpJGApLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVSZ2JhSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JhXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfSwke3JlTn1cXFxcKSRgKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlSHNsUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xhXFxcXCgke3JlTn0sJHtyZVB9LCR7cmVQfSwke3JlTn1cXFxcKSRgKTtcblxudmFyIG5hbWVkID0ge1xuICBhbGljZWJsdWU6IDB4ZjBmOGZmLFxuICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICBhcXVhOiAweDAwZmZmZixcbiAgYXF1YW1hcmluZTogMHg3ZmZmZDQsXG4gIGF6dXJlOiAweGYwZmZmZixcbiAgYmVpZ2U6IDB4ZjVmNWRjLFxuICBiaXNxdWU6IDB4ZmZlNGM0LFxuICBibGFjazogMHgwMDAwMDAsXG4gIGJsYW5jaGVkYWxtb25kOiAweGZmZWJjZCxcbiAgYmx1ZTogMHgwMDAwZmYsXG4gIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICBicm93bjogMHhhNTJhMmEsXG4gIGJ1cmx5d29vZDogMHhkZWI4ODcsXG4gIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gIGNoYXJ0cmV1c2U6IDB4N2ZmZjAwLFxuICBjaG9jb2xhdGU6IDB4ZDI2OTFlLFxuICBjb3JhbDogMHhmZjdmNTAsXG4gIGNvcm5mbG93ZXJibHVlOiAweDY0OTVlZCxcbiAgY29ybnNpbGs6IDB4ZmZmOGRjLFxuICBjcmltc29uOiAweGRjMTQzYyxcbiAgY3lhbjogMHgwMGZmZmYsXG4gIGRhcmtibHVlOiAweDAwMDA4YixcbiAgZGFya2N5YW46IDB4MDA4YjhiLFxuICBkYXJrZ29sZGVucm9kOiAweGI4ODYwYixcbiAgZGFya2dyYXk6IDB4YTlhOWE5LFxuICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICBkYXJrZ3JleTogMHhhOWE5YTksXG4gIGRhcmtraGFraTogMHhiZGI3NmIsXG4gIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgZGFya29saXZlZ3JlZW46IDB4NTU2YjJmLFxuICBkYXJrb3JhbmdlOiAweGZmOGMwMCxcbiAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gIGRhcmtyZWQ6IDB4OGIwMDAwLFxuICBkYXJrc2FsbW9uOiAweGU5OTY3YSxcbiAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgZGFya3NsYXRlYmx1ZTogMHg0ODNkOGIsXG4gIGRhcmtzbGF0ZWdyYXk6IDB4MmY0ZjRmLFxuICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgZGFya3R1cnF1b2lzZTogMHgwMGNlZDEsXG4gIGRhcmt2aW9sZXQ6IDB4OTQwMGQzLFxuICBkZWVwcGluazogMHhmZjE0OTMsXG4gIGRlZXBza3libHVlOiAweDAwYmZmZixcbiAgZGltZ3JheTogMHg2OTY5NjksXG4gIGRpbWdyZXk6IDB4Njk2OTY5LFxuICBkb2RnZXJibHVlOiAweDFlOTBmZixcbiAgZmlyZWJyaWNrOiAweGIyMjIyMixcbiAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICBmb3Jlc3RncmVlbjogMHgyMjhiMjIsXG4gIGZ1Y2hzaWE6IDB4ZmYwMGZmLFxuICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICBnaG9zdHdoaXRlOiAweGY4ZjhmZixcbiAgZ29sZDogMHhmZmQ3MDAsXG4gIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gIGdyYXk6IDB4ODA4MDgwLFxuICBncmVlbjogMHgwMDgwMDAsXG4gIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgZ3JleTogMHg4MDgwODAsXG4gIGhvbmV5ZGV3OiAweGYwZmZmMCxcbiAgaG90cGluazogMHhmZjY5YjQsXG4gIGluZGlhbnJlZDogMHhjZDVjNWMsXG4gIGluZGlnbzogMHg0YjAwODIsXG4gIGl2b3J5OiAweGZmZmZmMCxcbiAga2hha2k6IDB4ZjBlNjhjLFxuICBsYXZlbmRlcjogMHhlNmU2ZmEsXG4gIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICBsYXduZ3JlZW46IDB4N2NmYzAwLFxuICBsZW1vbmNoaWZmb246IDB4ZmZmYWNkLFxuICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICBsaWdodGNvcmFsOiAweGYwODA4MCxcbiAgbGlnaHRjeWFuOiAweGUwZmZmZixcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICBsaWdodGdyYXk6IDB4ZDNkM2QzLFxuICBsaWdodGdyZWVuOiAweDkwZWU5MCxcbiAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgbGlnaHRwaW5rOiAweGZmYjZjMSxcbiAgbGlnaHRzYWxtb246IDB4ZmZhMDdhLFxuICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgbGlnaHRza3libHVlOiAweDg3Y2VmYSxcbiAgbGlnaHRzbGF0ZWdyYXk6IDB4Nzc4ODk5LFxuICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gIGxpZ2h0c3RlZWxibHVlOiAweGIwYzRkZSxcbiAgbGlnaHR5ZWxsb3c6IDB4ZmZmZmUwLFxuICBsaW1lOiAweDAwZmYwMCxcbiAgbGltZWdyZWVuOiAweDMyY2QzMixcbiAgbGluZW46IDB4ZmFmMGU2LFxuICBtYWdlbnRhOiAweGZmMDBmZixcbiAgbWFyb29uOiAweDgwMDAwMCxcbiAgbWVkaXVtYXF1YW1hcmluZTogMHg2NmNkYWEsXG4gIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICBtZWRpdW1vcmNoaWQ6IDB4YmE1NWQzLFxuICBtZWRpdW1wdXJwbGU6IDB4OTM3MGRiLFxuICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gIG1lZGl1bXNsYXRlYmx1ZTogMHg3YjY4ZWUsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiAweDAwZmE5YSxcbiAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgbWVkaXVtdmlvbGV0cmVkOiAweGM3MTU4NSxcbiAgbWlkbmlnaHRibHVlOiAweDE5MTk3MCxcbiAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgbWlzdHlyb3NlOiAweGZmZTRlMSxcbiAgbW9jY2FzaW46IDB4ZmZlNGI1LFxuICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gIG5hdnk6IDB4MDAwMDgwLFxuICBvbGRsYWNlOiAweGZkZjVlNixcbiAgb2xpdmU6IDB4ODA4MDAwLFxuICBvbGl2ZWRyYWI6IDB4NmI4ZTIzLFxuICBvcmFuZ2U6IDB4ZmZhNTAwLFxuICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICBvcmNoaWQ6IDB4ZGE3MGQ2LFxuICBwYWxlZ29sZGVucm9kOiAweGVlZThhYSxcbiAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgcGFsZXR1cnF1b2lzZTogMHhhZmVlZWUsXG4gIHBhbGV2aW9sZXRyZWQ6IDB4ZGI3MDkzLFxuICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgcGVhY2hwdWZmOiAweGZmZGFiOSxcbiAgcGVydTogMHhjZDg1M2YsXG4gIHBpbms6IDB4ZmZjMGNiLFxuICBwbHVtOiAweGRkYTBkZCxcbiAgcG93ZGVyYmx1ZTogMHhiMGUwZTYsXG4gIHB1cnBsZTogMHg4MDAwODAsXG4gIHJlYmVjY2FwdXJwbGU6IDB4NjYzMzk5LFxuICByZWQ6IDB4ZmYwMDAwLFxuICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICByb3lhbGJsdWU6IDB4NDE2OWUxLFxuICBzYWRkbGVicm93bjogMHg4YjQ1MTMsXG4gIHNhbG1vbjogMHhmYTgwNzIsXG4gIHNhbmR5YnJvd246IDB4ZjRhNDYwLFxuICBzZWFncmVlbjogMHgyZThiNTcsXG4gIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgc2llbm5hOiAweGEwNTIyZCxcbiAgc2lsdmVyOiAweGMwYzBjMCxcbiAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gIHNsYXRlYmx1ZTogMHg2YTVhY2QsXG4gIHNsYXRlZ3JheTogMHg3MDgwOTAsXG4gIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gIHNub3c6IDB4ZmZmYWZhLFxuICBzcHJpbmdncmVlbjogMHgwMGZmN2YsXG4gIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gIHRhbjogMHhkMmI0OGMsXG4gIHRlYWw6IDB4MDA4MDgwLFxuICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgdG9tYXRvOiAweGZmNjM0NyxcbiAgdHVycXVvaXNlOiAweDQwZTBkMCxcbiAgdmlvbGV0OiAweGVlODJlZSxcbiAgd2hlYXQ6IDB4ZjVkZWIzLFxuICB3aGl0ZTogMHhmZmZmZmYsXG4gIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICB5ZWxsb3c6IDB4ZmZmZjAwLFxuICB5ZWxsb3dncmVlbjogMHg5YWNkMzJcbn07XG5cbmRlZmluZShDb2xvciwgY29sb3IsIHtcbiAgY29weShjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnJnYigpLmRpc3BsYXlhYmxlKCk7XG4gIH0sXG4gIGhleDogY29sb3JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IGNvbG9yX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogY29sb3JfZm9ybWF0SGV4OCxcbiAgZm9ybWF0SHNsOiBjb2xvcl9mb3JtYXRIc2wsXG4gIGZvcm1hdFJnYjogY29sb3JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogY29sb3JfZm9ybWF0UmdiXG59KTtcblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXgoKTtcbn1cblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4OCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4OCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIc2woKSB7XG4gIHJldHVybiBoc2xDb252ZXJ0KHRoaXMpLmZvcm1hdEhzbCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRSZ2IoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdFJnYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgdmFyIG0sIGw7XG4gIGZvcm1hdCA9IChmb3JtYXQgKyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChtID0gcmVIZXguZXhlYyhmb3JtYXQpKSA/IChsID0gbVsxXS5sZW5ndGgsIG0gPSBwYXJzZUludChtWzFdLCAxNiksIGwgPT09IDYgPyByZ2JuKG0pIC8vICNmZjAwMDBcbiAgICAgIDogbCA9PT0gMyA/IG5ldyBSZ2IoKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkgLy8gI2YwMFxuICAgICAgOiBsID09PSA4ID8gcmdiYShtID4+IDI0ICYgMHhmZiwgbSA+PiAxNiAmIDB4ZmYsIG0gPj4gOCAmIDB4ZmYsIChtICYgMHhmZikgLyAweGZmKSAvLyAjZmYwMDAwMDBcbiAgICAgIDogbCA9PT0gNCA/IHJnYmEoKG0gPj4gMTIgJiAweGYpIHwgKG0gPj4gOCAmIDB4ZjApLCAobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSkgLyAweGZmKSAvLyAjZjAwMFxuICAgICAgOiBudWxsKSAvLyBpbnZhbGlkIGhleFxuICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgOiAobSA9IHJlUmdiUGVyY2VudC5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCAxKSAvLyByZ2IoMTAwJSwgMCUsIDAlKVxuICAgICAgOiAobSA9IHJlUmdiYUludGVnZXIuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSwgbVsyXSwgbVszXSwgbVs0XSkgLy8gcmdiYSgyNTUsIDAsIDAsIDEpXG4gICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgOiAobSA9IHJlSHNsUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCAxKSAvLyBoc2woMTIwLCA1MCUsIDUwJSlcbiAgICAgIDogKG0gPSByZUhzbGFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIG1bNF0pIC8vIGhzbGEoMTIwLCA1MCUsIDUwJSwgMSlcbiAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIDogZm9ybWF0ID09PSBcInRyYW5zcGFyZW50XCIgPyBuZXcgUmdiKE5hTiwgTmFOLCBOYU4sIDApXG4gICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJnYm4obikge1xuICByZXR1cm4gbmV3IFJnYihuID4+IDE2ICYgMHhmZiwgbiA+PiA4ICYgMHhmZiwgbiAmIDB4ZmYsIDEpO1xufVxuXG5mdW5jdGlvbiByZ2JhKHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPD0gMCkgciA9IGcgPSBiID0gTmFOO1xuICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBSZ2I7XG4gIG8gPSBvLnJnYigpO1xuICByZXR1cm4gbmV3IFJnYihvLnIsIG8uZywgby5iLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByZ2JDb252ZXJ0KHIpIDogbmV3IFJnYihyLCBnLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICB0aGlzLnIgPSArcjtcbiAgdGhpcy5nID0gK2c7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKFJnYiwgcmdiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBSZ2IoY2xhbXBpKHRoaXMuciksIGNsYW1waSh0aGlzLmcpLCBjbGFtcGkodGhpcy5iKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKC0wLjUgPD0gdGhpcy5yICYmIHRoaXMuciA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmcgJiYgdGhpcy5nIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuYiAmJiB0aGlzLmIgPCAyNTUuNSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgaGV4OiByZ2JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IHJnYl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhleDg6IHJnYl9mb3JtYXRIZXg4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gYCMke2hleCh0aGlzLnIpfSR7aGV4KHRoaXMuZyl9JHtoZXgodGhpcy5iKX0ke2hleCgoaXNOYU4odGhpcy5vcGFjaXR5KSA/IDEgOiB0aGlzLm9wYWNpdHkpICogMjU1KX1gO1xufVxuXG5mdW5jdGlvbiByZ2JfZm9ybWF0UmdiKCkge1xuICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gIHJldHVybiBgJHthID09PSAxID8gXCJyZ2IoXCIgOiBcInJnYmEoXCJ9JHtjbGFtcGkodGhpcy5yKX0sICR7Y2xhbXBpKHRoaXMuZyl9LCAke2NsYW1waSh0aGlzLmIpfSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG59XG5cbmZ1bmN0aW9uIGNsYW1wYShvcGFjaXR5KSB7XG4gIHJldHVybiBpc05hTihvcGFjaXR5KSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBvcGFjaXR5KSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1waSh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG59XG5cbmZ1bmN0aW9uIGhleCh2YWx1ZSkge1xuICB2YWx1ZSA9IGNsYW1waSh2YWx1ZSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGNsYW1wKCkge1xuICAgIHJldHVybiBuZXcgSHNsKGNsYW1waCh0aGlzLmgpLCBjbGFtcHQodGhpcy5zKSwgY2xhbXB0KHRoaXMubCksIGNsYW1wYSh0aGlzLm9wYWNpdHkpKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLmwgJiYgdGhpcy5sIDw9IDEpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGZvcm1hdEhzbCgpIHtcbiAgICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gICAgcmV0dXJuIGAke2EgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIn0ke2NsYW1waCh0aGlzLmgpfSwgJHtjbGFtcHQodGhpcy5zKSAqIDEwMH0lLCAke2NsYW1wdCh0aGlzLmwpICogMTAwfSUke2EgPT09IDEgPyBcIilcIiA6IGAsICR7YX0pYH1gO1xuICB9XG59KSk7XG5cbmZ1bmN0aW9uIGNsYW1waCh2YWx1ZSkge1xuICB2YWx1ZSA9ICh2YWx1ZSB8fCAwKSAlIDM2MDtcbiAgcmV0dXJuIHZhbHVlIDwgMCA/IHZhbHVlICsgMzYwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNsYW1wdCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdmFsdWUgfHwgMCkpO1xufVxuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB4ID0+ICgpID0+IHg7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdDtcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2csXG4gICAgcmVCID0gbmV3IFJlZ0V4cChyZUEuc291cmNlLCBcImdcIik7XG5cbmZ1bmN0aW9uIHplcm8oYikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uZShiKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGIodCkgKyBcIlwiO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBiaSA9IHJlQS5sYXN0SW5kZXggPSByZUIubGFzdEluZGV4ID0gMCwgLy8gc2NhbiBpbmRleCBmb3IgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgYm0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYlxuICAgICAgYnMsIC8vIHN0cmluZyBwcmVjZWRpbmcgY3VycmVudCBudW1iZXIgaW4gYiwgaWYgYW55XG4gICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG5cbiAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcblxuICAvLyBJbnRlcnBvbGF0ZSBwYWlycyBvZiBudW1iZXJzIGluIGEgJiBiLlxuICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAmJiAoYm0gPSByZUIuZXhlYyhiKSkpIHtcbiAgICBpZiAoKGJzID0gYm0uaW5kZXgpID4gYmkpIHsgLy8gYSBzdHJpbmcgcHJlY2VkZXMgdGhlIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJzO1xuICAgIH1cbiAgICBpZiAoKGFtID0gYW1bMF0pID09PSAoYm0gPSBibVswXSkpIHsgLy8gbnVtYmVycyBpbiBhICYgYiBtYXRjaFxuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYm07IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgIH0gZWxzZSB7IC8vIGludGVycG9sYXRlIG5vbi1tYXRjaGluZyBudW1iZXJzXG4gICAgICBzWysraV0gPSBudWxsO1xuICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgIH1cbiAgICBiaSA9IHJlQi5sYXN0SW5kZXg7XG4gIH1cblxuICAvLyBBZGQgcmVtYWlucyBvZiBiLlxuICBpZiAoYmkgPCBiLmxlbmd0aCkge1xuICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgZWxzZSBzWysraV0gPSBicztcbiAgfVxuXG4gIC8vIFNwZWNpYWwgb3B0aW1pemF0aW9uIGZvciBvbmx5IGEgc2luZ2xlIG1hdGNoLlxuICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIGVhY2ggb2YgdGhlIG51bWJlcnMgYW5kIHJlam9pbiB0aGUgc3RyaW5nLlxuICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgID8gb25lKHFbMF0ueClcbiAgICAgIDogemVybyhiKSlcbiAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBvOyBpIDwgYjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgICAgfSk7XG59XG4iLCJ2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSB7XG4gIHRyYW5zbGF0ZVg6IDAsXG4gIHRyYW5zbGF0ZVk6IDAsXG4gIHJvdGF0ZTogMCxcbiAgc2tld1g6IDAsXG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhciBzY2FsZVgsIHNjYWxlWSwgc2tld1g7XG4gIGlmIChzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYikpIGEgLz0gc2NhbGVYLCBiIC89IHNjYWxlWDtcbiAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICBpZiAoc2NhbGVZID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpKSBjIC89IHNjYWxlWSwgZCAvPSBzY2FsZVksIHNrZXdYIC89IHNjYWxlWTtcbiAgaWYgKGEgKiBkIDwgYiAqIGMpIGEgPSAtYSwgYiA9IC1iLCBza2V3WCA9IC1za2V3WCwgc2NhbGVYID0gLXNjYWxlWDtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGVYOiBlLFxuICAgIHRyYW5zbGF0ZVk6IGYsXG4gICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICBza2V3WDogTWF0aC5hdGFuKHNrZXdYKSAqIGRlZ3JlZXMsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cbiIsImltcG9ydCBkZWNvbXBvc2UsIHtpZGVudGl0eX0gZnJvbSBcIi4vZGVjb21wb3NlLmpzXCI7XG5cbnZhciBzdmdOb2RlO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGNvbnN0IG0gPSBuZXcgKHR5cGVvZiBET01NYXRyaXggPT09IFwiZnVuY3Rpb25cIiA/IERPTU1hdHJpeCA6IFdlYktpdENTU01hdHJpeCkodmFsdWUgKyBcIlwiKTtcbiAgcmV0dXJuIG0uaXNJZGVudGl0eSA/IGlkZW50aXR5IDogZGVjb21wb3NlKG0uYSwgbS5iLCBtLmMsIG0uZCwgbS5lLCBtLmYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdmcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFzdmdOb2RlKSBzdmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuICBzdmdOb2RlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB2YWx1ZSk7XG4gIGlmICghKHZhbHVlID0gc3ZnTm9kZS50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpKSkgcmV0dXJuIGlkZW50aXR5O1xuICB2YWx1ZSA9IHZhbHVlLm1hdHJpeDtcbiAgcmV0dXJuIGRlY29tcG9zZSh2YWx1ZS5hLCB2YWx1ZS5iLCB2YWx1ZS5jLCB2YWx1ZS5kLCB2YWx1ZS5lLCB2YWx1ZS5mKTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlci5qc1wiO1xuaW1wb3J0IHtwYXJzZUNzcywgcGFyc2VTdmd9IGZyb20gXCIuL3BhcnNlLmpzXCI7XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlLCBweENvbW1hLCBweFBhcmVuLCBkZWdQYXJlbikge1xuXG4gIGZ1bmN0aW9uIHBvcChzKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoID8gcy5wb3AoKSArIFwiIFwiIDogXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChcInRyYW5zbGF0ZShcIiwgbnVsbCwgcHhDb21tYSwgbnVsbCwgcHhQYXJlbik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiIHx8IHliKSB7XG4gICAgICBzLnB1c2goXCJ0cmFuc2xhdGUoXCIgKyB4YiArIHB4Q29tbWEgKyB5YiArIHB4UGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJvdGF0ZShhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIGlmIChhIC0gYiA+IDE4MCkgYiArPSAzNjA7IGVsc2UgaWYgKGIgLSBhID4gMTgwKSBhICs9IDM2MDsgLy8gc2hvcnRlc3QgcGF0aFxuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBza2V3WChhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjYWxlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIsIG51bGwsIFwiLFwiLCBudWxsLCBcIilcIik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiICE9PSAxIHx8IHliICE9PSAxKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiArIHhiICsgXCIsXCIgKyB5YiArIFwiKVwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG4gICAgYSA9IHBhcnNlKGEpLCBiID0gcGFyc2UoYik7XG4gICAgdHJhbnNsYXRlKGEudHJhbnNsYXRlWCwgYS50cmFuc2xhdGVZLCBiLnRyYW5zbGF0ZVgsIGIudHJhbnNsYXRlWSwgcywgcSk7XG4gICAgcm90YXRlKGEucm90YXRlLCBiLnJvdGF0ZSwgcywgcSk7XG4gICAgc2tld1goYS5za2V3WCwgYi5za2V3WCwgcywgcSk7XG4gICAgc2NhbGUoYS5zY2FsZVgsIGEuc2NhbGVZLCBiLnNjYWxlWCwgYi5zY2FsZVksIHMsIHEpO1xuICAgIGEgPSBiID0gbnVsbDsgLy8gZ2NcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IHEubGVuZ3RoLCBvO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlQ3NzLCBcInB4LCBcIiwgXCJweClcIiwgXCJkZWcpXCIpO1xuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlU3ZnLCBcIiwgXCIsIFwiKVwiLCBcIilcIik7XG4iLCJ2YXIgZnJhbWUgPSAwLCAvLyBpcyBhbiBhbmltYXRpb24gZnJhbWUgcGVuZGluZz9cbiAgICB0aW1lb3V0ID0gMCwgLy8gaXMgYSB0aW1lb3V0IHBlbmRpbmc/XG4gICAgaW50ZXJ2YWwgPSAwLCAvLyBhcmUgYW55IHRpbWVycyBhY3RpdmU/XG4gICAgcG9rZURlbGF5ID0gMTAwMCwgLy8gaG93IGZyZXF1ZW50bHkgd2UgY2hlY2sgZm9yIGNsb2NrIHNrZXdcbiAgICB0YXNrSGVhZCxcbiAgICB0YXNrVGFpbCxcbiAgICBjbG9ja0xhc3QgPSAwLFxuICAgIGNsb2NrTm93ID0gMCxcbiAgICBjbG9ja1NrZXcgPSAwLFxuICAgIGNsb2NrID0gdHlwZW9mIHBlcmZvcm1hbmNlID09PSBcIm9iamVjdFwiICYmIHBlcmZvcm1hbmNlLm5vdyA/IHBlcmZvcm1hbmNlIDogRGF0ZSxcbiAgICBzZXRGcmFtZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpIDogZnVuY3Rpb24oZikgeyBzZXRUaW1lb3V0KGYsIDE3KTsgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIGNsb2NrTm93IHx8IChzZXRGcmFtZShjbGVhck5vdyksIGNsb2NrTm93ID0gY2xvY2subm93KCkgKyBjbG9ja1NrZXcpO1xufVxuXG5mdW5jdGlvbiBjbGVhck5vdygpIHtcbiAgY2xvY2tOb3cgPSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVGltZXIoKSB7XG4gIHRoaXMuX2NhbGwgPVxuICB0aGlzLl90aW1lID1cbiAgdGhpcy5fbmV4dCA9IG51bGw7XG59XG5cblRpbWVyLnByb3RvdHlwZSA9IHRpbWVyLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRpbWVyLFxuICByZXN0YXJ0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICB0aW1lID0gKHRpbWUgPT0gbnVsbCA/IG5vdygpIDogK3RpbWUpICsgKGRlbGF5ID09IG51bGwgPyAwIDogK2RlbGF5KTtcbiAgICBpZiAoIXRoaXMuX25leHQgJiYgdGFza1RhaWwgIT09IHRoaXMpIHtcbiAgICAgIGlmICh0YXNrVGFpbCkgdGFza1RhaWwuX25leHQgPSB0aGlzO1xuICAgICAgZWxzZSB0YXNrSGVhZCA9IHRoaXM7XG4gICAgICB0YXNrVGFpbCA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX2NhbGwgPSBjYWxsYmFjaztcbiAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICBzbGVlcCgpO1xuICB9LFxuICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY2FsbCkge1xuICAgICAgdGhpcy5fY2FsbCA9IG51bGw7XG4gICAgICB0aGlzLl90aW1lID0gSW5maW5pdHk7XG4gICAgICBzbGVlcCgpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgdC5yZXN0YXJ0KGNhbGxiYWNrLCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZXJGbHVzaCgpIHtcbiAgbm93KCk7IC8vIEdldCB0aGUgY3VycmVudCB0aW1lLCBpZiBub3QgYWxyZWFkeSBzZXQuXG4gICsrZnJhbWU7IC8vIFByZXRlbmQgd2XigJl2ZSBzZXQgYW4gYWxhcm0sIGlmIHdlIGhhdmVu4oCZdCBhbHJlYWR5LlxuICB2YXIgdCA9IHRhc2tIZWFkLCBlO1xuICB3aGlsZSAodCkge1xuICAgIGlmICgoZSA9IGNsb2NrTm93IC0gdC5fdGltZSkgPj0gMCkgdC5fY2FsbC5jYWxsKHVuZGVmaW5lZCwgZSk7XG4gICAgdCA9IHQuX25leHQ7XG4gIH1cbiAgLS1mcmFtZTtcbn1cblxuZnVuY3Rpb24gd2FrZSgpIHtcbiAgY2xvY2tOb3cgPSAoY2xvY2tMYXN0ID0gY2xvY2subm93KCkpICsgY2xvY2tTa2V3O1xuICBmcmFtZSA9IHRpbWVvdXQgPSAwO1xuICB0cnkge1xuICAgIHRpbWVyRmx1c2goKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBmcmFtZSA9IDA7XG4gICAgbmFwKCk7XG4gICAgY2xvY2tOb3cgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBva2UoKSB7XG4gIHZhciBub3cgPSBjbG9jay5ub3coKSwgZGVsYXkgPSBub3cgLSBjbG9ja0xhc3Q7XG4gIGlmIChkZWxheSA+IHBva2VEZWxheSkgY2xvY2tTa2V3IC09IGRlbGF5LCBjbG9ja0xhc3QgPSBub3c7XG59XG5cbmZ1bmN0aW9uIG5hcCgpIHtcbiAgdmFyIHQwLCB0MSA9IHRhc2tIZWFkLCB0MiwgdGltZSA9IEluZmluaXR5O1xuICB3aGlsZSAodDEpIHtcbiAgICBpZiAodDEuX2NhbGwpIHtcbiAgICAgIGlmICh0aW1lID4gdDEuX3RpbWUpIHRpbWUgPSB0MS5fdGltZTtcbiAgICAgIHQwID0gdDEsIHQxID0gdDEuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQyID0gdDEuX25leHQsIHQxLl9uZXh0ID0gbnVsbDtcbiAgICAgIHQxID0gdDAgPyB0MC5fbmV4dCA9IHQyIDogdGFza0hlYWQgPSB0MjtcbiAgICB9XG4gIH1cbiAgdGFza1RhaWwgPSB0MDtcbiAgc2xlZXAodGltZSk7XG59XG5cbmZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgaWYgKGZyYW1lKSByZXR1cm47IC8vIFNvb25lc3QgYWxhcm0gYWxyZWFkeSBzZXQsIG9yIHdpbGwgYmUuXG4gIGlmICh0aW1lb3V0KSB0aW1lb3V0ID0gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB2YXIgZGVsYXkgPSB0aW1lIC0gY2xvY2tOb3c7IC8vIFN0cmljdGx5IGxlc3MgdGhhbiBpZiB3ZSByZWNvbXB1dGVkIGNsb2NrTm93LlxuICBpZiAoZGVsYXkgPiAyNCkge1xuICAgIGlmICh0aW1lIDwgSW5maW5pdHkpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHdha2UsIHRpbWUgLSBjbG9jay5ub3coKSAtIGNsb2NrU2tldyk7XG4gICAgaWYgKGludGVydmFsKSBpbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaW50ZXJ2YWwpIGNsb2NrTGFzdCA9IGNsb2NrLm5vdygpLCBpbnRlcnZhbCA9IHNldEludGVydmFsKHBva2UsIHBva2VEZWxheSk7XG4gICAgZnJhbWUgPSAxLCBzZXRGcmFtZSh3YWtlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtUaW1lcn0gZnJvbSBcIi4vdGltZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICBkZWxheSA9IGRlbGF5ID09IG51bGwgPyAwIDogK2RlbGF5O1xuICB0LnJlc3RhcnQoZWxhcHNlZCA9PiB7XG4gICAgdC5zdG9wKCk7XG4gICAgY2FsbGJhY2soZWxhcHNlZCArIGRlbGF5KTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cbiIsImltcG9ydCB7ZGlzcGF0Y2h9IGZyb20gXCJkMy1kaXNwYXRjaFwiO1xuaW1wb3J0IHt0aW1lciwgdGltZW91dH0gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBlbXB0eU9uID0gZGlzcGF0Y2goXCJzdGFydFwiLCBcImVuZFwiLCBcImNhbmNlbFwiLCBcImludGVycnVwdFwiKTtcbnZhciBlbXB0eVR3ZWVuID0gW107XG5cbmV4cG9ydCB2YXIgQ1JFQVRFRCA9IDA7XG5leHBvcnQgdmFyIFNDSEVEVUxFRCA9IDE7XG5leHBvcnQgdmFyIFNUQVJUSU5HID0gMjtcbmV4cG9ydCB2YXIgU1RBUlRFRCA9IDM7XG5leHBvcnQgdmFyIFJVTk5JTkcgPSA0O1xuZXhwb3J0IHZhciBFTkRJTkcgPSA1O1xuZXhwb3J0IHZhciBFTkRFRCA9IDY7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIGlkLCBpbmRleCwgZ3JvdXAsIHRpbWluZykge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGVzKSBub2RlLl9fdHJhbnNpdGlvbiA9IHt9O1xuICBlbHNlIGlmIChpZCBpbiBzY2hlZHVsZXMpIHJldHVybjtcbiAgY3JlYXRlKG5vZGUsIGlkLCB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBpbmRleDogaW5kZXgsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBncm91cDogZ3JvdXAsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBvbjogZW1wdHlPbixcbiAgICB0d2VlbjogZW1wdHlUd2VlbixcbiAgICB0aW1lOiB0aW1pbmcudGltZSxcbiAgICBkZWxheTogdGltaW5nLmRlbGF5LFxuICAgIGR1cmF0aW9uOiB0aW1pbmcuZHVyYXRpb24sXG4gICAgZWFzZTogdGltaW5nLmVhc2UsXG4gICAgdGltZXI6IG51bGwsXG4gICAgc3RhdGU6IENSRUFURURcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IENSRUFURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHNjaGVkdWxlZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IFNUQVJURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZSB8fCAhKHNjaGVkdWxlID0gc2NoZWR1bGVbaWRdKSkgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNpdGlvbiBub3QgZm91bmRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKG5vZGUsIGlkLCBzZWxmKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHR3ZWVuO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIHNlbGYgdGltZXIgd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBjcmVhdGVkLlxuICAvLyBOb3RlIHRoZSBhY3R1YWwgZGVsYXkgaXMgbm90IGtub3duIHVudGlsIHRoZSBmaXJzdCBjYWxsYmFjayFcbiAgc2NoZWR1bGVzW2lkXSA9IHNlbGY7XG4gIHNlbGYudGltZXIgPSB0aW1lcihzY2hlZHVsZSwgMCwgc2VsZi50aW1lKTtcblxuICBmdW5jdGlvbiBzY2hlZHVsZShlbGFwc2VkKSB7XG4gICAgc2VsZi5zdGF0ZSA9IFNDSEVEVUxFRDtcbiAgICBzZWxmLnRpbWVyLnJlc3RhcnQoc3RhcnQsIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG5cbiAgICAvLyBJZiB0aGUgZWxhcHNlZCBkZWxheSBpcyBsZXNzIHRoYW4gb3VyIGZpcnN0IHNsZWVwLCBzdGFydCBpbW1lZGlhdGVseS5cbiAgICBpZiAoc2VsZi5kZWxheSA8PSBlbGFwc2VkKSBzdGFydChlbGFwc2VkIC0gc2VsZi5kZWxheSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChlbGFwc2VkKSB7XG4gICAgdmFyIGksIGosIG4sIG87XG5cbiAgICAvLyBJZiB0aGUgc3RhdGUgaXMgbm90IFNDSEVEVUxFRCwgdGhlbiB3ZSBwcmV2aW91c2x5IGVycm9yZWQgb24gc3RhcnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNDSEVEVUxFRCkgcmV0dXJuIHN0b3AoKTtcblxuICAgIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICAgIG8gPSBzY2hlZHVsZXNbaV07XG4gICAgICBpZiAoby5uYW1lICE9PSBzZWxmLm5hbWUpIGNvbnRpbnVlO1xuXG4gICAgICAvLyBXaGlsZSB0aGlzIGVsZW1lbnQgYWxyZWFkeSBoYXMgYSBzdGFydGluZyB0cmFuc2l0aW9uIGR1cmluZyB0aGlzIGZyYW1lLFxuICAgICAgLy8gZGVmZXIgc3RhcnRpbmcgYW4gaW50ZXJydXB0aW5nIHRyYW5zaXRpb24gdW50aWwgdGhhdCB0cmFuc2l0aW9uIGhhcyBhXG4gICAgICAvLyBjaGFuY2UgdG8gdGljayAoYW5kIHBvc3NpYmx5IGVuZCk7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzU0IVxuICAgICAgaWYgKG8uc3RhdGUgPT09IFNUQVJURUQpIHJldHVybiB0aW1lb3V0KHN0YXJ0KTtcblxuICAgICAgLy8gSW50ZXJydXB0IHRoZSBhY3RpdmUgdHJhbnNpdGlvbiwgaWYgYW55LlxuICAgICAgaWYgKG8uc3RhdGUgPT09IFJVTk5JTkcpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiaW50ZXJydXB0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuXG4gICAgICAvLyBDYW5jZWwgYW55IHByZS1lbXB0ZWQgdHJhbnNpdGlvbnMuXG4gICAgICBlbHNlIGlmICgraSA8IGlkKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImNhbmNlbFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZlciB0aGUgZmlyc3QgdGljayB0byBlbmQgb2YgdGhlIGN1cnJlbnQgZnJhbWU7IHNlZSBkMy9kMyMxNTc2LlxuICAgIC8vIE5vdGUgdGhlIHRyYW5zaXRpb24gbWF5IGJlIGNhbmNlbGVkIGFmdGVyIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IHRpY2shXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgc2NoZWR1bGVkIGJlZm9yZSB0aGUgc3RhcnQgZXZlbnQ7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzE2IVxuICAgIC8vIEFzc3VtaW5nIHRoaXMgaXMgc3VjY2Vzc2Z1bCwgc3Vic2VxdWVudCBjYWxsYmFja3MgZ28gc3RyYWlnaHQgdG8gdGljay5cbiAgICB0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFNUQVJURUQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IFJVTk5JTkc7XG4gICAgICAgIHNlbGYudGltZXIucmVzdGFydCh0aWNrLCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuICAgICAgICB0aWNrKGVsYXBzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIHN0YXJ0IGV2ZW50LlxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIGRvbmUgYmVmb3JlIHRoZSB0d2VlbiBhcmUgaW5pdGlhbGl6ZWQuXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJUSU5HO1xuICAgIHNlbGYub24uY2FsbChcInN0YXJ0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTVEFSVElORykgcmV0dXJuOyAvLyBpbnRlcnJ1cHRlZFxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVEVEO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdHdlZW4sIGRlbGV0aW5nIG51bGwgdHdlZW4uXG4gICAgdHdlZW4gPSBuZXcgQXJyYXkobiA9IHNlbGYudHdlZW4ubGVuZ3RoKTtcbiAgICBmb3IgKGkgPSAwLCBqID0gLTE7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChvID0gc2VsZi50d2VlbltpXS52YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApKSB7XG4gICAgICAgIHR3ZWVuWysral0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICB0d2Vlbi5sZW5ndGggPSBqICsgMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgIHZhciB0ID0gZWxhcHNlZCA8IHNlbGYuZHVyYXRpb24gPyBzZWxmLmVhc2UuY2FsbChudWxsLCBlbGFwc2VkIC8gc2VsZi5kdXJhdGlvbikgOiAoc2VsZi50aW1lci5yZXN0YXJ0KHN0b3ApLCBzZWxmLnN0YXRlID0gRU5ESU5HLCAxKSxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gdHdlZW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHR3ZWVuW2ldLmNhbGwobm9kZSwgdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGVuZCBldmVudC5cbiAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gRU5ESU5HKSB7XG4gICAgICBzZWxmLm9uLmNhbGwoXCJlbmRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBzZWxmLnN0YXRlID0gRU5ERUQ7XG4gICAgc2VsZi50aW1lci5zdG9wKCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpZF07XG4gICAgZm9yICh2YXIgaSBpbiBzY2hlZHVsZXMpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGRlbGV0ZSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtTVEFSVElORywgRU5ESU5HLCBFTkRFRH0gZnJvbSBcIi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHNjaGVkdWxlLFxuICAgICAgYWN0aXZlLFxuICAgICAgZW1wdHkgPSB0cnVlLFxuICAgICAgaTtcblxuICBpZiAoIXNjaGVkdWxlcykgcmV0dXJuO1xuXG4gIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG5cbiAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgIGlmICgoc2NoZWR1bGUgPSBzY2hlZHVsZXNbaV0pLm5hbWUgIT09IG5hbWUpIHsgZW1wdHkgPSBmYWxzZTsgY29udGludWU7IH1cbiAgICBhY3RpdmUgPSBzY2hlZHVsZS5zdGF0ZSA+IFNUQVJUSU5HICYmIHNjaGVkdWxlLnN0YXRlIDwgRU5ESU5HO1xuICAgIHNjaGVkdWxlLnN0YXRlID0gRU5ERUQ7XG4gICAgc2NoZWR1bGUudGltZXIuc3RvcCgpO1xuICAgIHNjaGVkdWxlLm9uLmNhbGwoYWN0aXZlID8gXCJpbnRlcnJ1cHRcIiA6IFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNjaGVkdWxlLmluZGV4LCBzY2hlZHVsZS5ncm91cCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgfVxuXG4gIGlmIChlbXB0eSkgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xufVxuIiwiaW1wb3J0IGludGVycnVwdCBmcm9tIFwiLi4vaW50ZXJydXB0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBpbnRlcnJ1cHQodGhpcywgbmFtZSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gdHdlZW5SZW1vdmUoaWQsIG5hbWUpIHtcbiAgdmFyIHR3ZWVuMCwgdHdlZW4xO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9IHR3ZWVuMCA9IHR3ZWVuO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMSA9IHR3ZWVuMS5zbGljZSgpO1xuICAgICAgICAgIHR3ZWVuMS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdHdlZW5GdW5jdGlvbihpZCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHR3ZWVuMCwgdHdlZW4xO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSAodHdlZW4wID0gdHdlZW4pLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciB0ID0ge25hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZX0sIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjFbaV0gPSB0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gbikgdHdlZW4xLnB1c2godCk7XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIG5hbWUgKz0gXCJcIjtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgdHdlZW4gPSBnZXQodGhpcy5ub2RlKCksIGlkKS50d2VlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuLmxlbmd0aCwgdDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKCh0ID0gdHdlZW5baV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbCA/IHR3ZWVuUmVtb3ZlIDogdHdlZW5GdW5jdGlvbikoaWQsIG5hbWUsIHZhbHVlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0d2VlblZhbHVlKHRyYW5zaXRpb24sIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBpZCA9IHRyYW5zaXRpb24uX2lkO1xuXG4gIHRyYW5zaXRpb24uZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpO1xuICAgIChzY2hlZHVsZS52YWx1ZSB8fCAoc2NoZWR1bGUudmFsdWUgPSB7fSkpW25hbWVdID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gZ2V0KG5vZGUsIGlkKS52YWx1ZVtuYW1lXTtcbiAgfTtcbn1cbiIsImltcG9ydCB7Y29sb3J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtpbnRlcnBvbGF0ZU51bWJlciwgaW50ZXJwb2xhdGVSZ2IsIGludGVycG9sYXRlU3RyaW5nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgYztcbiAgcmV0dXJuICh0eXBlb2YgYiA9PT0gXCJudW1iZXJcIiA/IGludGVycG9sYXRlTnVtYmVyXG4gICAgICA6IGIgaW5zdGFuY2VvZiBjb2xvciA/IGludGVycG9sYXRlUmdiXG4gICAgICA6IChjID0gY29sb3IoYikpID8gKGIgPSBjLCBpbnRlcnBvbGF0ZVJnYilcbiAgICAgIDogaW50ZXJwb2xhdGVTdHJpbmcpKGEsIGIpO1xufVxuIiwiaW1wb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyBhcyBpbnRlcnBvbGF0ZVRyYW5zZm9ybX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSksIGkgPSBmdWxsbmFtZSA9PT0gXCJ0cmFuc2Zvcm1cIiA/IGludGVycG9sYXRlVHJhbnNmb3JtIDogaW50ZXJwb2xhdGU7XG4gIHJldHVybiB0aGlzLmF0dHJUd2VlbihuYW1lLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbikoZnVsbG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJhdHRyLlwiICsgbmFtZSwgdmFsdWUpKVxuICAgICAgOiB2YWx1ZSA9PSBudWxsID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkoZnVsbG5hbWUpXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KShmdWxsbmFtZSwgaSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgaS5jYWxsKHRoaXMsIHQpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlTlMoZnVsbG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgaS5jYWxsKHRoaXMsIHQpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlTlMoZnVsbG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW4obmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBrZXkgPSBcImF0dHIuXCIgKyBuYW1lO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCAoZnVsbG5hbWUubG9jYWwgPyBhdHRyVHdlZW5OUyA6IGF0dHJUd2VlbikoZnVsbG5hbWUsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge2dldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZGVsYXlGdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGluaXQodGhpcywgaWQpLmRlbGF5ID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlbGF5Q29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gZGVsYXlGdW5jdGlvblxuICAgICAgICAgIDogZGVsYXlDb25zdGFudCkoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZGVsYXk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkdXJhdGlvbkZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkdXJhdGlvbkNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gZHVyYXRpb25GdW5jdGlvblxuICAgICAgICAgIDogZHVyYXRpb25Db25zdGFudCkoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZHVyYXRpb247XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBlYXNlQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaChlYXNlQ29uc3RhbnQoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZWFzZTtcbn1cbiIsImltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBlYXNlVmFyeWluZyhpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIHYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy5lYWNoKGVhc2VWYXJ5aW5nKHRoaXMuX2lkLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHttYXRjaGVyfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIGlmICh0eXBlb2YgbWF0Y2ggIT09IFwiZnVuY3Rpb25cIikgbWF0Y2ggPSBtYXRjaGVyKG1hdGNoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gW10sIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgbWF0Y2guY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcbiAgaWYgKHRyYW5zaXRpb24uX2lkICE9PSB0aGlzLl9pZCkgdGhyb3cgbmV3IEVycm9yO1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSB0cmFuc2l0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihtZXJnZXMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXQsIGluaXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUpIHtcbiAgcmV0dXJuIChuYW1lICsgXCJcIikudHJpbSgpLnNwbGl0KC9efFxccysvKS5ldmVyeShmdW5jdGlvbih0KSB7XG4gICAgdmFyIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiAhdCB8fCB0ID09PSBcInN0YXJ0XCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgb24wLCBvbjEsIHNpdCA9IHN0YXJ0KG5hbWUpID8gaW5pdCA6IHNldDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNpdCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub247XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjApIChvbjEgPSAob24wID0gb24pLmNvcHkoKSkub24obmFtZSwgbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMlxuICAgICAgPyBnZXQodGhpcy5ub2RlKCksIGlkKS5vbi5vbihuYW1lKVxuICAgICAgOiB0aGlzLmVhY2gob25GdW5jdGlvbihpZCwgbmFtZSwgbGlzdGVuZXIpKTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZUZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fX3RyYW5zaXRpb24pIGlmICgraSAhPT0gaWQpIHJldHVybjtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vbihcImVuZC5yZW1vdmVcIiwgcmVtb3ZlRnVuY3Rpb24odGhpcy5faWQpKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0b3J9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkID0gdGhpcy5faWQ7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3Ioc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBzdWJub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChzdWJub2RlID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSkge1xuICAgICAgICBpZiAoXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICBzdWJncm91cFtpXSA9IHN1Ym5vZGU7XG4gICAgICAgIHNjaGVkdWxlKHN1Ymdyb3VwW2ldLCBuYW1lLCBpZCwgaSwgc3ViZ3JvdXAsIGdldChub2RlLCBpZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0b3JBbGx9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkID0gdGhpcy5faWQ7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBmb3IgKHZhciBjaGlsZHJlbiA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSwgY2hpbGQsIGluaGVyaXQgPSBnZXQobm9kZSwgaWQpLCBrID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgayA8IGw7ICsraykge1xuICAgICAgICAgIGlmIChjaGlsZCA9IGNoaWxkcmVuW2tdKSB7XG4gICAgICAgICAgICBzY2hlZHVsZShjaGlsZCwgbmFtZSwgaWQsIGssIGNoaWxkcmVuLCBpbmhlcml0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3ViZ3JvdXBzLnB1c2goY2hpbGRyZW4pO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxudmFyIFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9ncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiaW1wb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyBhcyBpbnRlcnBvbGF0ZVRyYW5zZm9ybX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge3N0eWxlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCBpbnRlcnBvbGF0ZSBmcm9tIFwiLi9pbnRlcnBvbGF0ZS5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZU51bGwobmFtZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpLFxuICAgICAgICBzdHJpbmcxID0gKHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSksIHN0eWxlKHRoaXMsIG5hbWUpKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgc3RyaW5nMTAgPSBzdHJpbmcxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVGdW5jdGlvbihuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpLFxuICAgICAgICB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSxcbiAgICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSBzdHJpbmcxID0gdmFsdWUxID0gKHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSksIHN0eWxlKHRoaXMsIG5hbWUpKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlTWF5YmVSZW1vdmUoaWQsIG5hbWUpIHtcbiAgdmFyIG9uMCwgb24xLCBsaXN0ZW5lcjAsIGtleSA9IFwic3R5bGUuXCIgKyBuYW1lLCBldmVudCA9IFwiZW5kLlwiICsga2V5LCByZW1vdmU7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICBvbiA9IHNjaGVkdWxlLm9uLFxuICAgICAgICBsaXN0ZW5lciA9IHNjaGVkdWxlLnZhbHVlW2tleV0gPT0gbnVsbCA/IHJlbW92ZSB8fCAocmVtb3ZlID0gc3R5bGVSZW1vdmUobmFtZSkpIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmIChvbiAhPT0gb24wIHx8IGxpc3RlbmVyMCAhPT0gbGlzdGVuZXIpIChvbjEgPSAob24wID0gb24pLmNvcHkoKSkub24oZXZlbnQsIGxpc3RlbmVyMCA9IGxpc3RlbmVyKTtcblxuICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGkgPSAobmFtZSArPSBcIlwiKSA9PT0gXCJ0cmFuc2Zvcm1cIiA/IGludGVycG9sYXRlVHJhbnNmb3JtIDogaW50ZXJwb2xhdGU7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVOdWxsKG5hbWUsIGkpKVxuICAgICAgLm9uKFwiZW5kLnN0eWxlLlwiICsgbmFtZSwgc3R5bGVSZW1vdmUobmFtZSkpXG4gICAgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlRnVuY3Rpb24obmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcInN0eWxlLlwiICsgbmFtZSwgdmFsdWUpKSlcbiAgICAgIC5lYWNoKHN0eWxlTWF5YmVSZW1vdmUodGhpcy5faWQsIG5hbWUpKVxuICAgIDogdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVDb25zdGFudChuYW1lLCBpLCB2YWx1ZSksIHByaW9yaXR5KVxuICAgICAgLm9uKFwiZW5kLnN0eWxlLlwiICsgbmFtZSwgbnVsbCk7XG59XG4iLCJmdW5jdGlvbiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCBpLmNhbGwodGhpcywgdCksIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVUd2VlbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIHQsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0ID0gKGkwID0gaSkgJiYgc3R5bGVJbnRlcnBvbGF0ZShuYW1lLCBpLCBwcmlvcml0eSk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciBrZXkgPSBcInN0eWxlLlwiICsgKG5hbWUgKz0gXCJcIik7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSk7XG59XG4iLCJpbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZTEgPSB2YWx1ZSh0aGlzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWUxID09IG51bGwgPyBcIlwiIDogdmFsdWUxO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdGhpcy50d2VlbihcInRleHRcIiwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gdGV4dEZ1bmN0aW9uKHR3ZWVuVmFsdWUodGhpcywgXCJ0ZXh0XCIsIHZhbHVlKSlcbiAgICAgIDogdGV4dENvbnN0YW50KHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiKSk7XG59XG4iLCJmdW5jdGlvbiB0ZXh0SW50ZXJwb2xhdGUoaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSBpLmNhbGwodGhpcywgdCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRUd2Vlbih2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIHRleHRJbnRlcnBvbGF0ZShpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGtleSA9IFwidGV4dFwiO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgdGV4dFR3ZWVuKHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb24sIG5ld0lkfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQwID0gdGhpcy5faWQsXG4gICAgICBpZDEgPSBuZXdJZCgpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHZhciBpbmhlcml0ID0gZ2V0KG5vZGUsIGlkMCk7XG4gICAgICAgIHNjaGVkdWxlKG5vZGUsIG5hbWUsIGlkMSwgaSwgZ3JvdXAsIHtcbiAgICAgICAgICB0aW1lOiBpbmhlcml0LnRpbWUgKyBpbmhlcml0LmRlbGF5ICsgaW5oZXJpdC5kdXJhdGlvbixcbiAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICBkdXJhdGlvbjogaW5oZXJpdC5kdXJhdGlvbixcbiAgICAgICAgICBlYXNlOiBpbmhlcml0LmVhc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQxKTtcbn1cbiIsImltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIG9uMCwgb24xLCB0aGF0ID0gdGhpcywgaWQgPSB0aGF0Ll9pZCwgc2l6ZSA9IHRoYXQuc2l6ZSgpO1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGNhbmNlbCA9IHt2YWx1ZTogcmVqZWN0fSxcbiAgICAgICAgZW5kID0ge3ZhbHVlOiBmdW5jdGlvbigpIHsgaWYgKC0tc2l6ZSA9PT0gMCkgcmVzb2x2ZSgpOyB9fTtcblxuICAgIHRoYXQuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICAgIGlmIChvbiAhPT0gb24wKSB7XG4gICAgICAgIG9uMSA9IChvbjAgPSBvbikuY29weSgpO1xuICAgICAgICBvbjEuXy5jYW5jZWwucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5pbnRlcnJ1cHQucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5lbmQucHVzaChlbmQpO1xuICAgICAgfVxuXG4gICAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgICB9KTtcblxuICAgIC8vIFRoZSBzZWxlY3Rpb24gd2FzIGVtcHR5LCByZXNvbHZlIGVuZCBpbW1lZGlhdGVseVxuICAgIGlmIChzaXplID09PSAwKSByZXNvbHZlKCk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHIgZnJvbSBcIi4vYXR0ci5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0clR3ZWVuIGZyb20gXCIuL2F0dHJUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZGVsYXkgZnJvbSBcIi4vZGVsYXkuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2R1cmF0aW9uIGZyb20gXCIuL2R1cmF0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lYXNlIGZyb20gXCIuL2Vhc2UuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nIGZyb20gXCIuL2Vhc2VWYXJ5aW5nLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGwuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZVR3ZWVuIGZyb20gXCIuL3N0eWxlVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dFR3ZWVuIGZyb20gXCIuL3RleHRUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90d2VlbiBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZW5kIGZyb20gXCIuL2VuZC5qc1wiO1xuXG52YXIgaWQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNpdGlvbihncm91cHMsIHBhcmVudHMsIG5hbWUsIGlkKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG4gIHRoaXMuX25hbWUgPSBuYW1lO1xuICB0aGlzLl9pZCA9IGlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHNlbGVjdGlvbigpLnRyYW5zaXRpb24obmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdJZCgpIHtcbiAgcmV0dXJuICsraWQ7XG59XG5cbnZhciBzZWxlY3Rpb25fcHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZTtcblxuVHJhbnNpdGlvbi5wcm90b3R5cGUgPSB0cmFuc2l0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zaXRpb24sXG4gIHNlbGVjdDogdHJhbnNpdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogdHJhbnNpdGlvbl9zZWxlY3RBbGwsXG4gIHNlbGVjdENoaWxkOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3Byb3RvdHlwZS5zZWxlY3RDaGlsZHJlbixcbiAgZmlsdGVyOiB0cmFuc2l0aW9uX2ZpbHRlcixcbiAgbWVyZ2U6IHRyYW5zaXRpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogdHJhbnNpdGlvbl9zZWxlY3Rpb24sXG4gIHRyYW5zaXRpb246IHRyYW5zaXRpb25fdHJhbnNpdGlvbixcbiAgY2FsbDogc2VsZWN0aW9uX3Byb3RvdHlwZS5jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX3Byb3RvdHlwZS5ub2RlcyxcbiAgbm9kZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fcHJvdG90eXBlLmVtcHR5LFxuICBlYWNoOiBzZWxlY3Rpb25fcHJvdG90eXBlLmVhY2gsXG4gIG9uOiB0cmFuc2l0aW9uX29uLFxuICBhdHRyOiB0cmFuc2l0aW9uX2F0dHIsXG4gIGF0dHJUd2VlbjogdHJhbnNpdGlvbl9hdHRyVHdlZW4sXG4gIHN0eWxlOiB0cmFuc2l0aW9uX3N0eWxlLFxuICBzdHlsZVR3ZWVuOiB0cmFuc2l0aW9uX3N0eWxlVHdlZW4sXG4gIHRleHQ6IHRyYW5zaXRpb25fdGV4dCxcbiAgdGV4dFR3ZWVuOiB0cmFuc2l0aW9uX3RleHRUd2VlbixcbiAgcmVtb3ZlOiB0cmFuc2l0aW9uX3JlbW92ZSxcbiAgdHdlZW46IHRyYW5zaXRpb25fdHdlZW4sXG4gIGRlbGF5OiB0cmFuc2l0aW9uX2RlbGF5LFxuICBkdXJhdGlvbjogdHJhbnNpdGlvbl9kdXJhdGlvbixcbiAgZWFzZTogdHJhbnNpdGlvbl9lYXNlLFxuICBlYXNlVmFyeWluZzogdHJhbnNpdGlvbl9lYXNlVmFyeWluZyxcbiAgZW5kOiB0cmFuc2l0aW9uX2VuZCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXVxufTtcbiIsImV4cG9ydCBjb25zdCBsaW5lYXIgPSB0ID0+ICt0O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb24sIG5ld0lkfSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlIGZyb20gXCIuLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge2Vhc2VDdWJpY0luT3V0fSBmcm9tIFwiZDMtZWFzZVwiO1xuaW1wb3J0IHtub3d9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZGVmYXVsdFRpbWluZyA9IHtcbiAgdGltZTogbnVsbCwgLy8gU2V0IG9uIHVzZS5cbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiAyNTAsXG4gIGVhc2U6IGVhc2VDdWJpY0luT3V0XG59O1xuXG5mdW5jdGlvbiBpbmhlcml0KG5vZGUsIGlkKSB7XG4gIHZhciB0aW1pbmc7XG4gIHdoaWxlICghKHRpbWluZyA9IG5vZGUuX190cmFuc2l0aW9uKSB8fCAhKHRpbWluZyA9IHRpbWluZ1tpZF0pKSB7XG4gICAgaWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJhbnNpdGlvbiAke2lkfSBub3QgZm91bmRgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRpbWluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgaWQsXG4gICAgICB0aW1pbmc7XG5cbiAgaWYgKG5hbWUgaW5zdGFuY2VvZiBUcmFuc2l0aW9uKSB7XG4gICAgaWQgPSBuYW1lLl9pZCwgbmFtZSA9IG5hbWUuX25hbWU7XG4gIH0gZWxzZSB7XG4gICAgaWQgPSBuZXdJZCgpLCAodGltaW5nID0gZGVmYXVsdFRpbWluZykudGltZSA9IG5vdygpLCBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQsIGksIGdyb3VwLCB0aW1pbmcgfHwgaW5oZXJpdChub2RlLCBpZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ludGVycnVwdCBmcm9tIFwiLi9pbnRlcnJ1cHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5cbnNlbGVjdGlvbi5wcm90b3R5cGUuaW50ZXJydXB0ID0gc2VsZWN0aW9uX2ludGVycnVwdDtcbnNlbGVjdGlvbi5wcm90b3R5cGUudHJhbnNpdGlvbiA9IHNlbGVjdGlvbl90cmFuc2l0aW9uO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIFRyYW5zZm9ybShrLCB4LCB5KSB7XG4gIHRoaXMuayA9IGs7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMueSA9IHk7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2Zvcm0sXG4gIHNjYWxlOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGsgPT09IDEgPyB0aGlzIDogbmV3IFRyYW5zZm9ybSh0aGlzLmsgKiBrLCB0aGlzLngsIHRoaXMueSk7XG4gIH0sXG4gIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB4ID09PSAwICYgeSA9PT0gMCA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuaywgdGhpcy54ICsgdGhpcy5rICogeCwgdGhpcy55ICsgdGhpcy5rICogeSk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiBbcG9pbnRbMF0gKiB0aGlzLmsgKyB0aGlzLngsIHBvaW50WzFdICogdGhpcy5rICsgdGhpcy55XTtcbiAgfSxcbiAgYXBwbHlYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggKiB0aGlzLmsgKyB0aGlzLng7XG4gIH0sXG4gIGFwcGx5WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5ICogdGhpcy5rICsgdGhpcy55O1xuICB9LFxuICBpbnZlcnQ6IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIFsobG9jYXRpb25bMF0gLSB0aGlzLngpIC8gdGhpcy5rLCAobG9jYXRpb25bMV0gLSB0aGlzLnkpIC8gdGhpcy5rXTtcbiAgfSxcbiAgaW52ZXJ0WDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCAtIHRoaXMueCkgLyB0aGlzLms7XG4gIH0sXG4gIGludmVydFk6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gKHkgLSB0aGlzLnkpIC8gdGhpcy5rO1xuICB9LFxuICByZXNjYWxlWDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4LmNvcHkoKS5kb21haW4oeC5yYW5nZSgpLm1hcCh0aGlzLmludmVydFgsIHRoaXMpLm1hcCh4LmludmVydCwgeCkpO1xuICB9LFxuICByZXNjYWxlWTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5LmNvcHkoKS5kb21haW4oeS5yYW5nZSgpLm1hcCh0aGlzLmludmVydFksIHRoaXMpLm1hcCh5LmludmVydCwgeSkpO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgdGhpcy54ICsgXCIsXCIgKyB0aGlzLnkgKyBcIikgc2NhbGUoXCIgKyB0aGlzLmsgKyBcIilcIjtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IG5ldyBUcmFuc2Zvcm0oMSwgMCwgMCk7XG5cbnRyYW5zZm9ybS5wcm90b3R5cGUgPSBUcmFuc2Zvcm0ucHJvdG90eXBlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm0obm9kZSkge1xuICB3aGlsZSAoIW5vZGUuX196b29tKSBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkgcmV0dXJuIGlkZW50aXR5O1xuICByZXR1cm4gbm9kZS5fX3pvb207XG59XG4iLCJleHBvcnQgY29uc3Qgc3ZnbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gPFQgZXh0ZW5kcyBFbGVtZW50PihcbiAgc2VsZWN0b3I6IHN0cmluZyxcbiAgdHlwZT86IG5ldyAoKSA9PiBUXG4pOiBUID0+IHtcbiAgY29uc3QgZWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIGlmIChlbHQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBzZWxlY3RvciBcIiArIHNlbGVjdG9yKTtcbiAgfVxuICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmICEoZWx0IGluc3RhbmNlb2YgdHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNlbGVjdG9yICR7c2VsZWN0b3J9IG5vdCBvZiB0eXBlICR7dHlwZX1gKTtcbiAgfVxuICByZXR1cm4gZWx0IGFzIFQ7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGZpdHRzID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYmlnVGFyZ2V0MSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5iaWctdGFyZ2V0MVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMzUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDI1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAxNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgNSk7XG4gIGNvbnN0IGJpZ1RhcmdldDIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmZpdHRzIGcuYmlnLXRhcmdldDJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDM1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAyNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMTUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDUpO1xuICBjb25zdCBzbWFsbFRhcmdldCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5zbWFsbC10YXJnZXRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShzbWFsbFRhcmdldCwgNDAsIDUwLCA1KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgcHVycG9zZSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGJpZ1RhcmdldDEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnB1cnBvc2UgZy50YXJnZXRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCA0MCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDMwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMjApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAxMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDEpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBoaWNrID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZzEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDFcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzEsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMCw0MCA0MCw0MFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnMiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wMlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMixcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDQwIDQwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzMgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDNcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzMsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDQwIDQwLDQwIDQwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzQgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzQsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMjAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNSxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDIwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc2ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA2XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc2LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCw0MCA0MCw0MCAyMCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGpha29iID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYXBwMSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy5hcHAtMVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGFwcDEsIDQwLCA1MCwgMzUpO1xuICBjb25zdCBhcHAyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLmFwcC0yXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYXBwMiwgNDAsIDUwLCAzNSk7XG4gIGNvbnN0IHlvdXJBcHAgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcueW91ci1hcHBcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZSh5b3VyQXBwLCA0MCwgNTAsIDM1KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZ3JhZGllbnQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5ncmFkaWVudCBnXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDUsIDMwLCA0MCwgNDAsIDEpO1xuICB0LmNyZWF0ZVJlY3QoZywgNTAsIDMwLCA0MCwgNDAsIDIpO1xuICB0LmNyZWF0ZVJlY3QoZywgOTUsIDMwLCA0MCwgNDAsIDMpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTQwLCAzMCwgNDAsIDQwLCA0KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDE4NSwgMzAsIDQwLCA0MCwgNSk7XG4gIHQuY3JlYXRlUmVjdChnLCAyMzAsIDMwLCA0MCwgNDAsIDYpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBnZXN0YWx0ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZ2VzdGFsdCBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogXCJmdWxsXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHByb3hpbWl0eSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnByb3hpbWl0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0geCA+IDEgJiYgeSA8IDIgPyA4IDogMDtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCArIG9mZnNldCwgeSAqIDIwICsgMjAgLSBvZmZzZXQsIDUsIHtcbiAgICAgICAgY2xhc3M6IFwiZnVsbFwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBzaW1pbGFyaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuc2ltaWxhcml0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3QgbXlDbGFzcyA9IHggPiAxICYmIHkgPCAyID8gXCJ4eHhcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogbXlDbGFzcyxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgY29tbW9uUmVnaW9uID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuY29tbW9uUmVnaW9uIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTAwICsgMzIsIDEyLCA1NywgMzcsIDIpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAsIHkgKiAyMCArIDIwLCA1LCB7XG4gICAgICAgIGNsYXNzOiBcImZ1bGxcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3Qgc2ltcGxpY2l0eSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnNpbXBsaWNpdHkgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCAxMDAgKyAzMiwgMTIsIDU3LCAzNywgMik7XG4gIHQuY3JlYXRlUmVjdChnLCAxMDAgLSA4LCAxMiwgOTcsIDc3LCAyKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgbWlsbGVyID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcubWlsbGVyIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxMzAsIDIwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTUwLCAyMCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDE3MCwgMjAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxNzAsIDQwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTcwLCA2MCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDE3MCwgODAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCB0ZXNsZXIgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy50ZXNsZXIgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgMTAwICsgaSAqIDIwLCAyMCwgNSwge1xuICAgICAgY2xhc3M6IGkgPj0gMyA/IFwiZW1wdHlcIiA6IFwiZnVsbFwiLFxuICAgIH0pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgMTAwICsgaSAqIDIwLCA1MCwgNSwgeyBjbGFzczogaSAlIDIgPyBcImVtcHR5XCIgOiBcImZ1bGxcIiB9KTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgIHQuY3JlYXRlQ2lyY2xlKGcsIDEwMCArIGkgKiAyMCwgODAsIDUsIHsgY2xhc3M6IGkgPCAzID8gXCJlbXB0eVwiIDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgcG9zdGVsID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucG9zdGVsIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShnLCA4MCwgNTAsIDM1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMjIwLCA1MCwgMzUsIHsgY2xhc3M6IFwiZW1wdHlcIiB9KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgemVpZ2FybmlrID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuemVpZ2FybmlrIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgIHQuY3JlYXRlUmVjdChnLCA1MCwgaSAqIDE1LCAyMDAsIDEwLCA2LCBcImVtcHR5cmVjdFwiKTtcbiAgfVxuICB0LmNyZWF0ZVJlY3QoZywgNTAsIDUgKiAxNSwgMTUwLCAxMCwgNiwgXCJmdWxscmVjdFwiKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3Qgdm9uUmVzdG9yZmYgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy52b25SZXN0b3JmZiBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3QgbXlDbGFzcyA9IHggPT09IDIgJiYgeSA9PT0gMiA/IFwieHh4XCIgOiBcImZ1bGxcIjtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCwgeSAqIDIwICsgMjAsIDUsIHtcbiAgICAgICAgY2xhc3M6IG15Q2xhc3MsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuL1NWR1Rvb2xcIjtcbmltcG9ydCB7IGZpdHRzIH0gZnJvbSBcIi4vc3Zncy9maXR0c1wiO1xuaW1wb3J0IHsgcHVycG9zZSB9IGZyb20gXCIuL3N2Z3MvcHVycG9zZVwiO1xuaW1wb3J0IHsgaGljayB9IGZyb20gXCIuL3N2Z3MvaGlja1wiO1xuaW1wb3J0IHsgamFrb2IgfSBmcm9tIFwiLi9zdmdzL2pha29iXCI7XG5pbXBvcnQgeyBncmFkaWVudCB9IGZyb20gXCIuL3N2Z3MvZ3JhZGllbnRcIjtcbmltcG9ydCB7IGdlc3RhbHQgfSBmcm9tIFwiLi9zdmdzL2dlc3RhbHRcIjtcbmltcG9ydCB7IHByb3hpbWl0eSB9IGZyb20gXCIuL3N2Z3MvcHJveGltaXR5XCI7XG5pbXBvcnQgeyBzaW1pbGFyaXR5IH0gZnJvbSBcIi4vc3Zncy9zaW1pbGFyaXR5XCI7XG5pbXBvcnQgeyBjb21tb25SZWdpb24gfSBmcm9tIFwiLi9zdmdzL2NvbW1vblJlZ2lvblwiO1xuaW1wb3J0IHsgc2ltcGxpY2l0eSB9IGZyb20gXCIuL3N2Z3Mvc2ltcGxpY2l0eVwiO1xuaW1wb3J0IHsgbWlsbGVyIH0gZnJvbSBcIi4vc3Zncy9taWxsZXJcIjtcbmltcG9ydCB7IHRlc2xlciB9IGZyb20gXCIuL3N2Z3MvdGVzbGVyXCI7XG5pbXBvcnQgeyBwb3N0ZWwgfSBmcm9tIFwiLi9zdmdzL3Bvc3RlbFwiO1xuaW1wb3J0IHsgemVpZ2FybmlrIH0gZnJvbSBcIi4vc3Zncy96ZWlnYXJuaWtcIjtcbmltcG9ydCB7IHZvblJlc3RvcmZmIH0gZnJvbSBcIi4vc3Zncy92b25SZXN0b3JmZlwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnOiB7IFtrZXk6IHN0cmluZ106ICgodDogU1ZHVG9vbCkgPT4gdm9pZClbXSB9ID0ge1xuICBmaXR0czogW2ZpdHRzXSxcbiAgcHVycG9zZTogW3B1cnBvc2VdLFxuICBoaWNrOiBbaGlja10sXG4gIGpha29iOiBbamFrb2JdLFxuICBncmFkaWVudDogW2dyYWRpZW50XSxcbiAgZ2VzdGFsdDogW2dlc3RhbHRdLFxuICBwcm94aW1pdHk6IFtwcm94aW1pdHldLFxuICBzaW1pbGFyaXR5OiBbc2ltaWxhcml0eV0sXG4gIGNvbW1vblJlZ2lvbjogW2NvbW1vblJlZ2lvbl0sXG4gIHNpbXBsaWNpdHk6IFtzaW1wbGljaXR5XSxcbiAgbWlsbGVyOiBbbWlsbGVyXSxcbiAgdGVzbGVyOiBbdGVzbGVyXSxcbiAgcG9zdGVsOiBbcG9zdGVsXSxcbiAgemVpZ2FybmlrOiBbemVpZ2FybmlrXSxcbiAgdm9uUmVzdG9yZmY6IFt2b25SZXN0b3JmZl0sXG59O1xuXG5jb25zdCBzZXQgPSBuZXcgU2V0PCh0OiBTVkdUb29sKSA9PiB2b2lkPigpO1xuZm9yIChjb25zdCB2YWx1ZXMgb2YgT2JqZWN0LnZhbHVlcyhjb25maWcpKSB7XG4gIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgc2V0LmFkZCh2YWx1ZSk7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBhbGwgPSBbLi4uc2V0XTtcbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCJkM1wiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1RyYW5zaXRpb25PcHRpb25zXCI7XG5pbXBvcnQgeyBjb25maWcsIGFsbCB9IGZyb20gXCIuL3N2Z0NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgU1ZHVG9vbCB7XG4gIGRlbGF5Q291bnRlciA9IDA7XG4gIGRlbGF5SW5jcmVtZW50ID0gMTAwO1xuICB1c2VUcmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgc3ZnTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXRTdmdOYW1lKCk7XG4gIH1cblxuICBpbml0U3ZnTmFtZSgpIHtcbiAgICBjb25zdCBzdmdOYW1lID0gKHdpbmRvdyBhcyBhbnkpW1widXhsYXdJbWFnZU5hbWVcIl07XG4gICAgaWYgKHN2Z05hbWUpIHtcbiAgICAgIHRoaXMuc3ZnTmFtZSA9IHN2Z05hbWU7XG4gICAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXRTdmcoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3ZnTmFtZSA/IGNvbmZpZ1t0aGlzLnN2Z05hbWVdIDogYWxsO1xuICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBmIG9mIGxpc3QpIHtcbiAgICAgIGYodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVsYXkoKSB7XG4gICAgdGhpcy5kZWxheUNvdW50ZXIgKz0gdGhpcy5kZWxheUluY3JlbWVudDtcbiAgICByZXR1cm4gdGhpcy5kZWxheUNvdW50ZXI7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUoXG4gICAgZ3JvdXA6IFNWR0dFbGVtZW50LFxuICAgIGN4OiBudW1iZXIsXG4gICAgY3k6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3JtKFxuICAgICAgZ3JvdXAsXG4gICAgICBcImNpcmNsZVwiLFxuICAgICAge1xuICAgICAgICBjeCxcbiAgICAgICAgY3ksXG4gICAgICAgIHI6IDAsXG4gICAgICB9LFxuICAgICAgeyByIH0sXG4gICAgICBvcHRzXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlnb24oZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWdvblwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUG9seWxpbmUoZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWxpbmVcIixcbiAgICAgIHsgcG9pbnRzOiBcIlwiIH0sXG4gICAgICB7IHBvaW50czogcG9pbnRzIH0sXG4gICAgICB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRlbGF5OiB0aGlzLmdldERlbGF5KCksXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVJlY3QoXG4gICAgZ3JvdXA6IFNWR0dFbGVtZW50LFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBpbnRlbnNpdHkgPSA2LFxuICAgIGNzc0NsYXNzID0gXCJlbXB0eVwiXG4gICkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicmVjdFwiLFxuICAgICAgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0OiAwLCBvcGFjaXR5OiBpbnRlbnNpdHkgKiAoMS4wIC8gNikgfSxcbiAgICAgIHsgaGVpZ2h0OiBoZWlnaHQgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgICAgY2xhc3M6IGNzc0NsYXNzLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVGb3JtID0gPFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IHN0cmluZyB9PihcbiAgICBjb250YWluZXI6IFNWR0dFbGVtZW50LFxuICAgIGVsdE5hbWU6IHN0cmluZyxcbiAgICBpbml0aWFsQXR0cmlidXRlczogVCxcbiAgICBmaW5hbEF0dHJpYnV0ZXM6IFBhcnRpYWw8VD4sXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkgPT4ge1xuICAgIGNvbnN0IG9wdHM6IFRyYW5zaXRpb25PcHRpb25zID0ge1xuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICBkZWxheTogMTAwMCxcbiAgICAgIGNsYXNzOiBcIlwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIGlmICghdGhpcy51c2VUcmFuc2l0aW9uKSB7XG4gICAgICBvcHRzLmRlbGF5ID0gMDtcbiAgICAgIG9wdHMuZHVyYXRpb24gPSAwO1xuICAgIH1cbiAgICBjb25zdCBlbHQgPSBkMy5zZWxlY3QoY29udGFpbmVyKS5hcHBlbmQoZWx0TmFtZSk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbml0aWFsQXR0cmlidXRlcykpIHtcbiAgICAgIGVsdC5hdHRyKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAob3B0cy5jbGFzcykge1xuICAgICAgZWx0LmF0dHIoXCJjbGFzc1wiLCBvcHRzLmNsYXNzKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ID0gZWx0XG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24ob3B0cy5kdXJhdGlvbilcbiAgICAgIC5kZWxheShvcHRzLmRlbGF5KVxuICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcik7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhmaW5hbEF0dHJpYnV0ZXMpKSB7XG4gICAgICB0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IGluaXRUaGVtZSA9ICgpID0+IHtcbiAgaGFuZGxlRGFya1RoZW1lKCk7XG5cbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgIFwiLS1wcmltYXJ5LWNvbG9yXCIsXG4gICAgXCJoc2woMTIwLCAxMDAlLCAyNSUpXCJcbiAgKTtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgIFwiLS1maWxsLWNvbG9yXCIsXG4gICAgXCJoc2xhKDEyMCwgMCUsIDI1JSwgMC4xKVwiXG4gICk7XG59O1xuXG5jb25zdCBoYW5kbGVEYXJrVGhlbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGlzRGFyayA9XG4gICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcztcblxuICBjb25zdCBjbCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0O1xuICBpc0RhcmsgPyBjbC5hZGQoXCJkYXJrXCIpIDogY2wuYWRkKFwibGlnaHRcIik7XG5cbiAgd2luZG93XG4gICAgLm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gZS5tYXRjaGVzID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbG9yU2NoZW1lOiBcIiwgY29sb3JTY2hlbWUpO1xuXG4gICAgICBjbC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgICAgY2wucmVtb3ZlKFwibGlnaHRcIik7XG4gICAgICBpZiAoY29sb3JTY2hlbWUgPT09IFwiZGFya1wiKSB7XG4gICAgICAgIGNsLmFkZChcImRhcmtcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbC5hZGQoXCJsaWdodFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi9TVkdUb29sXCI7XG5cbmltcG9ydCB7IGluaXRUaGVtZSB9IGZyb20gXCIuL3RoZW1lXCI7XG5cbmluaXRUaGVtZSgpO1xuXG5jb25zdCBzdmdUb29sID0gbmV3IFNWR1Rvb2woKTtcbnN2Z1Rvb2wuaW5pdFN2ZygpO1xuIl0sIm5hbWVzIjpbIm5vb3AiLCJkaXNwYXRjaCIsImkiLCJuIiwiXyIsInQiLCJEaXNwYXRjaCIsInBhcnNlVHlwZW5hbWVzIiwidHlwZW5hbWVzIiwidHlwZXMiLCJuYW1lIiwidHlwZW5hbWUiLCJjYWxsYmFjayIsIlQiLCJnZXQiLCJzZXQiLCJjb3B5IiwidHlwZSIsInRoYXQiLCJhcmdzIiwiYyIsInhodG1sIiwibmFtZXNwYWNlcyIsIm5hbWVzcGFjZSIsInByZWZpeCIsImNyZWF0b3JJbmhlcml0IiwiZG9jdW1lbnQiLCJ1cmkiLCJjcmVhdG9yRml4ZWQiLCJmdWxsbmFtZSIsImNyZWF0b3IiLCJub25lIiwic2VsZWN0b3IiLCJzZWxlY3Rpb25fc2VsZWN0Iiwic2VsZWN0IiwiZ3JvdXBzIiwibSIsInN1Ymdyb3VwcyIsImoiLCJncm91cCIsInN1Ymdyb3VwIiwibm9kZSIsInN1Ym5vZGUiLCJTZWxlY3Rpb24iLCJhcnJheSIsIngiLCJlbXB0eSIsInNlbGVjdG9yQWxsIiwiYXJyYXlBbGwiLCJzZWxlY3Rpb25fc2VsZWN0QWxsIiwicGFyZW50cyIsIm1hdGNoZXIiLCJjaGlsZE1hdGNoZXIiLCJmaW5kIiwiY2hpbGRGaW5kIiwibWF0Y2giLCJjaGlsZEZpcnN0Iiwic2VsZWN0aW9uX3NlbGVjdENoaWxkIiwiZmlsdGVyIiwiY2hpbGRyZW4iLCJjaGlsZHJlbkZpbHRlciIsInNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiIsInNlbGVjdGlvbl9maWx0ZXIiLCJzcGFyc2UiLCJ1cGRhdGUiLCJzZWxlY3Rpb25fZW50ZXIiLCJFbnRlck5vZGUiLCJwYXJlbnQiLCJkYXR1bSIsImNoaWxkIiwibmV4dCIsImNvbnN0YW50JDEiLCJiaW5kSW5kZXgiLCJlbnRlciIsImV4aXQiLCJkYXRhIiwiZ3JvdXBMZW5ndGgiLCJkYXRhTGVuZ3RoIiwiYmluZEtleSIsImtleSIsIm5vZGVCeUtleVZhbHVlIiwia2V5VmFsdWVzIiwia2V5VmFsdWUiLCJzZWxlY3Rpb25fZGF0YSIsInZhbHVlIiwiYmluZCIsImNvbnN0YW50IiwiYXJyYXlsaWtlIiwiZW50ZXJHcm91cCIsInVwZGF0ZUdyb3VwIiwiZXhpdEdyb3VwIiwiaTAiLCJpMSIsInByZXZpb3VzIiwic2VsZWN0aW9uX2V4aXQiLCJzZWxlY3Rpb25fam9pbiIsIm9uZW50ZXIiLCJvbnVwZGF0ZSIsIm9uZXhpdCIsInNlbGVjdGlvbl9tZXJnZSIsImNvbnRleHQiLCJzZWxlY3Rpb24iLCJncm91cHMwIiwiZ3JvdXBzMSIsIm0wIiwibTEiLCJtZXJnZXMiLCJncm91cDAiLCJncm91cDEiLCJtZXJnZSIsInNlbGVjdGlvbl9vcmRlciIsInNlbGVjdGlvbl9zb3J0IiwiY29tcGFyZSIsImFzY2VuZGluZyIsImNvbXBhcmVOb2RlIiwiYSIsImIiLCJzb3J0Z3JvdXBzIiwic29ydGdyb3VwIiwic2VsZWN0aW9uX2NhbGwiLCJzZWxlY3Rpb25fbm9kZXMiLCJzZWxlY3Rpb25fbm9kZSIsInNlbGVjdGlvbl9zaXplIiwic2l6ZSIsInNlbGVjdGlvbl9lbXB0eSIsInNlbGVjdGlvbl9lYWNoIiwiYXR0clJlbW92ZSIsImF0dHJSZW1vdmVOUyIsImF0dHJDb25zdGFudCIsImF0dHJDb25zdGFudE5TIiwiYXR0ckZ1bmN0aW9uIiwidiIsImF0dHJGdW5jdGlvbk5TIiwic2VsZWN0aW9uX2F0dHIiLCJkZWZhdWx0VmlldyIsInN0eWxlUmVtb3ZlIiwic3R5bGVDb25zdGFudCIsInByaW9yaXR5Iiwic3R5bGVGdW5jdGlvbiIsInNlbGVjdGlvbl9zdHlsZSIsInN0eWxlVmFsdWUiLCJwcm9wZXJ0eVJlbW92ZSIsInByb3BlcnR5Q29uc3RhbnQiLCJwcm9wZXJ0eUZ1bmN0aW9uIiwic2VsZWN0aW9uX3Byb3BlcnR5IiwiY2xhc3NBcnJheSIsInN0cmluZyIsImNsYXNzTGlzdCIsIkNsYXNzTGlzdCIsImNsYXNzZWRBZGQiLCJuYW1lcyIsImxpc3QiLCJjbGFzc2VkUmVtb3ZlIiwiY2xhc3NlZFRydWUiLCJjbGFzc2VkRmFsc2UiLCJjbGFzc2VkRnVuY3Rpb24iLCJzZWxlY3Rpb25fY2xhc3NlZCIsInRleHRSZW1vdmUiLCJ0ZXh0Q29uc3RhbnQiLCJ0ZXh0RnVuY3Rpb24iLCJzZWxlY3Rpb25fdGV4dCIsImh0bWxSZW1vdmUiLCJodG1sQ29uc3RhbnQiLCJodG1sRnVuY3Rpb24iLCJzZWxlY3Rpb25faHRtbCIsInJhaXNlIiwic2VsZWN0aW9uX3JhaXNlIiwibG93ZXIiLCJzZWxlY3Rpb25fbG93ZXIiLCJzZWxlY3Rpb25fYXBwZW5kIiwiY3JlYXRlIiwiY29uc3RhbnROdWxsIiwic2VsZWN0aW9uX2luc2VydCIsImJlZm9yZSIsInJlbW92ZSIsInNlbGVjdGlvbl9yZW1vdmUiLCJzZWxlY3Rpb25fY2xvbmVTaGFsbG93IiwiY2xvbmUiLCJzZWxlY3Rpb25fY2xvbmVEZWVwIiwic2VsZWN0aW9uX2Nsb25lIiwiZGVlcCIsInNlbGVjdGlvbl9kYXR1bSIsImNvbnRleHRMaXN0ZW5lciIsImxpc3RlbmVyIiwiZXZlbnQiLCJvblJlbW92ZSIsIm9uIiwib25BZGQiLCJvcHRpb25zIiwibyIsInNlbGVjdGlvbl9vbiIsImRpc3BhdGNoRXZlbnQiLCJwYXJhbXMiLCJ3aW5kb3ciLCJkaXNwYXRjaENvbnN0YW50IiwiZGlzcGF0Y2hGdW5jdGlvbiIsInNlbGVjdGlvbl9kaXNwYXRjaCIsInNlbGVjdGlvbl9pdGVyYXRvciIsInJvb3QiLCJzZWxlY3Rpb25fc2VsZWN0aW9uIiwiZGVmaW5lIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwicHJvdG90eXBlIiwiZXh0ZW5kIiwiZGVmaW5pdGlvbiIsIkNvbG9yIiwiZGFya2VyIiwiYnJpZ2h0ZXIiLCJyZUkiLCJyZU4iLCJyZVAiLCJyZUhleCIsInJlUmdiSW50ZWdlciIsInJlUmdiUGVyY2VudCIsInJlUmdiYUludGVnZXIiLCJyZVJnYmFQZXJjZW50IiwicmVIc2xQZXJjZW50IiwicmVIc2xhUGVyY2VudCIsIm5hbWVkIiwiY29sb3IiLCJjaGFubmVscyIsImNvbG9yX2Zvcm1hdEhleCIsImNvbG9yX2Zvcm1hdEhleDgiLCJjb2xvcl9mb3JtYXRIc2wiLCJjb2xvcl9mb3JtYXRSZ2IiLCJoc2xDb252ZXJ0IiwiZm9ybWF0IiwibCIsInJnYm4iLCJSZ2IiLCJyZ2JhIiwiaHNsYSIsInIiLCJnIiwicmdiQ29udmVydCIsInJnYiIsIm9wYWNpdHkiLCJrIiwiY2xhbXBpIiwiY2xhbXBhIiwicmdiX2Zvcm1hdEhleCIsInJnYl9mb3JtYXRIZXg4IiwicmdiX2Zvcm1hdFJnYiIsImhleCIsImgiLCJzIiwiSHNsIiwibWluIiwibWF4IiwiaHNsIiwibTIiLCJoc2wycmdiIiwiY2xhbXBoIiwiY2xhbXB0IiwibGluZWFyIiwiZCIsImV4cG9uZW50aWFsIiwieSIsImdhbW1hIiwibm9nYW1tYSIsImludGVycG9sYXRlUmdiIiwicmdiR2FtbWEiLCJzdGFydCIsImVuZCIsImNvbG9yUmdiIiwiaW50ZXJwb2xhdGVOdW1iZXIiLCJyZUEiLCJyZUIiLCJ6ZXJvIiwib25lIiwiaW50ZXJwb2xhdGVTdHJpbmciLCJiaSIsImFtIiwiYm0iLCJicyIsInEiLCJudW1iZXIiLCJkZWdyZWVzIiwiaWRlbnRpdHkiLCJkZWNvbXBvc2UiLCJlIiwiZiIsInNjYWxlWCIsInNjYWxlWSIsInNrZXdYIiwic3ZnTm9kZSIsInBhcnNlQ3NzIiwicGFyc2VTdmciLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybSIsInBhcnNlIiwicHhDb21tYSIsInB4UGFyZW4iLCJkZWdQYXJlbiIsInBvcCIsInRyYW5zbGF0ZSIsInhhIiwieWEiLCJ4YiIsInliIiwicm90YXRlIiwic2NhbGUiLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyIsImludGVycG9sYXRlVHJhbnNmb3JtU3ZnIiwiZnJhbWUiLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJwb2tlRGVsYXkiLCJ0YXNrSGVhZCIsInRhc2tUYWlsIiwiY2xvY2tMYXN0IiwiY2xvY2tOb3ciLCJjbG9ja1NrZXciLCJjbG9jayIsInNldEZyYW1lIiwibm93IiwiY2xlYXJOb3ciLCJUaW1lciIsInRpbWVyIiwiZGVsYXkiLCJ0aW1lIiwic2xlZXAiLCJ0aW1lckZsdXNoIiwid2FrZSIsIm5hcCIsInBva2UiLCJ0MCIsInQxIiwidDIiLCJlbGFwc2VkIiwiZW1wdHlPbiIsImVtcHR5VHdlZW4iLCJDUkVBVEVEIiwiU0NIRURVTEVEIiwiU1RBUlRJTkciLCJTVEFSVEVEIiwiUlVOTklORyIsIkVORElORyIsIkVOREVEIiwic2NoZWR1bGUiLCJpZCIsImluZGV4IiwidGltaW5nIiwic2NoZWR1bGVzIiwiaW5pdCIsInNlbGYiLCJ0d2VlbiIsInN0b3AiLCJ0aWNrIiwiaW50ZXJydXB0IiwiYWN0aXZlIiwic2VsZWN0aW9uX2ludGVycnVwdCIsInR3ZWVuUmVtb3ZlIiwidHdlZW4wIiwidHdlZW4xIiwidHdlZW5GdW5jdGlvbiIsInRyYW5zaXRpb25fdHdlZW4iLCJ0d2VlblZhbHVlIiwidHJhbnNpdGlvbiIsImludGVycG9sYXRlIiwidmFsdWUxIiwic3RyaW5nMDAiLCJzdHJpbmcxIiwiaW50ZXJwb2xhdGUwIiwic3RyaW5nMCIsInN0cmluZzEwIiwidHJhbnNpdGlvbl9hdHRyIiwiYXR0ckludGVycG9sYXRlIiwiYXR0ckludGVycG9sYXRlTlMiLCJhdHRyVHdlZW5OUyIsImF0dHJUd2VlbiIsInRyYW5zaXRpb25fYXR0clR3ZWVuIiwiZGVsYXlGdW5jdGlvbiIsImRlbGF5Q29uc3RhbnQiLCJ0cmFuc2l0aW9uX2RlbGF5IiwiZHVyYXRpb25GdW5jdGlvbiIsImR1cmF0aW9uQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2R1cmF0aW9uIiwiZWFzZUNvbnN0YW50IiwidHJhbnNpdGlvbl9lYXNlIiwiZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nIiwidHJhbnNpdGlvbl9maWx0ZXIiLCJUcmFuc2l0aW9uIiwidHJhbnNpdGlvbl9tZXJnZSIsIm9uRnVuY3Rpb24iLCJvbjAiLCJvbjEiLCJzaXQiLCJ0cmFuc2l0aW9uX29uIiwicmVtb3ZlRnVuY3Rpb24iLCJ0cmFuc2l0aW9uX3JlbW92ZSIsInRyYW5zaXRpb25fc2VsZWN0IiwidHJhbnNpdGlvbl9zZWxlY3RBbGwiLCJpbmhlcml0IiwidHJhbnNpdGlvbl9zZWxlY3Rpb24iLCJzdHlsZU51bGwiLCJzdHlsZSIsInN0eWxlTWF5YmVSZW1vdmUiLCJsaXN0ZW5lcjAiLCJ0cmFuc2l0aW9uX3N0eWxlIiwic3R5bGVJbnRlcnBvbGF0ZSIsInN0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3N0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3RleHQiLCJ0ZXh0SW50ZXJwb2xhdGUiLCJ0ZXh0VHdlZW4iLCJ0cmFuc2l0aW9uX3RleHRUd2VlbiIsInRyYW5zaXRpb25fdHJhbnNpdGlvbiIsImlkMCIsImlkMSIsIm5ld0lkIiwidHJhbnNpdGlvbl9lbmQiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FuY2VsIiwic2VsZWN0aW9uX3Byb3RvdHlwZSIsImN1YmljSW5PdXQiLCJkZWZhdWx0VGltaW5nIiwiZWFzZUN1YmljSW5PdXQiLCJzZWxlY3Rpb25fdHJhbnNpdGlvbiIsIlRyYW5zZm9ybSIsInBvaW50IiwibG9jYXRpb24iLCJxdWVyeVNlbGVjdG9yIiwiZWx0IiwiZml0dHMiLCJiaWdUYXJnZXQxIiwiYmlnVGFyZ2V0MiIsInNtYWxsVGFyZ2V0IiwicHVycG9zZSIsImhpY2siLCJnMSIsImcyIiwiZzMiLCJnNCIsImc1IiwiZzYiLCJqYWtvYiIsImFwcDEiLCJhcHAyIiwieW91ckFwcCIsImdyYWRpZW50IiwiZ2VzdGFsdCIsInByb3hpbWl0eSIsIm9mZnNldCIsInNpbWlsYXJpdHkiLCJteUNsYXNzIiwiY29tbW9uUmVnaW9uIiwic2ltcGxpY2l0eSIsIm1pbGxlciIsInRlc2xlciIsInBvc3RlbCIsInplaWdhcm5payIsInZvblJlc3RvcmZmIiwiY29uZmlnIiwidmFsdWVzIiwiYWxsIiwiU1ZHVG9vbCIsIl9fcHVibGljRmllbGQiLCJjb250YWluZXIiLCJlbHROYW1lIiwiaW5pdGlhbEF0dHJpYnV0ZXMiLCJmaW5hbEF0dHJpYnV0ZXMiLCJvcHRzIiwiZDMuc2VsZWN0IiwiZDMuZWFzZUxpbmVhciIsInN2Z05hbWUiLCJjeCIsImN5IiwicG9pbnRzIiwid2lkdGgiLCJoZWlnaHQiLCJpbnRlbnNpdHkiLCJjc3NDbGFzcyIsImluaXRUaGVtZSIsImhhbmRsZURhcmtUaGVtZSIsImlzRGFyayIsImNsIiwiY29sb3JTY2hlbWUiLCJzdmdUb29sIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxLQUFPLEVBQUMsT0FBTyxNQUFNO0FBQUEsRUFBRTtBQUUzQixTQUFTQyxLQUFXO0FBQ2xCLFdBQVNDLElBQUksR0FBR0MsSUFBSSxVQUFVLFFBQVFDLElBQUksQ0FBQSxHQUFJQyxHQUFHSCxJQUFJQyxHQUFHLEVBQUVELEdBQUc7QUFDM0QsUUFBSSxFQUFFRyxJQUFJLFVBQVVILENBQUMsSUFBSSxPQUFRRyxLQUFLRCxLQUFNLFFBQVEsS0FBS0MsQ0FBQztBQUFHLFlBQU0sSUFBSSxNQUFNLG1CQUFtQkEsQ0FBQztBQUNqRyxJQUFBRCxFQUFFQyxDQUFDLElBQUk7RUFDUjtBQUNELFNBQU8sSUFBSUMsRUFBU0YsQ0FBQztBQUN2QjtBQUVBLFNBQVNFLEVBQVNGLEdBQUc7QUFDbkIsT0FBSyxJQUFJQTtBQUNYO0FBRUEsU0FBU0csR0FBZUMsR0FBV0MsR0FBTztBQUN4QyxTQUFPRCxFQUFVLE9BQU8sTUFBTSxPQUFPLEVBQUUsSUFBSSxTQUFTSCxHQUFHO0FBQ3JELFFBQUlLLElBQU8sSUFBSSxJQUFJTCxFQUFFLFFBQVEsR0FBRztBQUVoQyxRQURJLEtBQUssTUFBR0ssSUFBT0wsRUFBRSxNQUFNLElBQUksQ0FBQyxHQUFHQSxJQUFJQSxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQy9DQSxLQUFLLENBQUNJLEVBQU0sZUFBZUosQ0FBQztBQUFHLFlBQU0sSUFBSSxNQUFNLG1CQUFtQkEsQ0FBQztBQUN2RSxXQUFPLEVBQUMsTUFBTUEsR0FBRyxNQUFNSyxFQUFJO0FBQUEsRUFDL0IsQ0FBRztBQUNIO0FBRUFKLEVBQVMsWUFBWUwsR0FBUyxZQUFZO0FBQUEsRUFDeEMsYUFBYUs7QUFBQSxFQUNiLElBQUksU0FBU0ssR0FBVUMsR0FBVTtBQUMvQixRQUFJUixJQUFJLEtBQUssR0FDVFMsSUFBSU4sR0FB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QUNkLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLGdCQUFnQjtBQUFBLEVBQ2hCLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLE9BQU87QUFBQSxFQUNQLGdCQUFnQjtBQUFBLEVBQ2hCLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQSxFQUNULE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUNWLFVBQVU7QUFBQSxFQUNWLGVBQWU7QUFBQSxFQUNmLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLFlBQVk7QUFBQSxFQUNaLFlBQVk7QUFBQSxFQUNaLFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLE9B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
