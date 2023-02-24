var ge = Object.defineProperty;
var ye = (t, e, n) => e in t ? ge(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var T = (t, e, n) => (ye(t, typeof e != "symbol" ? e + "" : e, n), n);
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
        if ((i = (t = r[o]).type) && (i = we(n[i], t.name)))
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
function we(t, e) {
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
function Xt(t) {
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
  return new m(r, this._parents);
}
function ke(t) {
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
function Ee(t) {
  return function() {
    return ke(t.apply(this, arguments));
  };
}
function Ae(t) {
  typeof t == "function" ? t = Ee(t) : t = Ot(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, c, l = 0; l < a; ++l)
      (c = s[l]) && (r.push(t.call(c, c.__data__, l, s)), i.push(c));
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
var Ge = Array.prototype.filter;
function Me() {
  return Array.from(this.children);
}
function Fe(t) {
  return function() {
    return Ge.call(this.children, t);
  };
}
function Ve(t) {
  return this.selectAll(t == null ? Me : Fe(typeof t == "function" ? t : Yt(t)));
}
function De(t) {
  typeof t != "function" && (t = Lt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], c, l = 0; l < s; ++l)
      (c = o[l]) && t.call(c, c.__data__, l, o) && a.push(c);
  return new m(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function Ie() {
  return new m(this._enter || this._groups.map(Bt), this._parents);
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
function Pe(t, e, n, r, i, o, s) {
  var a, c, l = /* @__PURE__ */ new Map(), u = e.length, f = o.length, h = new Array(u), d;
  for (a = 0; a < u; ++a)
    (c = e[a]) && (h[a] = d = s.call(c, c.__data__, a, e) + "", l.has(d) ? i[a] = c : l.set(d, c));
  for (a = 0; a < f; ++a)
    d = s.call(t, o[a], a, o) + "", (c = l.get(d)) ? (r[a] = c, c.__data__ = o[a], l.delete(d)) : n[a] = new Z(t, o[a]);
  for (a = 0; a < u; ++a)
    (c = e[a]) && l.get(h[a]) === c && (i[a] = c);
}
function Xe(t) {
  return t.__data__;
}
function Oe(t, e) {
  if (!arguments.length)
    return Array.from(this, Xe);
  var n = e ? Pe : He, r = this._parents, i = this._groups;
  typeof t != "function" && (t = qe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), c = new Array(o), l = 0; l < o; ++l) {
    var u = r[l], f = i[l], h = f.length, d = Le(t.call(u, u && u.__data__, l, r)), p = d.length, y = a[l] = new Array(p), E = s[l] = new Array(p), pe = c[l] = new Array(h);
    n(u, f, y, E, pe, d, e);
    for (var F = 0, B = 0, bt, Nt; F < p; ++F)
      if (bt = y[F]) {
        for (F >= B && (B = F + 1); !(Nt = E[B]) && ++B < p; )
          ;
        bt._next = Nt || null;
      }
  }
  return s = new m(s, r), s._enter = a, s._exit = c, s;
}
function Le(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ye() {
  return new m(this._exit || this._groups.map(Bt), this._parents);
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
    for (var s = n[o], a = s.length, c = i[o] = new Array(a), l, u = 0; u < a; ++u)
      (l = s[u]) && (c[u] = l);
    c.sort(e);
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
  return arguments.length > 1 ? this.each((e == null ? un : typeof e == "function" ? hn : fn)(t, e, n ?? "")) : G(this.node(), t);
}
function G(t, e) {
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
function mn(t) {
  return function() {
    Wt(this, t);
  };
}
function wn(t) {
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
  return this.each((typeof e == "function" ? vn : e ? mn : wn)(n, e));
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
function En() {
  this.innerHTML = "";
}
function An(t) {
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
  return arguments.length ? this.each(t == null ? En : (typeof t == "function" ? Cn : An)(t)) : this.node().innerHTML;
}
function Tn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Rn() {
  return this.each(Tn);
}
function Gn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mn() {
  return this.each(Gn);
}
function Fn(t) {
  var e = typeof t == "function" ? t : Xt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vn() {
  return null;
}
function Dn(t, e) {
  var n = typeof t == "function" ? t : Xt(t), r = e == null ? Vn : typeof e == "function" ? e : yt(e);
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
  selectAll: Ae,
  selectChild: Re,
  selectChildren: Ve,
  filter: De,
  data: Oe,
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
  lower: Mn,
  append: Fn,
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
var H = 0.7, j = 1 / H, R = "\\s*([+-]?\\d+)\\s*", P = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tr = /^#([0-9a-f]{3,8})$/, er = new RegExp(`^rgb\\(${R},${R},${R}\\)$`), nr = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), rr = new RegExp(`^rgba\\(${R},${R},${R},${P}\\)$`), ir = new RegExp(`^rgba\\(${x},${x},${x},${P}\\)$`), or = new RegExp(`^hsl\\(${P},${x},${x}\\)$`), sr = new RegExp(`^hsla\\(${P},${x},${x},${P}\\)$`), Et = {
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
  hex: At,
  // Deprecated! Use color.formatHex.
  formatHex: At,
  formatHex8: ar,
  formatHsl: cr,
  formatRgb: Ct,
  toString: Ct
});
function At() {
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
function X(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = tr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? $t(e) : n === 3 ? new _(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? z(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? z(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = er.exec(t)) ? new _(e[1], e[2], e[3], 1) : (e = nr.exec(t)) ? new _(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = rr.exec(t)) ? z(e[1], e[2], e[3], e[4]) : (e = ir.exec(t)) ? z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = or.exec(t)) ? Gt(e[1], e[2] / 100, e[3] / 100, 1) : (e = sr.exec(t)) ? Gt(e[1], e[2] / 100, e[3] / 100, e[4]) : Et.hasOwnProperty(t) ? $t(Et[t]) : t === "transparent" ? new _(NaN, NaN, NaN, 0) : null;
}
function $t(t) {
  return new _(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function z(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new _(t, e, n, r);
}
function lr(t) {
  return t instanceof Y || (t = X(t)), t ? (t = t.rgb(), new _(t.r, t.g, t.b, t.opacity)) : new _();
}
function ut(t, e, n, r) {
  return arguments.length === 1 ? lr(t) : new _(t, e, n, r ?? 1);
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
  return `#${A(this.r)}${A(this.g)}${A(this.b)}`;
}
function ur() {
  return `#${A(this.r)}${A(this.g)}${A(this.b)}${A((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
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
function A(t) {
  return t = C(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Gt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new w(t, e, n, r);
}
function te(t) {
  if (t instanceof w)
    return new w(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = X(t)), !t)
    return new w();
  if (t instanceof w)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, c = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= c < 0.5 ? o + i : 2 - o - i, s *= 60) : a = c > 0 && c < 1 ? 0 : s, new w(s, a, c, t.opacity);
}
function fr(t, e, n, r) {
  return arguments.length === 1 ? te(t) : new w(t, e, n, r ?? 1);
}
function w(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
mt(w, fr, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new w(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new w(this.h, this.s, this.l * t, this.opacity);
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
    return new w(Mt(this.h), U(this.s), U(this.l), tt(this.opacity));
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
const Ft = function t(e) {
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
var Vt = 180 / Math.PI, ht = {
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
    rotate: Math.atan2(e, t) * Vt,
    skewX: Math.atan(c) * Vt,
    scaleX: s,
    scaleY: a
  };
}
var K;
function mr(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ht : re(e.a, e.b, e.c, e.d, e.e, e.f);
}
function wr(t) {
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
      for (var p = -1, y = h.length, E; ++p < y; )
        f[(E = h[p]).i] = E.x(d);
      return f.join("");
    };
  };
}
var vr = ie(mr, "px, ", "px)", "deg)"), xr = ie(wr, ", ", ")", ")"), M = 0, D = 0, V = 0, oe = 1e3, et, I, nt = 0, $ = 0, ot = 0, O = typeof performance == "object" && performance.now ? performance : Date, se = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function wt() {
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
    n = (n == null ? wt() : +n) + (e == null ? 0 : +e), !this._next && I !== this && (I ? I._next = this : et = this, I = this), this._call = t, this._time = n, dt();
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
  wt(), ++M;
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
function kr() {
  var t = O.now(), e = t - nt;
  e > oe && (ot -= e, nt = t);
}
function Sr() {
  for (var t, e = et, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : et = n);
  I = t, dt(r);
}
function dt(t) {
  if (!M) {
    D && (D = clearTimeout(D));
    var e = t - $;
    e > 24 ? (t < 1 / 0 && (D = setTimeout(Dt, t - O.now() - ot)), V && (V = clearInterval(V))) : (V || (nt = O.now(), V = setInterval(kr, oe)), M = 1, se(Dt));
  }
}
function It(t, e, n) {
  var r = new rt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Er = Pt("start", "end", "cancel", "interrupt"), Ar = [], ce = 0, qt = 1, pt = 2, J = 3, Ht = 4, gt = 5, Q = 6;
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
    on: Er,
    tween: Ar,
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
function Gr(t, e, n) {
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
function Mr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = v(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Rr : Gr)(n, t, e));
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
  return (typeof e == "number" ? S : e instanceof X ? Ft : (n = X(e)) ? (e = n, Ft) : _r)(t, e);
}
function Fr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vr(t) {
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
function Pr(t, e) {
  var n = it(t), r = n === "transform" ? xr : le;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Hr : qr)(n, r, xt(this, "attr." + t, e)) : e == null ? (n.local ? Vr : Fr)(n) : (n.local ? Ir : Dr)(n, r, e));
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
  typeof t != "function" && (t = Ot(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var c = r[a], l = c.length, u, f = 0; f < l; ++f)
      if (u = c[f]) {
        for (var h = t.call(u, u.__data__, f, c), d, p = v(u, n), y = 0, E = h.length; y < E; ++y)
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
    var o = G(this, t), s = (this.style.removeProperty(t), G(this, t));
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
    var s = G(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function gi(t, e, n) {
  var r, i, o;
  return function() {
    var s = G(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), G(this, t))), s === c ? null : s === r && c === i ? o : (i = c, o = e(r = s, a));
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
function mi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function wi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && mi(t, s, n)), r;
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
  return this.tween(r, wi(t, e, n ?? ""));
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
function Ei(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Si(t));
}
function Ai() {
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
  transition: Ai,
  call: N.call,
  nodes: N.nodes,
  node: N.node,
  size: N.size,
  empty: N.empty,
  each: N.each,
  on: si,
  attr: Pr,
  attrTween: Br,
  style: _i,
  styleTween: vi,
  text: Ni,
  textTween: Ei,
  remove: ci,
  tween: Mr,
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
var Gi = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ri
};
function Mi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Fi(t) {
  var e, n;
  t instanceof k ? (e = t._id, t = t._name) : (e = fe(), (n = Gi).time = wt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, c, l = 0; l < a; ++l)
      (c = s[l]) && st(c, t, e, l, s, n || Mi(c, e));
  return new k(r, this._parents, t, e);
}
L.prototype.interrupt = Tr;
L.prototype.transition = Fi;
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
}, Vi = (t) => {
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
}, he = {
  "02-fitts": [Vi],
  "01-purpose": [Di],
  "03-hick": [Ii],
  "04-jakob": [qi],
  "07-goal-gradient": [Hi],
  "08-gestalt": [Pi],
  "09-law-of-proximity": [Xi],
  "10-law-of-similarity": [Oi],
  "11-law-of-common-region": [Li],
  "12-law-of-simplicity": [Yi]
}, de = /* @__PURE__ */ new Set();
for (const t of Object.values(he))
  for (const e of t)
    de.add(e);
const Bi = [...de];
class zi {
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
    const e = this.svgName ? he[this.svgName] : Bi;
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
const Ui = () => {
  Ki(), document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  ), document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 100%, 25%, 0.1)"
  );
}, Ki = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
Ui();
const Wi = new zi();
Wi.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9ncmFkaWVudC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL2dlc3RhbHQudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9wcm94aW1pdHkudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zaW1pbGFyaXR5LnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvY29tbW9uUmVnaW9uLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc2ltcGxpY2l0eS50cyIsIi4uLy4uLy4uL3NyYy9zdmdDb25maWcudHMiLCIuLi8uLi8uLi9zcmMvU1ZHVG9vbC50cyIsIi4uLy4uLy4uL3NyYy90aGVtZS50cyIsIi4uLy4uLy4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBub29wID0ge3ZhbHVlOiAoKSA9PiB7fX07XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGgsIF8gPSB7fSwgdDsgaSA8IG47ICsraSkge1xuICAgIGlmICghKHQgPSBhcmd1bWVudHNbaV0gKyBcIlwiKSB8fCAodCBpbiBfKSB8fCAvW1xccy5dLy50ZXN0KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHR5cGU6IFwiICsgdCk7XG4gICAgX1t0XSA9IFtdO1xuICB9XG4gIHJldHVybiBuZXcgRGlzcGF0Y2goXyk7XG59XG5cbmZ1bmN0aW9uIERpc3BhdGNoKF8pIHtcbiAgdGhpcy5fID0gXztcbn1cblxuZnVuY3Rpb24gcGFyc2VUeXBlbmFtZXModHlwZW5hbWVzLCB0eXBlcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgaWYgKHQgJiYgIXR5cGVzLmhhc093blByb3BlcnR5KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdCk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbkRpc3BhdGNoLnByb3RvdHlwZSA9IGRpc3BhdGNoLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IERpc3BhdGNoLFxuICBvbjogZnVuY3Rpb24odHlwZW5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF8gPSB0aGlzLl8sXG4gICAgICAgIFQgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIsIF8pLFxuICAgICAgICB0LFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSBULmxlbmd0aDtcblxuICAgIC8vIElmIG5vIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJldHVybiB0aGUgY2FsbGJhY2sgb2YgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgJiYgKHQgPSBnZXQoX1t0XSwgdHlwZW5hbWUubmFtZSkpKSByZXR1cm4gdDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHR5cGUgd2FzIHNwZWNpZmllZCwgc2V0IHRoZSBjYWxsYmFjayBmb3IgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgLy8gT3RoZXJ3aXNlLCBpZiBhIG51bGwgY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmVtb3ZlIGNhbGxiYWNrcyBvZiB0aGUgZ2l2ZW4gbmFtZS5cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBjYWxsYmFjazogXCIgKyBjYWxsYmFjayk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBjYWxsYmFjayk7XG4gICAgICBlbHNlIGlmIChjYWxsYmFjayA9PSBudWxsKSBmb3IgKHQgaW4gXykgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvcHkgPSB7fSwgXyA9IHRoaXMuXztcbiAgICBmb3IgKHZhciB0IGluIF8pIGNvcHlbdF0gPSBfW3RdLnNsaWNlKCk7XG4gICAgcmV0dXJuIG5ldyBEaXNwYXRjaChjb3B5KTtcbiAgfSxcbiAgY2FsbDogZnVuY3Rpb24odHlwZSwgdGhhdCkge1xuICAgIGlmICgobiA9IGFyZ3VtZW50cy5sZW5ndGggLSAyKSA+IDApIGZvciAodmFyIGFyZ3MgPSBuZXcgQXJyYXkobiksIGkgPSAwLCBuLCB0OyBpIDwgbjsgKytpKSBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHR5cGUsIHRoYXQsIGFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodmFyIHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldCh0eXBlLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGgsIGM7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoKGMgPSB0eXBlW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0KHR5cGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAodHlwZVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICB0eXBlW2ldID0gbm9vcCwgdHlwZSA9IHR5cGUuc2xpY2UoMCwgaSkuY29uY2F0KHR5cGUuc2xpY2UoaSArIDEpKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgdHlwZS5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogY2FsbGJhY2t9KTtcbiAgcmV0dXJuIHR5cGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BhdGNoO1xuIiwiZXhwb3J0IHZhciB4aHRtbCA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICB4aHRtbDogeGh0bWwsXG4gIHhsaW5rOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcbiAgeG1sOiBcImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVwiLFxuICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zL1wiXG59O1xuIiwiaW1wb3J0IG5hbWVzcGFjZXMgZnJvbSBcIi4vbmFtZXNwYWNlcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBwcmVmaXggPSBuYW1lICs9IFwiXCIsIGkgPSBwcmVmaXguaW5kZXhPZihcIjpcIik7XG4gIGlmIChpID49IDAgJiYgKHByZWZpeCA9IG5hbWUuc2xpY2UoMCwgaSkpICE9PSBcInhtbG5zXCIpIG5hbWUgPSBuYW1lLnNsaWNlKGkgKyAxKTtcbiAgcmV0dXJuIG5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkocHJlZml4KSA/IHtzcGFjZTogbmFtZXNwYWNlc1twcmVmaXhdLCBsb2NhbDogbmFtZX0gOiBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi9uYW1lc3BhY2UuanNcIjtcbmltcG9ydCB7eGh0bWx9IGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRvckluaGVyaXQobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50LFxuICAgICAgICB1cmkgPSB0aGlzLm5hbWVzcGFjZVVSSTtcbiAgICByZXR1cm4gdXJpID09PSB4aHRtbCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubmFtZXNwYWNlVVJJID09PSB4aHRtbFxuICAgICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSlcbiAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModXJpLCBuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRvckZpeGVkKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcbiAgcmV0dXJuIChmdWxsbmFtZS5sb2NhbFxuICAgICAgPyBjcmVhdG9yRml4ZWRcbiAgICAgIDogY3JlYXRvckluaGVyaXQpKGZ1bGxuYW1lKTtcbn1cbiIsImZ1bmN0aW9uIG5vbmUoKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPT0gbnVsbCA/IG5vbmUgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLi9zZWxlY3Rvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3Ioc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBzdWJub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChzdWJub2RlID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSkge1xuICAgICAgICBpZiAoXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICBzdWJncm91cFtpXSA9IHN1Ym5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsIi8vIEdpdmVuIHNvbWV0aGluZyBhcnJheSBsaWtlIChvciBudWxsKSwgcmV0dXJucyBzb21ldGhpbmcgdGhhdCBpcyBzdHJpY3RseSBhblxuLy8gYXJyYXkuIFRoaXMgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBhcnJheS1saWtlIG9iamVjdHMgcGFzc2VkIHRvIGQzLnNlbGVjdEFsbFxuLy8gb3Igc2VsZWN0aW9uLnNlbGVjdEFsbCBhcmUgY29udmVydGVkIGludG8gcHJvcGVyIGFycmF5cyB3aGVuIGNyZWF0aW5nIGFcbi8vIHNlbGVjdGlvbjsgd2UgZG9u4oCZdCBldmVyIHdhbnQgdG8gY3JlYXRlIGEgc2VsZWN0aW9uIGJhY2tlZCBieSBhIGxpdmVcbi8vIEhUTUxDb2xsZWN0aW9uIG9yIE5vZGVMaXN0LiBIb3dldmVyLCBub3RlIHRoYXQgc2VsZWN0aW9uLnNlbGVjdEFsbCB3aWxsIHVzZSBhXG4vLyBzdGF0aWMgTm9kZUxpc3QgYXMgYSBncm91cCwgc2luY2UgaXQgc2FmZWx5IGRlcml2ZWQgZnJvbSBxdWVyeVNlbGVjdG9yQWxsLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyYXkoeCkge1xuICByZXR1cm4geCA9PSBudWxsID8gW10gOiBBcnJheS5pc0FycmF5KHgpID8geCA6IEFycmF5LmZyb20oeCk7XG59XG4iLCJmdW5jdGlvbiBlbXB0eSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPT0gbnVsbCA/IGVtcHR5IDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBhcnJheSBmcm9tIFwiLi4vYXJyYXkuanNcIjtcbmltcG9ydCBzZWxlY3RvckFsbCBmcm9tIFwiLi4vc2VsZWN0b3JBbGwuanNcIjtcblxuZnVuY3Rpb24gYXJyYXlBbGwoc2VsZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYXJyYXkoc2VsZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3QgPT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gYXJyYXlBbGwoc2VsZWN0KTtcbiAgZWxzZSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHN1Ymdyb3Vwcy5wdXNoKHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSk7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHBhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRNYXRjaGVyKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIH07XG59XG5cbiIsImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmluZCA9IEFycmF5LnByb3RvdHlwZS5maW5kO1xuXG5mdW5jdGlvbiBjaGlsZEZpbmQobWF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaW5kLmNhbGwodGhpcy5jaGlsZHJlbiwgbWF0Y2gpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjaGlsZEZpcnN0KCkge1xuICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KG1hdGNoID09IG51bGwgPyBjaGlsZEZpcnN0XG4gICAgICA6IGNoaWxkRmluZCh0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwiaW1wb3J0IHtjaGlsZE1hdGNoZXJ9IGZyb20gXCIuLi9tYXRjaGVyLmpzXCI7XG5cbnZhciBmaWx0ZXIgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyO1xuXG5mdW5jdGlvbiBjaGlsZHJlbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5jaGlsZHJlbik7XG59XG5cbmZ1bmN0aW9uIGNoaWxkcmVuRmlsdGVyKG1hdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcy5jaGlsZHJlbiwgbWF0Y2gpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3RBbGwobWF0Y2ggPT0gbnVsbCA/IGNoaWxkcmVuXG4gICAgICA6IGNoaWxkcmVuRmlsdGVyKHR5cGVvZiBtYXRjaCA9PT0gXCJmdW5jdGlvblwiID8gbWF0Y2ggOiBjaGlsZE1hdGNoZXIobWF0Y2gpKSk7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBtYXRjaGVyIGZyb20gXCIuLi9tYXRjaGVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIGlmICh0eXBlb2YgbWF0Y2ggIT09IFwiZnVuY3Rpb25cIikgbWF0Y2ggPSBtYXRjaGVyKG1hdGNoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gW10sIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgbWF0Y2guY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXBkYXRlKSB7XG4gIHJldHVybiBuZXcgQXJyYXkodXBkYXRlLmxlbmd0aCk7XG59XG4iLCJpbXBvcnQgc3BhcnNlIGZyb20gXCIuL3NwYXJzZS5qc1wiO1xuaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9lbnRlciB8fCB0aGlzLl9ncm91cHMubWFwKHNwYXJzZSksIHRoaXMuX3BhcmVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRW50ZXJOb2RlKHBhcmVudCwgZGF0dW0pIHtcbiAgdGhpcy5vd25lckRvY3VtZW50ID0gcGFyZW50Lm93bmVyRG9jdW1lbnQ7XG4gIHRoaXMubmFtZXNwYWNlVVJJID0gcGFyZW50Lm5hbWVzcGFjZVVSSTtcbiAgdGhpcy5fbmV4dCA9IG51bGw7XG4gIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5fX2RhdGFfXyA9IGRhdHVtO1xufVxuXG5FbnRlck5vZGUucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogRW50ZXJOb2RlLFxuICBhcHBlbmRDaGlsZDogZnVuY3Rpb24oY2hpbGQpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIHRoaXMuX25leHQpOyB9LFxuICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uKGNoaWxkLCBuZXh0KSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBuZXh0KTsgfSxcbiAgcXVlcnlTZWxlY3RvcjogZnVuY3Rpb24oc2VsZWN0b3IpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTsgfSxcbiAgcXVlcnlTZWxlY3RvckFsbDogZnVuY3Rpb24oc2VsZWN0b3IpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTsgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge0VudGVyTm9kZX0gZnJvbSBcIi4vZW50ZXIuanNcIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gYmluZEluZGV4KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEpIHtcbiAgdmFyIGkgPSAwLFxuICAgICAgbm9kZSxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBmaXQgaW50byB1cGRhdGUuXG4gIC8vIFB1dCBhbnkgbnVsbCBub2RlcyBpbnRvIGVudGVyLlxuICAvLyBQdXQgYW55IHJlbWFpbmluZyBkYXRhIGludG8gZW50ZXIuXG4gIGZvciAoOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZG9u4oCZdCBmaXQgaW50byBleGl0LlxuICBmb3IgKDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYmluZEtleShwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhLCBrZXkpIHtcbiAgdmFyIGksXG4gICAgICBub2RlLFxuICAgICAgbm9kZUJ5S2V5VmFsdWUgPSBuZXcgTWFwLFxuICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGgsXG4gICAgICBrZXlWYWx1ZXMgPSBuZXcgQXJyYXkoZ3JvdXBMZW5ndGgpLFxuICAgICAga2V5VmFsdWU7XG5cbiAgLy8gQ29tcHV0ZSB0aGUga2V5IGZvciBlYWNoIG5vZGUuXG4gIC8vIElmIG11bHRpcGxlIG5vZGVzIGhhdmUgdGhlIHNhbWUga2V5LCB0aGUgZHVwbGljYXRlcyBhcmUgYWRkZWQgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBrZXlWYWx1ZXNbaV0gPSBrZXlWYWx1ZSA9IGtleS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSArIFwiXCI7XG4gICAgICBpZiAobm9kZUJ5S2V5VmFsdWUuaGFzKGtleVZhbHVlKSkge1xuICAgICAgICBleGl0W2ldID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVCeUtleVZhbHVlLnNldChrZXlWYWx1ZSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUga2V5IGZvciBlYWNoIGRhdHVtLlxuICAvLyBJZiB0aGVyZSBhIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMga2V5LCBqb2luIGFuZCBhZGQgaXQgdG8gdXBkYXRlLlxuICAvLyBJZiB0aGVyZSBpcyBub3QgKG9yIHRoZSBrZXkgaXMgYSBkdXBsaWNhdGUpLCBhZGQgaXQgdG8gZW50ZXIuXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhTGVuZ3RoOyArK2kpIHtcbiAgICBrZXlWYWx1ZSA9IGtleS5jYWxsKHBhcmVudCwgZGF0YVtpXSwgaSwgZGF0YSkgKyBcIlwiO1xuICAgIGlmIChub2RlID0gbm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlKSkge1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgbm9kZUJ5S2V5VmFsdWUuZGVsZXRlKGtleVZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIGFueSByZW1haW5pbmcgbm9kZXMgdGhhdCB3ZXJlIG5vdCBib3VuZCB0byBkYXRhIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWVzW2ldKSA9PT0gbm9kZSkpIHtcbiAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkYXR1bShub2RlKSB7XG4gIHJldHVybiBub2RlLl9fZGF0YV9fO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIEFycmF5LmZyb20odGhpcywgZGF0dW0pO1xuXG4gIHZhciBiaW5kID0ga2V5ID8gYmluZEtleSA6IGJpbmRJbmRleCxcbiAgICAgIHBhcmVudHMgPSB0aGlzLl9wYXJlbnRzLFxuICAgICAgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdmFsdWUgPSBjb25zdGFudCh2YWx1ZSk7XG5cbiAgZm9yICh2YXIgbSA9IGdyb3Vwcy5sZW5ndGgsIHVwZGF0ZSA9IG5ldyBBcnJheShtKSwgZW50ZXIgPSBuZXcgQXJyYXkobSksIGV4aXQgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgdmFyIHBhcmVudCA9IHBhcmVudHNbal0sXG4gICAgICAgIGdyb3VwID0gZ3JvdXBzW2pdLFxuICAgICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgICAgZGF0YSA9IGFycmF5bGlrZSh2YWx1ZS5jYWxsKHBhcmVudCwgcGFyZW50ICYmIHBhcmVudC5fX2RhdGFfXywgaiwgcGFyZW50cykpLFxuICAgICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGgsXG4gICAgICAgIGVudGVyR3JvdXAgPSBlbnRlcltqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgdXBkYXRlR3JvdXAgPSB1cGRhdGVbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIGV4aXRHcm91cCA9IGV4aXRbal0gPSBuZXcgQXJyYXkoZ3JvdXBMZW5ndGgpO1xuXG4gICAgYmluZChwYXJlbnQsIGdyb3VwLCBlbnRlckdyb3VwLCB1cGRhdGVHcm91cCwgZXhpdEdyb3VwLCBkYXRhLCBrZXkpO1xuXG4gICAgLy8gTm93IGNvbm5lY3QgdGhlIGVudGVyIG5vZGVzIHRvIHRoZWlyIGZvbGxvd2luZyB1cGRhdGUgbm9kZSwgc3VjaCB0aGF0XG4gICAgLy8gYXBwZW5kQ2hpbGQgY2FuIGluc2VydCB0aGUgbWF0ZXJpYWxpemVkIGVudGVyIG5vZGUgYmVmb3JlIHRoaXMgbm9kZSxcbiAgICAvLyByYXRoZXIgdGhhbiBhdCB0aGUgZW5kIG9mIHRoZSBwYXJlbnQgbm9kZS5cbiAgICBmb3IgKHZhciBpMCA9IDAsIGkxID0gMCwgcHJldmlvdXMsIG5leHQ7IGkwIDwgZGF0YUxlbmd0aDsgKytpMCkge1xuICAgICAgaWYgKHByZXZpb3VzID0gZW50ZXJHcm91cFtpMF0pIHtcbiAgICAgICAgaWYgKGkwID49IGkxKSBpMSA9IGkwICsgMTtcbiAgICAgICAgd2hpbGUgKCEobmV4dCA9IHVwZGF0ZUdyb3VwW2kxXSkgJiYgKytpMSA8IGRhdGFMZW5ndGgpO1xuICAgICAgICBwcmV2aW91cy5fbmV4dCA9IG5leHQgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGUgPSBuZXcgU2VsZWN0aW9uKHVwZGF0ZSwgcGFyZW50cyk7XG4gIHVwZGF0ZS5fZW50ZXIgPSBlbnRlcjtcbiAgdXBkYXRlLl9leGl0ID0gZXhpdDtcbiAgcmV0dXJuIHVwZGF0ZTtcbn1cblxuLy8gR2l2ZW4gc29tZSBkYXRhLCB0aGlzIHJldHVybnMgYW4gYXJyYXktbGlrZSB2aWV3IG9mIGl0OiBhbiBvYmplY3QgdGhhdFxuLy8gZXhwb3NlcyBhIGxlbmd0aCBwcm9wZXJ0eSBhbmQgYWxsb3dzIG51bWVyaWMgaW5kZXhpbmcuIE5vdGUgdGhhdCB1bmxpa2Vcbi8vIHNlbGVjdEFsbCwgdGhpcyBpc27igJl0IHdvcnJpZWQgYWJvdXQg4oCcbGl2ZeKAnSBjb2xsZWN0aW9ucyBiZWNhdXNlIHRoZSByZXN1bHRpbmdcbi8vIGFycmF5IHdpbGwgb25seSBiZSB1c2VkIGJyaWVmbHkgd2hpbGUgZGF0YSBpcyBiZWluZyBib3VuZC4gKEl0IGlzIHBvc3NpYmxlIHRvXG4vLyBjYXVzZSB0aGUgZGF0YSB0byBjaGFuZ2Ugd2hpbGUgaXRlcmF0aW5nIGJ5IHVzaW5nIGEga2V5IGZ1bmN0aW9uLCBidXQgcGxlYXNlXG4vLyBkb27igJl0OyB3ZeKAmWQgcmF0aGVyIGF2b2lkIGEgZ3JhdHVpdG91cyBjb3B5LilcbmZ1bmN0aW9uIGFycmF5bGlrZShkYXRhKSB7XG4gIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIGRhdGFcbiAgICA/IGRhdGEgLy8gQXJyYXksIFR5cGVkQXJyYXksIE5vZGVMaXN0LCBhcnJheS1saWtlXG4gICAgOiBBcnJheS5mcm9tKGRhdGEpOyAvLyBNYXAsIFNldCwgaXRlcmFibGUsIHN0cmluZywgb3IgYW55dGhpbmcgZWxzZVxufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZXhpdCB8fCB0aGlzLl9ncm91cHMubWFwKHNwYXJzZSksIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob25lbnRlciwgb251cGRhdGUsIG9uZXhpdCkge1xuICB2YXIgZW50ZXIgPSB0aGlzLmVudGVyKCksIHVwZGF0ZSA9IHRoaXMsIGV4aXQgPSB0aGlzLmV4aXQoKTtcbiAgaWYgKHR5cGVvZiBvbmVudGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBlbnRlciA9IG9uZW50ZXIoZW50ZXIpO1xuICAgIGlmIChlbnRlcikgZW50ZXIgPSBlbnRlci5zZWxlY3Rpb24oKTtcbiAgfSBlbHNlIHtcbiAgICBlbnRlciA9IGVudGVyLmFwcGVuZChvbmVudGVyICsgXCJcIik7XG4gIH1cbiAgaWYgKG9udXBkYXRlICE9IG51bGwpIHtcbiAgICB1cGRhdGUgPSBvbnVwZGF0ZSh1cGRhdGUpO1xuICAgIGlmICh1cGRhdGUpIHVwZGF0ZSA9IHVwZGF0ZS5zZWxlY3Rpb24oKTtcbiAgfVxuICBpZiAob25leGl0ID09IG51bGwpIGV4aXQucmVtb3ZlKCk7IGVsc2Ugb25leGl0KGV4aXQpO1xuICByZXR1cm4gZW50ZXIgJiYgdXBkYXRlID8gZW50ZXIubWVyZ2UodXBkYXRlKS5vcmRlcigpIDogdXBkYXRlO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgdmFyIHNlbGVjdGlvbiA9IGNvbnRleHQuc2VsZWN0aW9uID8gY29udGV4dC5zZWxlY3Rpb24oKSA6IGNvbnRleHQ7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHNlbGVjdGlvbi5fZ3JvdXBzLCBtMCA9IGdyb3VwczAubGVuZ3RoLCBtMSA9IGdyb3VwczEubGVuZ3RoLCBtID0gTWF0aC5taW4obTAsIG0xKSwgbWVyZ2VzID0gbmV3IEFycmF5KG0wKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cDAgPSBncm91cHMwW2pdLCBncm91cDEgPSBncm91cHMxW2pdLCBuID0gZ3JvdXAwLmxlbmd0aCwgbWVyZ2UgPSBtZXJnZXNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwMFtpXSB8fCBncm91cDFbaV0pIHtcbiAgICAgICAgbWVyZ2VbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBqIDwgbTA7ICsraikge1xuICAgIG1lcmdlc1tqXSA9IGdyb3VwczBbal07XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihtZXJnZXMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gLTEsIG0gPSBncm91cHMubGVuZ3RoOyArK2ogPCBtOykge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gZ3JvdXAubGVuZ3RoIC0gMSwgbmV4dCA9IGdyb3VwW2ldLCBub2RlOyAtLWkgPj0gMDspIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgaWYgKG5leHQgJiYgbm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihuZXh0KSBeIDQpIG5leHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgbmV4dCk7XG4gICAgICAgIG5leHQgPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbXBhcmUpIHtcbiAgaWYgKCFjb21wYXJlKSBjb21wYXJlID0gYXNjZW5kaW5nO1xuXG4gIGZ1bmN0aW9uIGNvbXBhcmVOb2RlKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gY29tcGFyZShhLl9fZGF0YV9fLCBiLl9fZGF0YV9fKSA6ICFhIC0gIWI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzb3J0Z3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzb3J0Z3JvdXAgPSBzb3J0Z3JvdXBzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzb3J0Z3JvdXBbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3J0Z3JvdXAuc29ydChjb21wYXJlTm9kZSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzb3J0Z3JvdXBzLCB0aGlzLl9wYXJlbnRzKS5vcmRlcigpO1xufVxuXG5mdW5jdGlvbiBhc2NlbmRpbmcoYSwgYikge1xuICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzBdO1xuICBhcmd1bWVudHNbMF0gPSB0aGlzO1xuICBjYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdGhpcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICB2YXIgbm9kZSA9IGdyb3VwW2ldO1xuICAgICAgaWYgKG5vZGUpIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGxldCBzaXplID0gMDtcbiAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMpICsrc2l6ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gc2l6ZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMubm9kZSgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgY2FsbGJhY2suY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuLi9uYW1lc3BhY2UuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBub2RlID0gdGhpcy5ub2RlKCk7XG4gICAgcmV0dXJuIGZ1bGxuYW1lLmxvY2FsXG4gICAgICAgID8gbm9kZS5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpXG4gICAgICAgIDogbm9kZS5nZXRBdHRyaWJ1dGUoZnVsbG5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbilcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKSkoZnVsbG5hbWUsIHZhbHVlKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gIHJldHVybiAobm9kZS5vd25lckRvY3VtZW50ICYmIG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldykgLy8gbm9kZSBpcyBhIE5vZGVcbiAgICAgIHx8IChub2RlLmRvY3VtZW50ICYmIG5vZGUpIC8vIG5vZGUgaXMgYSBXaW5kb3dcbiAgICAgIHx8IG5vZGUuZGVmYXVsdFZpZXc7IC8vIG5vZGUgaXMgYSBEb2N1bWVudFxufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3cuanNcIjtcblxuZnVuY3Rpb24gc3R5bGVSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVDb25zdGFudChuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVGdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2LCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcbiAgICAgID8gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgICA/IHN0eWxlUmVtb3ZlIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgID8gc3R5bGVGdW5jdGlvblxuICAgICAgICAgICAgOiBzdHlsZUNvbnN0YW50KShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkgPT0gbnVsbCA/IFwiXCIgOiBwcmlvcml0eSkpXG4gICAgICA6IHN0eWxlVmFsdWUodGhpcy5ub2RlKCksIG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVWYWx1ZShub2RlLCBuYW1lKSB7XG4gIHJldHVybiBub2RlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSlcbiAgICAgIHx8IGRlZmF1bHRWaWV3KG5vZGUpLmdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbn1cbiIsImZ1bmN0aW9uIHByb3BlcnR5UmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzW25hbWVdO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5RnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICBlbHNlIHRoaXNbbmFtZV0gPSB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcbiAgICAgID8gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBwcm9wZXJ0eVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBwcm9wZXJ0eUZ1bmN0aW9uXG4gICAgICAgICAgOiBwcm9wZXJ0eUNvbnN0YW50KShuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpW25hbWVdO1xufVxuIiwiZnVuY3Rpb24gY2xhc3NBcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50cmltKCkuc3BsaXQoL158XFxzKy8pO1xufVxuXG5mdW5jdGlvbiBjbGFzc0xpc3Qobm9kZSkge1xuICByZXR1cm4gbm9kZS5jbGFzc0xpc3QgfHwgbmV3IENsYXNzTGlzdChub2RlKTtcbn1cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KG5vZGUpIHtcbiAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gIHRoaXMuX25hbWVzID0gY2xhc3NBcnJheShub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpO1xufVxuXG5DbGFzc0xpc3QucHJvdG90eXBlID0ge1xuICBhZGQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICB0aGlzLl9uYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5fbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLl9uYW1lcy5qb2luKFwiIFwiKSk7XG4gICAgfVxuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgdGhpcy5fbmFtZXMuc3BsaWNlKGksIDEpO1xuICAgICAgdGhpcy5fbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLl9uYW1lcy5qb2luKFwiIFwiKSk7XG4gICAgfVxuICB9LFxuICBjb250YWluczogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpID49IDA7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNsYXNzZWRBZGQobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QuYWRkKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFJlbW92ZShub2RlLCBuYW1lcykge1xuICB2YXIgbGlzdCA9IGNsYXNzTGlzdChub2RlKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbGlzdC5yZW1vdmUobmFtZXNbaV0pO1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkVHJ1ZShuYW1lcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NlZEFkZCh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRGYWxzZShuYW1lcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NlZFJlbW92ZSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRGdW5jdGlvbihuYW1lcywgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICh2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpID8gY2xhc3NlZEFkZCA6IGNsYXNzZWRSZW1vdmUpKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIG5hbWVzID0gY2xhc3NBcnJheShuYW1lICsgXCJcIik7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIGxpc3QgPSBjbGFzc0xpc3QodGhpcy5ub2RlKCkpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIGlmICghbGlzdC5jb250YWlucyhuYW1lc1tpXSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGNsYXNzZWRGdW5jdGlvbiA6IHZhbHVlXG4gICAgICA/IGNsYXNzZWRUcnVlXG4gICAgICA6IGNsYXNzZWRGYWxzZSkobmFtZXMsIHZhbHVlKSk7XG59XG4iLCJmdW5jdGlvbiB0ZXh0UmVtb3ZlKCkge1xuICB0aGlzLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2ID09IG51bGwgPyBcIlwiIDogdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IHRleHRSZW1vdmUgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHRleHRGdW5jdGlvblxuICAgICAgICAgIDogdGV4dENvbnN0YW50KSh2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpLnRleHRDb250ZW50O1xufVxuIiwiZnVuY3Rpb24gaHRtbFJlbW92ZSgpIHtcbiAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBodG1sQ29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGh0bWxGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBodG1sUmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBodG1sRnVuY3Rpb25cbiAgICAgICAgICA6IGh0bWxDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS5pbm5lckhUTUw7XG59XG4iLCJmdW5jdGlvbiByYWlzZSgpIHtcbiAgaWYgKHRoaXMubmV4dFNpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gocmFpc2UpO1xufVxuIiwiZnVuY3Rpb24gbG93ZXIoKSB7XG4gIGlmICh0aGlzLnByZXZpb3VzU2libGluZykgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLCB0aGlzLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGxvd2VyKTtcbn1cbiIsImltcG9ydCBjcmVhdG9yIGZyb20gXCIuLi9jcmVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGNyZWF0ZSA9IHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogY3JlYXRvcihuYW1lKTtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZENoaWxkKGNyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLi9zZWxlY3Rvci5qc1wiO1xuXG5mdW5jdGlvbiBjb25zdGFudE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCBiZWZvcmUpIHtcbiAgdmFyIGNyZWF0ZSA9IHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogY3JlYXRvcihuYW1lKSxcbiAgICAgIHNlbGVjdCA9IGJlZm9yZSA9PSBudWxsID8gY29uc3RhbnROdWxsIDogdHlwZW9mIGJlZm9yZSA9PT0gXCJmdW5jdGlvblwiID8gYmVmb3JlIDogc2VsZWN0b3IoYmVmb3JlKTtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluc2VydEJlZm9yZShjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgc2VsZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgbnVsbCk7XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlKCkge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJlbW92ZSk7XG59XG4iLCJmdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZShmYWxzZSksIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRoaXMubmV4dFNpYmxpbmcpIDogY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbl9jbG9uZURlZXAoKSB7XG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKHRydWUpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWVwKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChkZWVwID8gc2VsZWN0aW9uX2Nsb25lRGVlcCA6IHNlbGVjdGlvbl9jbG9uZVNoYWxsb3cpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5wcm9wZXJ0eShcIl9fZGF0YV9fXCIsIHZhbHVlKVxuICAgICAgOiB0aGlzLm5vZGUoKS5fX2RhdGFfXztcbn1cbiIsImZ1bmN0aW9uIGNvbnRleHRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LCB0aGlzLl9fZGF0YV9fKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUeXBlbmFtZXModHlwZW5hbWVzKSB7XG4gIHJldHVybiB0eXBlbmFtZXMudHJpbSgpLnNwbGl0KC9efFxccysvKS5tYXAoZnVuY3Rpb24odCkge1xuICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgbmFtZSA9IHQuc2xpY2UoaSArIDEpLCB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25SZW1vdmUodHlwZW5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbjtcbiAgICBpZiAoIW9uKSByZXR1cm47XG4gICAgZm9yICh2YXIgaiA9IDAsIGkgPSAtMSwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgaWYgKG8gPSBvbltqXSwgKCF0eXBlbmFtZS50eXBlIHx8IG8udHlwZSA9PT0gdHlwZW5hbWUudHlwZSkgJiYgby5uYW1lID09PSB0eXBlbmFtZS5uYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIsIG8ub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvblsrK2ldID0gbztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCsraSkgb24ubGVuZ3RoID0gaTtcbiAgICBlbHNlIGRlbGV0ZSB0aGlzLl9fb247XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uQWRkKHR5cGVuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uLCBvLCBsaXN0ZW5lciA9IGNvbnRleHRMaXN0ZW5lcih2YWx1ZSk7XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgICAgaWYgKChvID0gb25bal0pLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUgJiYgby5uYW1lID09PSB0eXBlbmFtZS5uYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIsIG8ub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIgPSBsaXN0ZW5lciwgby5vcHRpb25zID0gb3B0aW9ucyk7XG4gICAgICAgIG8udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodHlwZW5hbWUudHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIG8gPSB7dHlwZTogdHlwZW5hbWUudHlwZSwgbmFtZTogdHlwZW5hbWUubmFtZSwgdmFsdWU6IHZhbHVlLCBsaXN0ZW5lcjogbGlzdGVuZXIsIG9wdGlvbnM6IG9wdGlvbnN9O1xuICAgIGlmICghb24pIHRoaXMuX19vbiA9IFtvXTtcbiAgICBlbHNlIG9uLnB1c2gobyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHR5cGVuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdHlwZW5hbWVzID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiKSwgaSwgbiA9IHR5cGVuYW1lcy5sZW5ndGgsIHQ7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG9uID0gdGhpcy5ub2RlKCkuX19vbjtcbiAgICBpZiAob24pIGZvciAodmFyIGogPSAwLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBmb3IgKGkgPSAwLCBvID0gb25bal07IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKCh0ID0gdHlwZW5hbWVzW2ldKS50eXBlID09PSBvLnR5cGUgJiYgdC5uYW1lID09PSBvLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gby52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBvbiA9IHZhbHVlID8gb25BZGQgOiBvblJlbW92ZTtcbiAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgdGhpcy5lYWNoKG9uKHR5cGVuYW1lc1tpXSwgdmFsdWUsIG9wdGlvbnMpKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KG5vZGUsIHR5cGUsIHBhcmFtcykge1xuICB2YXIgd2luZG93ID0gZGVmYXVsdFZpZXcobm9kZSksXG4gICAgICBldmVudCA9IHdpbmRvdy5DdXN0b21FdmVudDtcblxuICBpZiAodHlwZW9mIGV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudCA9IG5ldyBldmVudCh0eXBlLCBwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgaWYgKHBhcmFtcykgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSksIGV2ZW50LmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gICAgZWxzZSBldmVudC5pbml0RXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoQ29uc3RhbnQodHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEZ1bmN0aW9uKHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHBhcmFtcyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGRpc3BhdGNoRnVuY3Rpb25cbiAgICAgIDogZGlzcGF0Y2hDb25zdGFudCkodHlwZSwgcGFyYW1zKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiooKSB7XG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB5aWVsZCBub2RlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0Q2hpbGQgZnJvbSBcIi4vc2VsZWN0Q2hpbGQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0Q2hpbGRyZW4gZnJvbSBcIi4vc2VsZWN0Q2hpbGRyZW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXRhIGZyb20gXCIuL2RhdGEuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW50ZXIgZnJvbSBcIi4vZW50ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZXhpdCBmcm9tIFwiLi9leGl0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2pvaW4gZnJvbSBcIi4vam9pbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9vcmRlciBmcm9tIFwiLi9vcmRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zb3J0IGZyb20gXCIuL3NvcnQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2FsbCBmcm9tIFwiLi9jYWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGVzIGZyb20gXCIuL25vZGVzLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGUgZnJvbSBcIi4vbm9kZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zaXplIGZyb20gXCIuL3NpemUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW1wdHkgZnJvbSBcIi4vZW1wdHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZWFjaCBmcm9tIFwiLi9lYWNoLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2F0dHIgZnJvbSBcIi4vYXR0ci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9wcm9wZXJ0eSBmcm9tIFwiLi9wcm9wZXJ0eS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbGFzc2VkIGZyb20gXCIuL2NsYXNzZWQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2h0bWwgZnJvbSBcIi4vaHRtbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9yYWlzZSBmcm9tIFwiLi9yYWlzZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9sb3dlciBmcm9tIFwiLi9sb3dlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hcHBlbmQgZnJvbSBcIi4vYXBwZW5kLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2luc2VydCBmcm9tIFwiLi9pbnNlcnQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbG9uZSBmcm9tIFwiLi9jbG9uZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXR1bSBmcm9tIFwiLi9kYXR1bS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kaXNwYXRjaCBmcm9tIFwiLi9kaXNwYXRjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pdGVyYXRvciBmcm9tIFwiLi9pdGVyYXRvci5qc1wiO1xuXG5leHBvcnQgdmFyIHJvb3QgPSBbbnVsbF07XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3Rpb24oZ3JvdXBzLCBwYXJlbnRzKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdXSwgcm9vdCk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbl9zZWxlY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzO1xufVxuXG5TZWxlY3Rpb24ucHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFNlbGVjdGlvbixcbiAgc2VsZWN0OiBzZWxlY3Rpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHNlbGVjdGlvbl9zZWxlY3RBbGwsXG4gIHNlbGVjdENoaWxkOiBzZWxlY3Rpb25fc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fc2VsZWN0Q2hpbGRyZW4sXG4gIGZpbHRlcjogc2VsZWN0aW9uX2ZpbHRlcixcbiAgZGF0YTogc2VsZWN0aW9uX2RhdGEsXG4gIGVudGVyOiBzZWxlY3Rpb25fZW50ZXIsXG4gIGV4aXQ6IHNlbGVjdGlvbl9leGl0LFxuICBqb2luOiBzZWxlY3Rpb25fam9pbixcbiAgbWVyZ2U6IHNlbGVjdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiBzZWxlY3Rpb25fc2VsZWN0aW9uLFxuICBvcmRlcjogc2VsZWN0aW9uX29yZGVyLFxuICBzb3J0OiBzZWxlY3Rpb25fc29ydCxcbiAgY2FsbDogc2VsZWN0aW9uX2NhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fbm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX2VhY2gsXG4gIGF0dHI6IHNlbGVjdGlvbl9hdHRyLFxuICBzdHlsZTogc2VsZWN0aW9uX3N0eWxlLFxuICBwcm9wZXJ0eTogc2VsZWN0aW9uX3Byb3BlcnR5LFxuICBjbGFzc2VkOiBzZWxlY3Rpb25fY2xhc3NlZCxcbiAgdGV4dDogc2VsZWN0aW9uX3RleHQsXG4gIGh0bWw6IHNlbGVjdGlvbl9odG1sLFxuICByYWlzZTogc2VsZWN0aW9uX3JhaXNlLFxuICBsb3dlcjogc2VsZWN0aW9uX2xvd2VyLFxuICBhcHBlbmQ6IHNlbGVjdGlvbl9hcHBlbmQsXG4gIGluc2VydDogc2VsZWN0aW9uX2luc2VydCxcbiAgcmVtb3ZlOiBzZWxlY3Rpb25fcmVtb3ZlLFxuICBjbG9uZTogc2VsZWN0aW9uX2Nsb25lLFxuICBkYXR1bTogc2VsZWN0aW9uX2RhdHVtLFxuICBvbjogc2VsZWN0aW9uX29uLFxuICBkaXNwYXRjaDogc2VsZWN0aW9uX2Rpc3BhdGNoLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX2l0ZXJhdG9yXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZWxlY3Rpb247XG4iLCJpbXBvcnQge1NlbGVjdGlvbiwgcm9vdH0gZnJvbSBcIi4vc2VsZWN0aW9uL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXV0sIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdKVxuICAgICAgOiBuZXcgU2VsZWN0aW9uKFtbc2VsZWN0b3JdXSwgcm9vdCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25zdHJ1Y3RvciwgZmFjdG9yeSwgcHJvdG90eXBlKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGZhY3RvcnkucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZpbml0aW9uKSBwcm90b3R5cGVba2V5XSA9IGRlZmluaXRpb25ba2V5XTtcbiAgcmV0dXJuIHByb3RvdHlwZTtcbn1cbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3IoKSB7fVxuXG5leHBvcnQgdmFyIGRhcmtlciA9IDAuNztcbmV4cG9ydCB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG52YXIgcmVJID0gXCJcXFxccyooWystXT9cXFxcZCspXFxcXHMqXCIsXG4gICAgcmVOID0gXCJcXFxccyooWystXT8oPzpcXFxcZCpcXFxcLik/XFxcXGQrKD86W2VFXVsrLV0/XFxcXGQrKT8pXFxcXHMqXCIsXG4gICAgcmVQID0gXCJcXFxccyooWystXT8oPzpcXFxcZCpcXFxcLik/XFxcXGQrKD86W2VFXVsrLV0/XFxcXGQrKT8pJVxcXFxzKlwiLFxuICAgIHJlSGV4ID0gL14jKFswLTlhLWZdezMsOH0pJC8sXG4gICAgcmVSZ2JJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZUl9LCR7cmVJfSwke3JlSX1cXFxcKSRgKSxcbiAgICByZVJnYlBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiXFxcXCgke3JlUH0sJHtyZVB9LCR7cmVQfVxcXFwpJGApLFxuICAgIHJlUmdiYUludGVnZXIgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZUl9LCR7cmVJfSwke3JlSX0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVSZ2JhUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5yZ2JhXFxcXCgke3JlUH0sJHtyZVB9LCR7cmVQfSwke3JlTn1cXFxcKSRgKSxcbiAgICByZUhzbFBlcmNlbnQgPSBuZXcgUmVnRXhwKGBeaHNsXFxcXCgke3JlTn0sJHtyZVB9LCR7cmVQfVxcXFwpJGApLFxuICAgIHJlSHNsYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBeaHNsYVxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCk7XG5cbnZhciBuYW1lZCA9IHtcbiAgYWxpY2VibHVlOiAweGYwZjhmZixcbiAgYW50aXF1ZXdoaXRlOiAweGZhZWJkNyxcbiAgYXF1YTogMHgwMGZmZmYsXG4gIGFxdWFtYXJpbmU6IDB4N2ZmZmQ0LFxuICBhenVyZTogMHhmMGZmZmYsXG4gIGJlaWdlOiAweGY1ZjVkYyxcbiAgYmlzcXVlOiAweGZmZTRjNCxcbiAgYmxhY2s6IDB4MDAwMDAwLFxuICBibGFuY2hlZGFsbW9uZDogMHhmZmViY2QsXG4gIGJsdWU6IDB4MDAwMGZmLFxuICBibHVldmlvbGV0OiAweDhhMmJlMixcbiAgYnJvd246IDB4YTUyYTJhLFxuICBidXJseXdvb2Q6IDB4ZGViODg3LFxuICBjYWRldGJsdWU6IDB4NWY5ZWEwLFxuICBjaGFydHJldXNlOiAweDdmZmYwMCxcbiAgY2hvY29sYXRlOiAweGQyNjkxZSxcbiAgY29yYWw6IDB4ZmY3ZjUwLFxuICBjb3JuZmxvd2VyYmx1ZTogMHg2NDk1ZWQsXG4gIGNvcm5zaWxrOiAweGZmZjhkYyxcbiAgY3JpbXNvbjogMHhkYzE0M2MsXG4gIGN5YW46IDB4MDBmZmZmLFxuICBkYXJrYmx1ZTogMHgwMDAwOGIsXG4gIGRhcmtjeWFuOiAweDAwOGI4YixcbiAgZGFya2dvbGRlbnJvZDogMHhiODg2MGIsXG4gIGRhcmtncmF5OiAweGE5YTlhOSxcbiAgZGFya2dyZWVuOiAweDAwNjQwMCxcbiAgZGFya2dyZXk6IDB4YTlhOWE5LFxuICBkYXJra2hha2k6IDB4YmRiNzZiLFxuICBkYXJrbWFnZW50YTogMHg4YjAwOGIsXG4gIGRhcmtvbGl2ZWdyZWVuOiAweDU1NmIyZixcbiAgZGFya29yYW5nZTogMHhmZjhjMDAsXG4gIGRhcmtvcmNoaWQ6IDB4OTkzMmNjLFxuICBkYXJrcmVkOiAweDhiMDAwMCxcbiAgZGFya3NhbG1vbjogMHhlOTk2N2EsXG4gIGRhcmtzZWFncmVlbjogMHg4ZmJjOGYsXG4gIGRhcmtzbGF0ZWJsdWU6IDB4NDgzZDhiLFxuICBkYXJrc2xhdGVncmF5OiAweDJmNGY0ZixcbiAgZGFya3NsYXRlZ3JleTogMHgyZjRmNGYsXG4gIGRhcmt0dXJxdW9pc2U6IDB4MDBjZWQxLFxuICBkYXJrdmlvbGV0OiAweDk0MDBkMyxcbiAgZGVlcHBpbms6IDB4ZmYxNDkzLFxuICBkZWVwc2t5Ymx1ZTogMHgwMGJmZmYsXG4gIGRpbWdyYXk6IDB4Njk2OTY5LFxuICBkaW1ncmV5OiAweDY5Njk2OSxcbiAgZG9kZ2VyYmx1ZTogMHgxZTkwZmYsXG4gIGZpcmVicmljazogMHhiMjIyMjIsXG4gIGZsb3JhbHdoaXRlOiAweGZmZmFmMCxcbiAgZm9yZXN0Z3JlZW46IDB4MjI4YjIyLFxuICBmdWNoc2lhOiAweGZmMDBmZixcbiAgZ2FpbnNib3JvOiAweGRjZGNkYyxcbiAgZ2hvc3R3aGl0ZTogMHhmOGY4ZmYsXG4gIGdvbGQ6IDB4ZmZkNzAwLFxuICBnb2xkZW5yb2Q6IDB4ZGFhNTIwLFxuICBncmF5OiAweDgwODA4MCxcbiAgZ3JlZW46IDB4MDA4MDAwLFxuICBncmVlbnllbGxvdzogMHhhZGZmMmYsXG4gIGdyZXk6IDB4ODA4MDgwLFxuICBob25leWRldzogMHhmMGZmZjAsXG4gIGhvdHBpbms6IDB4ZmY2OWI0LFxuICBpbmRpYW5yZWQ6IDB4Y2Q1YzVjLFxuICBpbmRpZ286IDB4NGIwMDgyLFxuICBpdm9yeTogMHhmZmZmZjAsXG4gIGtoYWtpOiAweGYwZTY4YyxcbiAgbGF2ZW5kZXI6IDB4ZTZlNmZhLFxuICBsYXZlbmRlcmJsdXNoOiAweGZmZjBmNSxcbiAgbGF3bmdyZWVuOiAweDdjZmMwMCxcbiAgbGVtb25jaGlmZm9uOiAweGZmZmFjZCxcbiAgbGlnaHRibHVlOiAweGFkZDhlNixcbiAgbGlnaHRjb3JhbDogMHhmMDgwODAsXG4gIGxpZ2h0Y3lhbjogMHhlMGZmZmYsXG4gIGxpZ2h0Z29sZGVucm9keWVsbG93OiAweGZhZmFkMixcbiAgbGlnaHRncmF5OiAweGQzZDNkMyxcbiAgbGlnaHRncmVlbjogMHg5MGVlOTAsXG4gIGxpZ2h0Z3JleTogMHhkM2QzZDMsXG4gIGxpZ2h0cGluazogMHhmZmI2YzEsXG4gIGxpZ2h0c2FsbW9uOiAweGZmYTA3YSxcbiAgbGlnaHRzZWFncmVlbjogMHgyMGIyYWEsXG4gIGxpZ2h0c2t5Ymx1ZTogMHg4N2NlZmEsXG4gIGxpZ2h0c2xhdGVncmF5OiAweDc3ODg5OSxcbiAgbGlnaHRzbGF0ZWdyZXk6IDB4Nzc4ODk5LFxuICBsaWdodHN0ZWVsYmx1ZTogMHhiMGM0ZGUsXG4gIGxpZ2h0eWVsbG93OiAweGZmZmZlMCxcbiAgbGltZTogMHgwMGZmMDAsXG4gIGxpbWVncmVlbjogMHgzMmNkMzIsXG4gIGxpbmVuOiAweGZhZjBlNixcbiAgbWFnZW50YTogMHhmZjAwZmYsXG4gIG1hcm9vbjogMHg4MDAwMDAsXG4gIG1lZGl1bWFxdWFtYXJpbmU6IDB4NjZjZGFhLFxuICBtZWRpdW1ibHVlOiAweDAwMDBjZCxcbiAgbWVkaXVtb3JjaGlkOiAweGJhNTVkMyxcbiAgbWVkaXVtcHVycGxlOiAweDkzNzBkYixcbiAgbWVkaXVtc2VhZ3JlZW46IDB4M2NiMzcxLFxuICBtZWRpdW1zbGF0ZWJsdWU6IDB4N2I2OGVlLFxuICBtZWRpdW1zcHJpbmdncmVlbjogMHgwMGZhOWEsXG4gIG1lZGl1bXR1cnF1b2lzZTogMHg0OGQxY2MsXG4gIG1lZGl1bXZpb2xldHJlZDogMHhjNzE1ODUsXG4gIG1pZG5pZ2h0Ymx1ZTogMHgxOTE5NzAsXG4gIG1pbnRjcmVhbTogMHhmNWZmZmEsXG4gIG1pc3R5cm9zZTogMHhmZmU0ZTEsXG4gIG1vY2Nhc2luOiAweGZmZTRiNSxcbiAgbmF2YWpvd2hpdGU6IDB4ZmZkZWFkLFxuICBuYXZ5OiAweDAwMDA4MCxcbiAgb2xkbGFjZTogMHhmZGY1ZTYsXG4gIG9saXZlOiAweDgwODAwMCxcbiAgb2xpdmVkcmFiOiAweDZiOGUyMyxcbiAgb3JhbmdlOiAweGZmYTUwMCxcbiAgb3JhbmdlcmVkOiAweGZmNDUwMCxcbiAgb3JjaGlkOiAweGRhNzBkNixcbiAgcGFsZWdvbGRlbnJvZDogMHhlZWU4YWEsXG4gIHBhbGVncmVlbjogMHg5OGZiOTgsXG4gIHBhbGV0dXJxdW9pc2U6IDB4YWZlZWVlLFxuICBwYWxldmlvbGV0cmVkOiAweGRiNzA5MyxcbiAgcGFwYXlhd2hpcDogMHhmZmVmZDUsXG4gIHBlYWNocHVmZjogMHhmZmRhYjksXG4gIHBlcnU6IDB4Y2Q4NTNmLFxuICBwaW5rOiAweGZmYzBjYixcbiAgcGx1bTogMHhkZGEwZGQsXG4gIHBvd2RlcmJsdWU6IDB4YjBlMGU2LFxuICBwdXJwbGU6IDB4ODAwMDgwLFxuICByZWJlY2NhcHVycGxlOiAweDY2MzM5OSxcbiAgcmVkOiAweGZmMDAwMCxcbiAgcm9zeWJyb3duOiAweGJjOGY4ZixcbiAgcm95YWxibHVlOiAweDQxNjllMSxcbiAgc2FkZGxlYnJvd246IDB4OGI0NTEzLFxuICBzYWxtb246IDB4ZmE4MDcyLFxuICBzYW5keWJyb3duOiAweGY0YTQ2MCxcbiAgc2VhZ3JlZW46IDB4MmU4YjU3LFxuICBzZWFzaGVsbDogMHhmZmY1ZWUsXG4gIHNpZW5uYTogMHhhMDUyMmQsXG4gIHNpbHZlcjogMHhjMGMwYzAsXG4gIHNreWJsdWU6IDB4ODdjZWViLFxuICBzbGF0ZWJsdWU6IDB4NmE1YWNkLFxuICBzbGF0ZWdyYXk6IDB4NzA4MDkwLFxuICBzbGF0ZWdyZXk6IDB4NzA4MDkwLFxuICBzbm93OiAweGZmZmFmYSxcbiAgc3ByaW5nZ3JlZW46IDB4MDBmZjdmLFxuICBzdGVlbGJsdWU6IDB4NDY4MmI0LFxuICB0YW46IDB4ZDJiNDhjLFxuICB0ZWFsOiAweDAwODA4MCxcbiAgdGhpc3RsZTogMHhkOGJmZDgsXG4gIHRvbWF0bzogMHhmZjYzNDcsXG4gIHR1cnF1b2lzZTogMHg0MGUwZDAsXG4gIHZpb2xldDogMHhlZTgyZWUsXG4gIHdoZWF0OiAweGY1ZGViMyxcbiAgd2hpdGU6IDB4ZmZmZmZmLFxuICB3aGl0ZXNtb2tlOiAweGY1ZjVmNSxcbiAgeWVsbG93OiAweGZmZmYwMCxcbiAgeWVsbG93Z3JlZW46IDB4OWFjZDMyXG59O1xuXG5kZWZpbmUoQ29sb3IsIGNvbG9yLCB7XG4gIGNvcHkoY2hhbm5lbHMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgdGhpcy5jb25zdHJ1Y3RvciwgdGhpcywgY2hhbm5lbHMpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKS5kaXNwbGF5YWJsZSgpO1xuICB9LFxuICBoZXg6IGNvbG9yX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiBjb2xvcl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhleDg6IGNvbG9yX2Zvcm1hdEhleDgsXG4gIGZvcm1hdEhzbDogY29sb3JfZm9ybWF0SHNsLFxuICBmb3JtYXRSZ2I6IGNvbG9yX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IGNvbG9yX2Zvcm1hdFJnYlxufSk7XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleDgoKTtcbn1cblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SHNsKCkge1xuICByZXR1cm4gaHNsQ29udmVydCh0aGlzKS5mb3JtYXRIc2woKTtcbn1cblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0UmdiKCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRSZ2IoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3IoZm9ybWF0KSB7XG4gIHZhciBtLCBsO1xuICBmb3JtYXQgPSAoZm9ybWF0ICsgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAobSA9IHJlSGV4LmV4ZWMoZm9ybWF0KSkgPyAobCA9IG1bMV0ubGVuZ3RoLCBtID0gcGFyc2VJbnQobVsxXSwgMTYpLCBsID09PSA2ID8gcmdibihtKSAvLyAjZmYwMDAwXG4gICAgICA6IGwgPT09IDMgPyBuZXcgUmdiKChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgobSAmIDB4ZikgPDwgNCkgfCAobSAmIDB4ZiksIDEpIC8vICNmMDBcbiAgICAgIDogbCA9PT0gOCA/IHJnYmEobSA+PiAyNCAmIDB4ZmYsIG0gPj4gMTYgJiAweGZmLCBtID4+IDggJiAweGZmLCAobSAmIDB4ZmYpIC8gMHhmZikgLy8gI2ZmMDAwMDAwXG4gICAgICA6IGwgPT09IDQgPyByZ2JhKChtID4+IDEyICYgMHhmKSB8IChtID4+IDggJiAweGYwKSwgKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKCgobSAmIDB4ZikgPDwgNCkgfCAobSAmIDB4ZikpIC8gMHhmZikgLy8gI2YwMDBcbiAgICAgIDogbnVsbCkgLy8gaW52YWxpZCBoZXhcbiAgICAgIDogKG0gPSByZVJnYkludGVnZXIuZXhlYyhmb3JtYXQpKSA/IG5ldyBSZ2IobVsxXSwgbVsyXSwgbVszXSwgMSkgLy8gcmdiKDI1NSwgMCwgMClcbiAgICAgIDogKG0gPSByZVJnYlBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IG5ldyBSZ2IobVsxXSAqIDI1NSAvIDEwMCwgbVsyXSAqIDI1NSAvIDEwMCwgbVszXSAqIDI1NSAvIDEwMCwgMSkgLy8gcmdiKDEwMCUsIDAlLCAwJSlcbiAgICAgIDogKG0gPSByZVJnYmFJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0sIG1bMl0sIG1bM10sIG1bNF0pIC8vIHJnYmEoMjU1LCAwLCAwLCAxKVxuICAgICAgOiAobSA9IHJlUmdiYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSAqIDI1NSAvIDEwMCwgbVsyXSAqIDI1NSAvIDEwMCwgbVszXSAqIDI1NSAvIDEwMCwgbVs0XSkgLy8gcmdiKDEwMCUsIDAlLCAwJSwgMSlcbiAgICAgIDogKG0gPSByZUhzbFBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgMSkgLy8gaHNsKDEyMCwgNTAlLCA1MCUpXG4gICAgICA6IChtID0gcmVIc2xhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCBtWzRdKSAvLyBoc2xhKDEyMCwgNTAlLCA1MCUsIDEpXG4gICAgICA6IG5hbWVkLmhhc093blByb3BlcnR5KGZvcm1hdCkgPyByZ2JuKG5hbWVkW2Zvcm1hdF0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICA6IGZvcm1hdCA9PT0gXCJ0cmFuc3BhcmVudFwiID8gbmV3IFJnYihOYU4sIE5hTiwgTmFOLCAwKVxuICAgICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZ2JuKG4pIHtcbiAgcmV0dXJuIG5ldyBSZ2IobiA+PiAxNiAmIDB4ZmYsIG4gPj4gOCAmIDB4ZmYsIG4gJiAweGZmLCAxKTtcbn1cblxuZnVuY3Rpb24gcmdiYShyLCBnLCBiLCBhKSB7XG4gIGlmIChhIDw9IDApIHIgPSBnID0gYiA9IE5hTjtcbiAgcmV0dXJuIG5ldyBSZ2IociwgZywgYiwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2JDb252ZXJ0KG8pIHtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIENvbG9yKSkgbyA9IGNvbG9yKG8pO1xuICBpZiAoIW8pIHJldHVybiBuZXcgUmdiO1xuICBvID0gby5yZ2IoKTtcbiAgcmV0dXJuIG5ldyBSZ2Ioby5yLCBvLmcsIG8uYiwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gcmdiQ29udmVydChyKSA6IG5ldyBSZ2IociwgZywgYiwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgdGhpcy5yID0gK3I7XG4gIHRoaXMuZyA9ICtnO1xuICB0aGlzLmIgPSArYjtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShSZ2IsIHJnYiwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2IoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNsYW1wKCkge1xuICAgIHJldHVybiBuZXcgUmdiKGNsYW1waSh0aGlzLnIpLCBjbGFtcGkodGhpcy5nKSwgY2xhbXBpKHRoaXMuYiksIGNsYW1wYSh0aGlzLm9wYWNpdHkpKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuICgtMC41IDw9IHRoaXMuciAmJiB0aGlzLnIgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5nICYmIHRoaXMuZyA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmIgJiYgdGhpcy5iIDwgMjU1LjUpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGhleDogcmdiX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiByZ2JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiByZ2JfZm9ybWF0SGV4OCxcbiAgZm9ybWF0UmdiOiByZ2JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogcmdiX2Zvcm1hdFJnYlxufSkpO1xuXG5mdW5jdGlvbiByZ2JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gYCMke2hleCh0aGlzLnIpfSR7aGV4KHRoaXMuZyl9JHtoZXgodGhpcy5iKX1gO1xufVxuXG5mdW5jdGlvbiByZ2JfZm9ybWF0SGV4OCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9JHtoZXgoKGlzTmFOKHRoaXMub3BhY2l0eSkgPyAxIDogdGhpcy5vcGFjaXR5KSAqIDI1NSl9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdFJnYigpIHtcbiAgY29uc3QgYSA9IGNsYW1wYSh0aGlzLm9wYWNpdHkpO1xuICByZXR1cm4gYCR7YSA9PT0gMSA/IFwicmdiKFwiIDogXCJyZ2JhKFwifSR7Y2xhbXBpKHRoaXMucil9LCAke2NsYW1waSh0aGlzLmcpfSwgJHtjbGFtcGkodGhpcy5iKX0ke2EgPT09IDEgPyBcIilcIiA6IGAsICR7YX0pYH1gO1xufVxuXG5mdW5jdGlvbiBjbGFtcGEob3BhY2l0eSkge1xuICByZXR1cm4gaXNOYU4ob3BhY2l0eSkgPyAxIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgb3BhY2l0eSkpO1xufVxuXG5mdW5jdGlvbiBjbGFtcGkodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh2YWx1ZSkgfHwgMCkpO1xufVxuXG5mdW5jdGlvbiBoZXgodmFsdWUpIHtcbiAgdmFsdWUgPSBjbGFtcGkodmFsdWUpO1xuICByZXR1cm4gKHZhbHVlIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgdmFsdWUudG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiBoc2xhKGgsIHMsIGwsIGEpIHtcbiAgaWYgKGEgPD0gMCkgaCA9IHMgPSBsID0gTmFOO1xuICBlbHNlIGlmIChsIDw9IDAgfHwgbCA+PSAxKSBoID0gcyA9IE5hTjtcbiAgZWxzZSBpZiAocyA8PSAwKSBoID0gTmFOO1xuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbENvbnZlcnQobykge1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG5ldyBIc2woby5oLCBvLnMsIG8ubCwgby5vcGFjaXR5KTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIENvbG9yKSkgbyA9IGNvbG9yKG8pO1xuICBpZiAoIW8pIHJldHVybiBuZXcgSHNsO1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG87XG4gIG8gPSBvLnJnYigpO1xuICB2YXIgciA9IG8uciAvIDI1NSxcbiAgICAgIGcgPSBvLmcgLyAyNTUsXG4gICAgICBiID0gby5iIC8gMjU1LFxuICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIGggPSBOYU4sXG4gICAgICBzID0gbWF4IC0gbWluLFxuICAgICAgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgaWYgKHMpIHtcbiAgICBpZiAociA9PT0gbWF4KSBoID0gKGcgLSBiKSAvIHMgKyAoZyA8IGIpICogNjtcbiAgICBlbHNlIGlmIChnID09PSBtYXgpIGggPSAoYiAtIHIpIC8gcyArIDI7XG4gICAgZWxzZSBoID0gKHIgLSBnKSAvIHMgKyA0O1xuICAgIHMgLz0gbCA8IDAuNSA/IG1heCArIG1pbiA6IDIgLSBtYXggLSBtaW47XG4gICAgaCAqPSA2MDtcbiAgfSBlbHNlIHtcbiAgICBzID0gbCA+IDAgJiYgbCA8IDEgPyAwIDogaDtcbiAgfVxuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoc2xDb252ZXJ0KGgpIDogbmV3IEhzbChoLCBzLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmZ1bmN0aW9uIEhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHRoaXMuaCA9ICtoO1xuICB0aGlzLnMgPSArcztcbiAgdGhpcy5sID0gK2w7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoSHNsLCBoc2wsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2IoKSB7XG4gICAgdmFyIGggPSB0aGlzLmggJSAzNjAgKyAodGhpcy5oIDwgMCkgKiAzNjAsXG4gICAgICAgIHMgPSBpc05hTihoKSB8fCBpc05hTih0aGlzLnMpID8gMCA6IHRoaXMucyxcbiAgICAgICAgbCA9IHRoaXMubCxcbiAgICAgICAgbTIgPSBsICsgKGwgPCAwLjUgPyBsIDogMSAtIGwpICogcyxcbiAgICAgICAgbTEgPSAyICogbCAtIG0yO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgaHNsMnJnYihoID49IDI0MCA/IGggLSAyNDAgOiBoICsgMTIwLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoIDwgMTIwID8gaCArIDI0MCA6IGggLSAxMjAsIG0xLCBtMiksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IEhzbChjbGFtcGgodGhpcy5oKSwgY2xhbXB0KHRoaXMucyksIGNsYW1wdCh0aGlzLmwpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoMCA8PSB0aGlzLnMgJiYgdGhpcy5zIDw9IDEgfHwgaXNOYU4odGhpcy5zKSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5sICYmIHRoaXMubCA8PSAxKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBmb3JtYXRIc2woKSB7XG4gICAgY29uc3QgYSA9IGNsYW1wYSh0aGlzLm9wYWNpdHkpO1xuICAgIHJldHVybiBgJHthID09PSAxID8gXCJoc2woXCIgOiBcImhzbGEoXCJ9JHtjbGFtcGgodGhpcy5oKX0sICR7Y2xhbXB0KHRoaXMucykgKiAxMDB9JSwgJHtjbGFtcHQodGhpcy5sKSAqIDEwMH0lJHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbiAgfVxufSkpO1xuXG5mdW5jdGlvbiBjbGFtcGgodmFsdWUpIHtcbiAgdmFsdWUgPSAodmFsdWUgfHwgMCkgJSAzNjA7XG4gIHJldHVybiB2YWx1ZSA8IDAgPyB2YWx1ZSArIDM2MCA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjbGFtcHQodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHZhbHVlIHx8IDApKTtcbn1cblxuLyogRnJvbSBGdkQgMTMuMzcsIENTUyBDb2xvciBNb2R1bGUgTGV2ZWwgMyAqL1xuZnVuY3Rpb24gaHNsMnJnYihoLCBtMSwgbTIpIHtcbiAgcmV0dXJuIChoIDwgNjAgPyBtMSArIChtMiAtIG0xKSAqIGggLyA2MFxuICAgICAgOiBoIDwgMTgwID8gbTJcbiAgICAgIDogaCA8IDI0MCA/IG0xICsgKG0yIC0gbTEpICogKDI0MCAtIGgpIC8gNjBcbiAgICAgIDogbTEpICogMjU1O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgeCA9PiAoKSA9PiB4O1xuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGxpbmVhcihhLCBkKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGEgKyB0ICogZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZXhwb25lbnRpYWwoYSwgYiwgeSkge1xuICByZXR1cm4gYSA9IE1hdGgucG93KGEsIHkpLCBiID0gTWF0aC5wb3coYiwgeSkgLSBhLCB5ID0gMSAvIHksIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coYSArIHQgKiBiLCB5KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh1ZShhLCBiKSB7XG4gIHZhciBkID0gYiAtIGE7XG4gIHJldHVybiBkID8gbGluZWFyKGEsIGQgPiAxODAgfHwgZCA8IC0xODAgPyBkIC0gMzYwICogTWF0aC5yb3VuZChkIC8gMzYwKSA6IGQpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1tYSh5KSB7XG4gIHJldHVybiAoeSA9ICt5KSA9PT0gMSA/IG5vZ2FtbWEgOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGIgLSBhID8gZXhwb25lbnRpYWwoYSwgYiwgeSkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9nYW1tYShhLCBiKSB7XG4gIHZhciBkID0gYiAtIGE7XG4gIHJldHVybiBkID8gbGluZWFyKGEsIGQpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG59XG4iLCJpbXBvcnQge3JnYiBhcyBjb2xvclJnYn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgYmFzaXMgZnJvbSBcIi4vYmFzaXMuanNcIjtcbmltcG9ydCBiYXNpc0Nsb3NlZCBmcm9tIFwiLi9iYXNpc0Nsb3NlZC5qc1wiO1xuaW1wb3J0IG5vZ2FtbWEsIHtnYW1tYX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIHJnYkdhbW1hKHkpIHtcbiAgdmFyIGNvbG9yID0gZ2FtbWEoeSk7XG5cbiAgZnVuY3Rpb24gcmdiKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgciA9IGNvbG9yKChzdGFydCA9IGNvbG9yUmdiKHN0YXJ0KSkuciwgKGVuZCA9IGNvbG9yUmdiKGVuZCkpLnIpLFxuICAgICAgICBnID0gY29sb3Ioc3RhcnQuZywgZW5kLmcpLFxuICAgICAgICBiID0gY29sb3Ioc3RhcnQuYiwgZW5kLmIpLFxuICAgICAgICBvcGFjaXR5ID0gbm9nYW1tYShzdGFydC5vcGFjaXR5LCBlbmQub3BhY2l0eSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHN0YXJ0LnIgPSByKHQpO1xuICAgICAgc3RhcnQuZyA9IGcodCk7XG4gICAgICBzdGFydC5iID0gYih0KTtcbiAgICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICB9O1xuICB9XG5cbiAgcmdiLmdhbW1hID0gcmdiR2FtbWE7XG5cbiAgcmV0dXJuIHJnYjtcbn0pKDEpO1xuXG5mdW5jdGlvbiByZ2JTcGxpbmUoc3BsaW5lKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xvcnMpIHtcbiAgICB2YXIgbiA9IGNvbG9ycy5sZW5ndGgsXG4gICAgICAgIHIgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGcgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGIgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGksIGNvbG9yO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbG9yID0gY29sb3JSZ2IoY29sb3JzW2ldKTtcbiAgICAgIHJbaV0gPSBjb2xvci5yIHx8IDA7XG4gICAgICBnW2ldID0gY29sb3IuZyB8fCAwO1xuICAgICAgYltpXSA9IGNvbG9yLmIgfHwgMDtcbiAgICB9XG4gICAgciA9IHNwbGluZShyKTtcbiAgICBnID0gc3BsaW5lKGcpO1xuICAgIGIgPSBzcGxpbmUoYik7XG4gICAgY29sb3Iub3BhY2l0eSA9IDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIGNvbG9yLnIgPSByKHQpO1xuICAgICAgY29sb3IuZyA9IGcodCk7XG4gICAgICBjb2xvci5iID0gYih0KTtcbiAgICAgIHJldHVybiBjb2xvciArIFwiXCI7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciByZ2JCYXNpcyA9IHJnYlNwbGluZShiYXNpcyk7XG5leHBvcnQgdmFyIHJnYkJhc2lzQ2xvc2VkID0gcmdiU3BsaW5lKGJhc2lzQ2xvc2VkKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGEgPSArYSwgYiA9ICtiLCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGEgKiAoMSAtIHQpICsgYiAqIHQ7XG4gIH07XG59XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG52YXIgcmVBID0gL1stK10/KD86XFxkK1xcLj9cXGQqfFxcLj9cXGQrKSg/OltlRV1bLStdP1xcZCspPy9nLFxuICAgIHJlQiA9IG5ldyBSZWdFeHAocmVBLnNvdXJjZSwgXCJnXCIpO1xuXG5mdW5jdGlvbiB6ZXJvKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBiO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbmUoYikge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBiKHQpICsgXCJcIjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgYmkgPSByZUEubGFzdEluZGV4ID0gcmVCLmxhc3RJbmRleCA9IDAsIC8vIHNjYW4gaW5kZXggZm9yIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGFtLCAvLyBjdXJyZW50IG1hdGNoIGluIGFcbiAgICAgIGJtLCAvLyBjdXJyZW50IG1hdGNoIGluIGJcbiAgICAgIGJzLCAvLyBzdHJpbmcgcHJlY2VkaW5nIGN1cnJlbnQgbnVtYmVyIGluIGIsIGlmIGFueVxuICAgICAgaSA9IC0xLCAvLyBpbmRleCBpbiBzXG4gICAgICBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuXG4gIC8vIENvZXJjZSBpbnB1dHMgdG8gc3RyaW5ncy5cbiAgYSA9IGEgKyBcIlwiLCBiID0gYiArIFwiXCI7XG5cbiAgLy8gSW50ZXJwb2xhdGUgcGFpcnMgb2YgbnVtYmVycyBpbiBhICYgYi5cbiAgd2hpbGUgKChhbSA9IHJlQS5leGVjKGEpKVxuICAgICAgJiYgKGJtID0gcmVCLmV4ZWMoYikpKSB7XG4gICAgaWYgKChicyA9IGJtLmluZGV4KSA+IGJpKSB7IC8vIGEgc3RyaW5nIHByZWNlZGVzIHRoZSBuZXh0IG51bWJlciBpbiBiXG4gICAgICBicyA9IGIuc2xpY2UoYmksIGJzKTtcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBicztcbiAgICB9XG4gICAgaWYgKChhbSA9IGFtWzBdKSA9PT0gKGJtID0gYm1bMF0pKSB7IC8vIG51bWJlcnMgaW4gYSAmIGIgbWF0Y2hcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJtOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBibTtcbiAgICB9IGVsc2UgeyAvLyBpbnRlcnBvbGF0ZSBub24tbWF0Y2hpbmcgbnVtYmVyc1xuICAgICAgc1srK2ldID0gbnVsbDtcbiAgICAgIHEucHVzaCh7aTogaSwgeDogbnVtYmVyKGFtLCBibSl9KTtcbiAgICB9XG4gICAgYmkgPSByZUIubGFzdEluZGV4O1xuICB9XG5cbiAgLy8gQWRkIHJlbWFpbnMgb2YgYi5cbiAgaWYgKGJpIDwgYi5sZW5ndGgpIHtcbiAgICBicyA9IGIuc2xpY2UoYmkpO1xuICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gIH1cblxuICAvLyBTcGVjaWFsIG9wdGltaXphdGlvbiBmb3Igb25seSBhIHNpbmdsZSBtYXRjaC5cbiAgLy8gT3RoZXJ3aXNlLCBpbnRlcnBvbGF0ZSBlYWNoIG9mIHRoZSBudW1iZXJzIGFuZCByZWpvaW4gdGhlIHN0cmluZy5cbiAgcmV0dXJuIHMubGVuZ3RoIDwgMiA/IChxWzBdXG4gICAgICA/IG9uZShxWzBdLngpXG4gICAgICA6IHplcm8oYikpXG4gICAgICA6IChiID0gcS5sZW5ndGgsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbzsgaSA8IGI7ICsraSkgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgICAgIH0pO1xufVxuIiwidmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0ge1xuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICByb3RhdGU6IDAsXG4gIHNrZXdYOiAwLFxuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgc2NhbGVYLCBzY2FsZVksIHNrZXdYO1xuICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gIGlmIChza2V3WCA9IGEgKiBjICsgYiAqIGQpIGMgLT0gYSAqIHNrZXdYLCBkIC09IGIgKiBza2V3WDtcbiAgaWYgKHNjYWxlWSA9IE1hdGguc3FydChjICogYyArIGQgKiBkKSkgYyAvPSBzY2FsZVksIGQgLz0gc2NhbGVZLCBza2V3WCAvPSBzY2FsZVk7XG4gIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlWDogZSxcbiAgICB0cmFuc2xhdGVZOiBmLFxuICAgIHJvdGF0ZTogTWF0aC5hdGFuMihiLCBhKSAqIGRlZ3JlZXMsXG4gICAgc2tld1g6IE1hdGguYXRhbihza2V3WCkgKiBkZWdyZWVzLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZS5qc1wiO1xuXG52YXIgc3ZnTm9kZTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNzcyh2YWx1ZSkge1xuICBjb25zdCBtID0gbmV3ICh0eXBlb2YgRE9NTWF0cml4ID09PSBcImZ1bmN0aW9uXCIgPyBET01NYXRyaXggOiBXZWJLaXRDU1NNYXRyaXgpKHZhbHVlICsgXCJcIik7XG4gIHJldHVybiBtLmlzSWRlbnRpdHkgPyBpZGVudGl0eSA6IGRlY29tcG9zZShtLmEsIG0uYiwgbS5jLCBtLmQsIG0uZSwgbS5mKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3ZnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIGlmICghc3ZnTm9kZSkgc3ZnTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgc3ZnTm9kZS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWUpO1xuICBpZiAoISh2YWx1ZSA9IHN2Z05vZGUudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKSkpIHJldHVybiBpZGVudGl0eTtcbiAgdmFsdWUgPSB2YWx1ZS5tYXRyaXg7XG4gIHJldHVybiBkZWNvbXBvc2UodmFsdWUuYSwgdmFsdWUuYiwgdmFsdWUuYywgdmFsdWUuZCwgdmFsdWUuZSwgdmFsdWUuZik7XG59XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gXCIuLi9udW1iZXIuanNcIjtcbmltcG9ydCB7cGFyc2VDc3MsIHBhcnNlU3ZnfSBmcm9tIFwiLi9wYXJzZS5qc1wiO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZSwgcHhDb21tYSwgcHhQYXJlbiwgZGVnUGFyZW4pIHtcblxuICBmdW5jdGlvbiBwb3Aocykge1xuICAgIHJldHVybiBzLmxlbmd0aCA/IHMucG9wKCkgKyBcIiBcIiA6IFwiXCI7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2goXCJ0cmFuc2xhdGUoXCIsIG51bGwsIHB4Q29tbWEsIG51bGwsIHB4UGFyZW4pO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiB8fCB5Yikge1xuICAgICAgcy5wdXNoKFwidHJhbnNsYXRlKFwiICsgeGIgKyBweENvbW1hICsgeWIgKyBweFBhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByb3RhdGUoYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBpZiAoYSAtIGIgPiAxODApIGIgKz0gMzYwOyBlbHNlIGlmIChiIC0gYSA+IDE4MCkgYSArPSAzNjA7IC8vIHNob3J0ZXN0IHBhdGhcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2tld1goYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiLCBudWxsLCBcIixcIiwgbnVsbCwgXCIpXCIpO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiAhPT0gMSB8fCB5YiAhPT0gMSkge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIgKyB4YiArIFwiLFwiICsgeWIgKyBcIilcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuICAgIGEgPSBwYXJzZShhKSwgYiA9IHBhcnNlKGIpO1xuICAgIHRyYW5zbGF0ZShhLnRyYW5zbGF0ZVgsIGEudHJhbnNsYXRlWSwgYi50cmFuc2xhdGVYLCBiLnRyYW5zbGF0ZVksIHMsIHEpO1xuICAgIHJvdGF0ZShhLnJvdGF0ZSwgYi5yb3RhdGUsIHMsIHEpO1xuICAgIHNrZXdYKGEuc2tld1gsIGIuc2tld1gsIHMsIHEpO1xuICAgIHNjYWxlKGEuc2NhbGVYLCBhLnNjYWxlWSwgYi5zY2FsZVgsIGIuc2NhbGVZLCBzLCBxKTtcbiAgICBhID0gYiA9IG51bGw7IC8vIGdjXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBpID0gLTEsIG4gPSBxLmxlbmd0aCwgbztcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZUNzcywgXCJweCwgXCIsIFwicHgpXCIsIFwiZGVnKVwiKTtcbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZVN2ZywgXCIsIFwiLCBcIilcIiwgXCIpXCIpO1xuIiwidmFyIGZyYW1lID0gMCwgLy8gaXMgYW4gYW5pbWF0aW9uIGZyYW1lIHBlbmRpbmc/XG4gICAgdGltZW91dCA9IDAsIC8vIGlzIGEgdGltZW91dCBwZW5kaW5nP1xuICAgIGludGVydmFsID0gMCwgLy8gYXJlIGFueSB0aW1lcnMgYWN0aXZlP1xuICAgIHBva2VEZWxheSA9IDEwMDAsIC8vIGhvdyBmcmVxdWVudGx5IHdlIGNoZWNrIGZvciBjbG9jayBza2V3XG4gICAgdGFza0hlYWQsXG4gICAgdGFza1RhaWwsXG4gICAgY2xvY2tMYXN0ID0gMCxcbiAgICBjbG9ja05vdyA9IDAsXG4gICAgY2xvY2tTa2V3ID0gMCxcbiAgICBjbG9jayA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJvYmplY3RcIiAmJiBwZXJmb3JtYW5jZS5ub3cgPyBwZXJmb3JtYW5jZSA6IERhdGUsXG4gICAgc2V0RnJhbWUgPSB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSA6IGZ1bmN0aW9uKGYpIHsgc2V0VGltZW91dChmLCAxNyk7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBjbG9ja05vdyB8fCAoc2V0RnJhbWUoY2xlYXJOb3cpLCBjbG9ja05vdyA9IGNsb2NrLm5vdygpICsgY2xvY2tTa2V3KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJOb3coKSB7XG4gIGNsb2NrTm93ID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICB0aGlzLl9jYWxsID1cbiAgdGhpcy5fdGltZSA9XG4gIHRoaXMuX25leHQgPSBudWxsO1xufVxuXG5UaW1lci5wcm90b3R5cGUgPSB0aW1lci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUaW1lcixcbiAgcmVzdGFydDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgdGltZSA9ICh0aW1lID09IG51bGwgPyBub3coKSA6ICt0aW1lKSArIChkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheSk7XG4gICAgaWYgKCF0aGlzLl9uZXh0ICYmIHRhc2tUYWlsICE9PSB0aGlzKSB7XG4gICAgICBpZiAodGFza1RhaWwpIHRhc2tUYWlsLl9uZXh0ID0gdGhpcztcbiAgICAgIGVsc2UgdGFza0hlYWQgPSB0aGlzO1xuICAgICAgdGFza1RhaWwgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgc2xlZXAoKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbGwpIHtcbiAgICAgIHRoaXMuX2NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5fdGltZSA9IEluZmluaXR5O1xuICAgICAgc2xlZXAoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIHQucmVzdGFydChjYWxsYmFjaywgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyRmx1c2goKSB7XG4gIG5vdygpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZSwgaWYgbm90IGFscmVhZHkgc2V0LlxuICArK2ZyYW1lOyAvLyBQcmV0ZW5kIHdl4oCZdmUgc2V0IGFuIGFsYXJtLCBpZiB3ZSBoYXZlbuKAmXQgYWxyZWFkeS5cbiAgdmFyIHQgPSB0YXNrSGVhZCwgZTtcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAoKGUgPSBjbG9ja05vdyAtIHQuX3RpbWUpID49IDApIHQuX2NhbGwuY2FsbCh1bmRlZmluZWQsIGUpO1xuICAgIHQgPSB0Ll9uZXh0O1xuICB9XG4gIC0tZnJhbWU7XG59XG5cbmZ1bmN0aW9uIHdha2UoKSB7XG4gIGNsb2NrTm93ID0gKGNsb2NrTGFzdCA9IGNsb2NrLm5vdygpKSArIGNsb2NrU2tldztcbiAgZnJhbWUgPSB0aW1lb3V0ID0gMDtcbiAgdHJ5IHtcbiAgICB0aW1lckZsdXNoKCk7XG4gIH0gZmluYWxseSB7XG4gICAgZnJhbWUgPSAwO1xuICAgIG5hcCgpO1xuICAgIGNsb2NrTm93ID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb2tlKCkge1xuICB2YXIgbm93ID0gY2xvY2subm93KCksIGRlbGF5ID0gbm93IC0gY2xvY2tMYXN0O1xuICBpZiAoZGVsYXkgPiBwb2tlRGVsYXkpIGNsb2NrU2tldyAtPSBkZWxheSwgY2xvY2tMYXN0ID0gbm93O1xufVxuXG5mdW5jdGlvbiBuYXAoKSB7XG4gIHZhciB0MCwgdDEgPSB0YXNrSGVhZCwgdDIsIHRpbWUgPSBJbmZpbml0eTtcbiAgd2hpbGUgKHQxKSB7XG4gICAgaWYgKHQxLl9jYWxsKSB7XG4gICAgICBpZiAodGltZSA+IHQxLl90aW1lKSB0aW1lID0gdDEuX3RpbWU7XG4gICAgICB0MCA9IHQxLCB0MSA9IHQxLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0MiA9IHQxLl9uZXh0LCB0MS5fbmV4dCA9IG51bGw7XG4gICAgICB0MSA9IHQwID8gdDAuX25leHQgPSB0MiA6IHRhc2tIZWFkID0gdDI7XG4gICAgfVxuICB9XG4gIHRhc2tUYWlsID0gdDA7XG4gIHNsZWVwKHRpbWUpO1xufVxuXG5mdW5jdGlvbiBzbGVlcCh0aW1lKSB7XG4gIGlmIChmcmFtZSkgcmV0dXJuOyAvLyBTb29uZXN0IGFsYXJtIGFscmVhZHkgc2V0LCBvciB3aWxsIGJlLlxuICBpZiAodGltZW91dCkgdGltZW91dCA9IGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgdmFyIGRlbGF5ID0gdGltZSAtIGNsb2NrTm93OyAvLyBTdHJpY3RseSBsZXNzIHRoYW4gaWYgd2UgcmVjb21wdXRlZCBjbG9ja05vdy5cbiAgaWYgKGRlbGF5ID4gMjQpIHtcbiAgICBpZiAodGltZSA8IEluZmluaXR5KSB0aW1lb3V0ID0gc2V0VGltZW91dCh3YWtlLCB0aW1lIC0gY2xvY2subm93KCkgLSBjbG9ja1NrZXcpO1xuICAgIGlmIChpbnRlcnZhbCkgaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWludGVydmFsKSBjbG9ja0xhc3QgPSBjbG9jay5ub3coKSwgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChwb2tlLCBwb2tlRGVsYXkpO1xuICAgIGZyYW1lID0gMSwgc2V0RnJhbWUod2FrZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7VGltZXJ9IGZyb20gXCIuL3RpbWVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgZGVsYXkgPSBkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheTtcbiAgdC5yZXN0YXJ0KGVsYXBzZWQgPT4ge1xuICAgIHQuc3RvcCgpO1xuICAgIGNhbGxiYWNrKGVsYXBzZWQgKyBkZWxheSk7XG4gIH0sIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG4iLCJpbXBvcnQge2Rpc3BhdGNofSBmcm9tIFwiZDMtZGlzcGF0Y2hcIjtcbmltcG9ydCB7dGltZXIsIHRpbWVvdXR9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZW1wdHlPbiA9IGRpc3BhdGNoKFwic3RhcnRcIiwgXCJlbmRcIiwgXCJjYW5jZWxcIiwgXCJpbnRlcnJ1cHRcIik7XG52YXIgZW1wdHlUd2VlbiA9IFtdO1xuXG5leHBvcnQgdmFyIENSRUFURUQgPSAwO1xuZXhwb3J0IHZhciBTQ0hFRFVMRUQgPSAxO1xuZXhwb3J0IHZhciBTVEFSVElORyA9IDI7XG5leHBvcnQgdmFyIFNUQVJURUQgPSAzO1xuZXhwb3J0IHZhciBSVU5OSU5HID0gNDtcbmV4cG9ydCB2YXIgRU5ESU5HID0gNTtcbmV4cG9ydCB2YXIgRU5ERUQgPSA2O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lLCBpZCwgaW5kZXgsIGdyb3VwLCB0aW1pbmcpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlcykgbm9kZS5fX3RyYW5zaXRpb24gPSB7fTtcbiAgZWxzZSBpZiAoaWQgaW4gc2NoZWR1bGVzKSByZXR1cm47XG4gIGNyZWF0ZShub2RlLCBpZCwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgaW5kZXg6IGluZGV4LCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgZ3JvdXA6IGdyb3VwLCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgb246IGVtcHR5T24sXG4gICAgdHdlZW46IGVtcHR5VHdlZW4sXG4gICAgdGltZTogdGltaW5nLnRpbWUsXG4gICAgZGVsYXk6IHRpbWluZy5kZWxheSxcbiAgICBkdXJhdGlvbjogdGltaW5nLmR1cmF0aW9uLFxuICAgIGVhc2U6IHRpbWluZy5lYXNlLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIHN0YXRlOiBDUkVBVEVEXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBDUkVBVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBzY2hlZHVsZWRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBTVEFSVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBydW5uaW5nXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGUgfHwgIShzY2hlZHVsZSA9IHNjaGVkdWxlW2lkXSkpIHRocm93IG5ldyBFcnJvcihcInRyYW5zaXRpb24gbm90IGZvdW5kXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShub2RlLCBpZCwgc2VsZikge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb24sXG4gICAgICB0d2VlbjtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzZWxmIHRpbWVyIHdoZW4gdGhlIHRyYW5zaXRpb24gaXMgY3JlYXRlZC5cbiAgLy8gTm90ZSB0aGUgYWN0dWFsIGRlbGF5IGlzIG5vdCBrbm93biB1bnRpbCB0aGUgZmlyc3QgY2FsbGJhY2shXG4gIHNjaGVkdWxlc1tpZF0gPSBzZWxmO1xuICBzZWxmLnRpbWVyID0gdGltZXIoc2NoZWR1bGUsIDAsIHNlbGYudGltZSk7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUoZWxhcHNlZCkge1xuICAgIHNlbGYuc3RhdGUgPSBTQ0hFRFVMRUQ7XG4gICAgc2VsZi50aW1lci5yZXN0YXJ0KHN0YXJ0LCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuXG4gICAgLy8gSWYgdGhlIGVsYXBzZWQgZGVsYXkgaXMgbGVzcyB0aGFuIG91ciBmaXJzdCBzbGVlcCwgc3RhcnQgaW1tZWRpYXRlbHkuXG4gICAgaWYgKHNlbGYuZGVsYXkgPD0gZWxhcHNlZCkgc3RhcnQoZWxhcHNlZCAtIHNlbGYuZGVsYXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoZWxhcHNlZCkge1xuICAgIHZhciBpLCBqLCBuLCBvO1xuXG4gICAgLy8gSWYgdGhlIHN0YXRlIGlzIG5vdCBTQ0hFRFVMRUQsIHRoZW4gd2UgcHJldmlvdXNseSBlcnJvcmVkIG9uIHN0YXJ0LlxuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTQ0hFRFVMRUQpIHJldHVybiBzdG9wKCk7XG5cbiAgICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgICBvID0gc2NoZWR1bGVzW2ldO1xuICAgICAgaWYgKG8ubmFtZSAhPT0gc2VsZi5uYW1lKSBjb250aW51ZTtcblxuICAgICAgLy8gV2hpbGUgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgc3RhcnRpbmcgdHJhbnNpdGlvbiBkdXJpbmcgdGhpcyBmcmFtZSxcbiAgICAgIC8vIGRlZmVyIHN0YXJ0aW5nIGFuIGludGVycnVwdGluZyB0cmFuc2l0aW9uIHVudGlsIHRoYXQgdHJhbnNpdGlvbiBoYXMgYVxuICAgICAgLy8gY2hhbmNlIHRvIHRpY2sgKGFuZCBwb3NzaWJseSBlbmQpOyBzZWUgZDMvZDMtdHJhbnNpdGlvbiM1NCFcbiAgICAgIGlmIChvLnN0YXRlID09PSBTVEFSVEVEKSByZXR1cm4gdGltZW91dChzdGFydCk7XG5cbiAgICAgIC8vIEludGVycnVwdCB0aGUgYWN0aXZlIHRyYW5zaXRpb24sIGlmIGFueS5cbiAgICAgIGlmIChvLnN0YXRlID09PSBSVU5OSU5HKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImludGVycnVwdFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FuY2VsIGFueSBwcmUtZW1wdGVkIHRyYW5zaXRpb25zLlxuICAgICAgZWxzZSBpZiAoK2kgPCBpZCkge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmZXIgdGhlIGZpcnN0IHRpY2sgdG8gZW5kIG9mIHRoZSBjdXJyZW50IGZyYW1lOyBzZWUgZDMvZDMjMTU3Ni5cbiAgICAvLyBOb3RlIHRoZSB0cmFuc2l0aW9uIG1heSBiZSBjYW5jZWxlZCBhZnRlciBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCB0aWNrIVxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIHNjaGVkdWxlZCBiZWZvcmUgdGhlIHN0YXJ0IGV2ZW50OyBzZWUgZDMvZDMtdHJhbnNpdGlvbiMxNiFcbiAgICAvLyBBc3N1bWluZyB0aGlzIGlzIHN1Y2Nlc3NmdWwsIHN1YnNlcXVlbnQgY2FsbGJhY2tzIGdvIHN0cmFpZ2h0IHRvIHRpY2suXG4gICAgdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLnN0YXRlID09PSBTVEFSVEVEKSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBSVU5OSU5HO1xuICAgICAgICBzZWxmLnRpbWVyLnJlc3RhcnQodGljaywgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcbiAgICAgICAgdGljayhlbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBzdGFydCBldmVudC5cbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBkb25lIGJlZm9yZSB0aGUgdHdlZW4gYXJlIGluaXRpYWxpemVkLlxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVElORztcbiAgICBzZWxmLm9uLmNhbGwoXCJzdGFydFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU1RBUlRJTkcpIHJldHVybjsgLy8gaW50ZXJydXB0ZWRcbiAgICBzZWxmLnN0YXRlID0gU1RBUlRFRDtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHR3ZWVuLCBkZWxldGluZyBudWxsIHR3ZWVuLlxuICAgIHR3ZWVuID0gbmV3IEFycmF5KG4gPSBzZWxmLnR3ZWVuLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgaiA9IC0xOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobyA9IHNlbGYudHdlZW5baV0udmFsdWUuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKSkge1xuICAgICAgICB0d2VlblsrK2pdID0gbztcbiAgICAgIH1cbiAgICB9XG4gICAgdHdlZW4ubGVuZ3RoID0gaiArIDE7XG4gIH1cblxuICBmdW5jdGlvbiB0aWNrKGVsYXBzZWQpIHtcbiAgICB2YXIgdCA9IGVsYXBzZWQgPCBzZWxmLmR1cmF0aW9uID8gc2VsZi5lYXNlLmNhbGwobnVsbCwgZWxhcHNlZCAvIHNlbGYuZHVyYXRpb24pIDogKHNlbGYudGltZXIucmVzdGFydChzdG9wKSwgc2VsZi5zdGF0ZSA9IEVORElORywgMSksXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IHR3ZWVuLmxlbmd0aDtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICB0d2VlbltpXS5jYWxsKG5vZGUsIHQpO1xuICAgIH1cblxuICAgIC8vIERpc3BhdGNoIHRoZSBlbmQgZXZlbnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgPT09IEVORElORykge1xuICAgICAgc2VsZi5vbi5jYWxsKFwiZW5kXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2VsZi5zdGF0ZSA9IEVOREVEO1xuICAgIHNlbGYudGltZXIuc3RvcCgpO1xuICAgIGRlbGV0ZSBzY2hlZHVsZXNbaWRdO1xuICAgIGZvciAodmFyIGkgaW4gc2NoZWR1bGVzKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7U1RBUlRJTkcsIEVORElORywgRU5ERUR9IGZyb20gXCIuL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSkge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb24sXG4gICAgICBzY2hlZHVsZSxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGVtcHR5ID0gdHJ1ZSxcbiAgICAgIGk7XG5cbiAgaWYgKCFzY2hlZHVsZXMpIHJldHVybjtcblxuICBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuXG4gIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICBpZiAoKHNjaGVkdWxlID0gc2NoZWR1bGVzW2ldKS5uYW1lICE9PSBuYW1lKSB7IGVtcHR5ID0gZmFsc2U7IGNvbnRpbnVlOyB9XG4gICAgYWN0aXZlID0gc2NoZWR1bGUuc3RhdGUgPiBTVEFSVElORyAmJiBzY2hlZHVsZS5zdGF0ZSA8IEVORElORztcbiAgICBzY2hlZHVsZS5zdGF0ZSA9IEVOREVEO1xuICAgIHNjaGVkdWxlLnRpbWVyLnN0b3AoKTtcbiAgICBzY2hlZHVsZS5vbi5jYWxsKGFjdGl2ZSA/IFwiaW50ZXJydXB0XCIgOiBcImNhbmNlbFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzY2hlZHVsZS5pbmRleCwgc2NoZWR1bGUuZ3JvdXApO1xuICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gIH1cblxuICBpZiAoZW1wdHkpIGRlbGV0ZSBub2RlLl9fdHJhbnNpdGlvbjtcbn1cbiIsImltcG9ydCBpbnRlcnJ1cHQgZnJvbSBcIi4uL2ludGVycnVwdC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgaW50ZXJydXB0KHRoaXMsIG5hbWUpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHR3ZWVuUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSB0d2VlbjAgPSB0d2VlbjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjEgPSB0d2VlbjEuc2xpY2UoKTtcbiAgICAgICAgICB0d2VlbjEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHR3ZWVuRnVuY3Rpb24oaWQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gKHR3ZWVuMCA9IHR3ZWVuKS5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgdCA9IHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9LCBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xW2ldID0gdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGkgPT09IG4pIHR3ZWVuMS5wdXNoKHQpO1xuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICBuYW1lICs9IFwiXCI7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIHR3ZWVuID0gZ2V0KHRoaXMubm9kZSgpLCBpZCkudHdlZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2Vlbi5sZW5ndGgsIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgodCA9IHR3ZWVuW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGwgPyB0d2VlblJlbW92ZSA6IHR3ZWVuRnVuY3Rpb24pKGlkLCBuYW1lLCB2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHdlZW5WYWx1ZSh0cmFuc2l0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0cmFuc2l0aW9uLl9pZDtcblxuICB0cmFuc2l0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKTtcbiAgICAoc2NoZWR1bGUudmFsdWUgfHwgKHNjaGVkdWxlLnZhbHVlID0ge30pKVtuYW1lXSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIGdldChub2RlLCBpZCkudmFsdWVbbmFtZV07XG4gIH07XG59XG4iLCJpbXBvcnQge2NvbG9yfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGVOdW1iZXIsIGludGVycG9sYXRlUmdiLCBpbnRlcnBvbGF0ZVN0cmluZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGM7XG4gIHJldHVybiAodHlwZW9mIGIgPT09IFwibnVtYmVyXCIgPyBpbnRlcnBvbGF0ZU51bWJlclxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyBpbnRlcnBvbGF0ZVJnYlxuICAgICAgOiAoYyA9IGNvbG9yKGIpKSA/IChiID0gYywgaW50ZXJwb2xhdGVSZ2IpXG4gICAgICA6IGludGVycG9sYXRlU3RyaW5nKShhLCBiKTtcbn1cbiIsImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCBpbnRlcnBvbGF0ZSBmcm9tIFwiLi9pbnRlcnBvbGF0ZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpLCBpID0gZnVsbG5hbWUgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdGhpcy5hdHRyVHdlZW4obmFtZSwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pKGZ1bGxuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwiYXR0ci5cIiArIG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdmFsdWUgPT0gbnVsbCA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpKGZ1bGxuYW1lKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkoZnVsbG5hbWUsIGksIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuKG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlKG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJhdHRyLlwiICsgbmFtZTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgKGZ1bGxuYW1lLmxvY2FsID8gYXR0clR3ZWVuTlMgOiBhdHRyVHdlZW4pKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtnZXQsIGluaXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGRlbGF5RnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkZWxheUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIGluaXQodGhpcywgaWQpLmRlbGF5ID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGRlbGF5RnVuY3Rpb25cbiAgICAgICAgICA6IGRlbGF5Q29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmRlbGF5O1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZHVyYXRpb25GdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZHVyYXRpb25Db25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGR1cmF0aW9uRnVuY3Rpb25cbiAgICAgICAgICA6IGR1cmF0aW9uQ29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmR1cmF0aW9uO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmVhc2U7XG59XG4iLCJpbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZVZhcnlpbmcoaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMuZWFjaChlYXNlVmFyeWluZyh0aGlzLl9pZCwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7bWF0Y2hlcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0cmFuc2l0aW9uKSB7XG4gIGlmICh0cmFuc2l0aW9uLl9pZCAhPT0gdGhpcy5faWQpIHRocm93IG5ldyBFcnJvcjtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gdHJhbnNpdGlvbi5fZ3JvdXBzLCBtMCA9IGdyb3VwczAubGVuZ3RoLCBtMSA9IGdyb3VwczEubGVuZ3RoLCBtID0gTWF0aC5taW4obTAsIG0xKSwgbWVyZ2VzID0gbmV3IEFycmF5KG0wKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cDAgPSBncm91cHMwW2pdLCBncm91cDEgPSBncm91cHMxW2pdLCBuID0gZ3JvdXAwLmxlbmd0aCwgbWVyZ2UgPSBtZXJnZXNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwMFtpXSB8fCBncm91cDFbaV0pIHtcbiAgICAgICAgbWVyZ2VbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBqIDwgbTA7ICsraikge1xuICAgIG1lcmdlc1tqXSA9IGdyb3VwczBbal07XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBzdGFydChuYW1lKSB7XG4gIHJldHVybiAobmFtZSArIFwiXCIpLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykuZXZlcnkoZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICByZXR1cm4gIXQgfHwgdCA9PT0gXCJzdGFydFwiO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25GdW5jdGlvbihpZCwgbmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG9uMCwgb24xLCBzaXQgPSBzdGFydChuYW1lKSA/IGluaXQgOiBzZXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzaXQodGhpcywgaWQpLFxuICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmIChvbiAhPT0gb24wKSAob24xID0gKG9uMCA9IG9uKS5jb3B5KCkpLm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDJcbiAgICAgID8gZ2V0KHRoaXMubm9kZSgpLCBpZCkub24ub24obmFtZSlcbiAgICAgIDogdGhpcy5lYWNoKG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSk7XG59XG4iLCJmdW5jdGlvbiByZW1vdmVGdW5jdGlvbihpZCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX190cmFuc2l0aW9uKSBpZiAoK2kgIT09IGlkKSByZXR1cm47XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub24oXCJlbmQucmVtb3ZlXCIsIHJlbW92ZUZ1bmN0aW9uKHRoaXMuX2lkKSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdG9yfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZCA9IHRoaXMuX2lkO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgICBzY2hlZHVsZShzdWJncm91cFtpXSwgbmFtZSwgaWQsIGksIHN1Ymdyb3VwLCBnZXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdG9yQWxsfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZCA9IHRoaXMuX2lkO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yQWxsKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gW10sIHBhcmVudHMgPSBbXSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgZm9yICh2YXIgY2hpbGRyZW4gPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCksIGNoaWxkLCBpbmhlcml0ID0gZ2V0KG5vZGUsIGlkKSwgayA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGsgPCBsOyArK2spIHtcbiAgICAgICAgICBpZiAoY2hpbGQgPSBjaGlsZHJlbltrXSkge1xuICAgICAgICAgICAgc2NoZWR1bGUoY2hpbGQsIG5hbWUsIGlkLCBrLCBjaGlsZHJlbiwgaW5oZXJpdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1Ymdyb3Vwcy5wdXNoKGNoaWxkcmVuKTtcbiAgICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHBhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5cbnZhciBTZWxlY3Rpb24gPSBzZWxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtzdHlsZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gc3R5bGVOdWxsKG5hbWUsIGludGVycG9sYXRlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgc3RyaW5nMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHN0cmluZzEwID0gc3RyaW5nMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgdmFsdWUxID0gdmFsdWUodGhpcyksXG4gICAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgc3RyaW5nMSA9IHZhbHVlMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZU1heWJlUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciBvbjAsIG9uMSwgbGlzdGVuZXIwLCBrZXkgPSBcInN0eWxlLlwiICsgbmFtZSwgZXZlbnQgPSBcImVuZC5cIiArIGtleSwgcmVtb3ZlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbixcbiAgICAgICAgbGlzdGVuZXIgPSBzY2hlZHVsZS52YWx1ZVtrZXldID09IG51bGwgPyByZW1vdmUgfHwgKHJlbW92ZSA9IHN0eWxlUmVtb3ZlKG5hbWUpKSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCB8fCBsaXN0ZW5lcjAgIT09IGxpc3RlbmVyKSAob24xID0gKG9uMCA9IG9uKS5jb3B5KCkpLm9uKGV2ZW50LCBsaXN0ZW5lcjAgPSBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciBpID0gKG5hbWUgKz0gXCJcIikgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlTnVsbChuYW1lLCBpKSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIHN0eWxlUmVtb3ZlKG5hbWUpKVxuICAgIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUZ1bmN0aW9uKG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJzdHlsZS5cIiArIG5hbWUsIHZhbHVlKSkpXG4gICAgICAuZWFjaChzdHlsZU1heWJlUmVtb3ZlKHRoaXMuX2lkLCBuYW1lKSlcbiAgICA6IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlQ29uc3RhbnQobmFtZSwgaSwgdmFsdWUpLCBwcmlvcml0eSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIG51bGwpO1xufVxuIiwiZnVuY3Rpb24gc3R5bGVJbnRlcnBvbGF0ZShuYW1lLCBpLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgaS5jYWxsKHRoaXMsIHQpLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciB0LCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdCA9IChpMCA9IGkpICYmIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpO1xuICAgIHJldHVybiB0O1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIga2V5ID0gXCJzdHlsZS5cIiArIChuYW1lICs9IFwiXCIpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgc3R5bGVUd2VlbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkgPT0gbnVsbCA/IFwiXCIgOiBwcmlvcml0eSkpO1xufVxuIiwiaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUxID0gdmFsdWUodGhpcyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlMSA9PSBudWxsID8gXCJcIiA6IHZhbHVlMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMudHdlZW4oXCJ0ZXh0XCIsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHRleHRGdW5jdGlvbih0d2VlblZhbHVlKHRoaXMsIFwidGV4dFwiLCB2YWx1ZSkpXG4gICAgICA6IHRleHRDb25zdGFudCh2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIikpO1xufVxuIiwiZnVuY3Rpb24gdGV4dEludGVycG9sYXRlKGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gaS5jYWxsKHRoaXMsIHQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0VHdlZW4odmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiB0ZXh0SW50ZXJwb2xhdGUoaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBrZXkgPSBcInRleHRcIjtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHRleHRUd2Vlbih2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9uLCBuZXdJZH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkMCA9IHRoaXMuX2lkLFxuICAgICAgaWQxID0gbmV3SWQoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICB2YXIgaW5oZXJpdCA9IGdldChub2RlLCBpZDApO1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZDEsIGksIGdyb3VwLCB7XG4gICAgICAgICAgdGltZTogaW5oZXJpdC50aW1lICsgaW5oZXJpdC5kZWxheSArIGluaGVyaXQuZHVyYXRpb24sXG4gICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgZHVyYXRpb246IGluaGVyaXQuZHVyYXRpb24sXG4gICAgICAgICAgZWFzZTogaW5oZXJpdC5lYXNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkMSk7XG59XG4iLCJpbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBvbjAsIG9uMSwgdGhhdCA9IHRoaXMsIGlkID0gdGhhdC5faWQsIHNpemUgPSB0aGF0LnNpemUoKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBjYW5jZWwgPSB7dmFsdWU6IHJlamVjdH0sXG4gICAgICAgIGVuZCA9IHt2YWx1ZTogZnVuY3Rpb24oKSB7IGlmICgtLXNpemUgPT09IDApIHJlc29sdmUoKTsgfX07XG5cbiAgICB0aGF0LmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICAgIG9uID0gc2NoZWR1bGUub247XG5cbiAgICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgICBpZiAob24gIT09IG9uMCkge1xuICAgICAgICBvbjEgPSAob24wID0gb24pLmNvcHkoKTtcbiAgICAgICAgb24xLl8uY2FuY2VsLnB1c2goY2FuY2VsKTtcbiAgICAgICAgb24xLl8uaW50ZXJydXB0LnB1c2goY2FuY2VsKTtcbiAgICAgICAgb24xLl8uZW5kLnB1c2goZW5kKTtcbiAgICAgIH1cblxuICAgICAgc2NoZWR1bGUub24gPSBvbjE7XG4gICAgfSk7XG5cbiAgICAvLyBUaGUgc2VsZWN0aW9uIHdhcyBlbXB0eSwgcmVzb2x2ZSBlbmQgaW1tZWRpYXRlbHlcbiAgICBpZiAoc2l6ZSA9PT0gMCkgcmVzb2x2ZSgpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHJUd2VlbiBmcm9tIFwiLi9hdHRyVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2RlbGF5IGZyb20gXCIuL2RlbGF5LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kdXJhdGlvbiBmcm9tIFwiLi9kdXJhdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZSBmcm9tIFwiLi9lYXNlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lYXNlVmFyeWluZyBmcm9tIFwiLi9lYXNlVmFyeWluZy5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlci5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGVUd2VlbiBmcm9tIFwiLi9zdHlsZVR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHRUd2VlbiBmcm9tIFwiLi90ZXh0VHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RyYW5zaXRpb24gZnJvbSBcIi4vdHJhbnNpdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHdlZW4gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2VuZCBmcm9tIFwiLi9lbmQuanNcIjtcblxudmFyIGlkID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zaXRpb24oZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCkge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xuICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgdGhpcy5faWQgPSBpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNpdGlvbihuYW1lKSB7XG4gIHJldHVybiBzZWxlY3Rpb24oKS50cmFuc2l0aW9uKG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3SWQoKSB7XG4gIHJldHVybiArK2lkO1xufVxuXG52YXIgc2VsZWN0aW9uX3Byb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGU7XG5cblRyYW5zaXRpb24ucHJvdG90eXBlID0gdHJhbnNpdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2l0aW9uLFxuICBzZWxlY3Q6IHRyYW5zaXRpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHRyYW5zaXRpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3Byb3RvdHlwZS5zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGRyZW4sXG4gIGZpbHRlcjogdHJhbnNpdGlvbl9maWx0ZXIsXG4gIG1lcmdlOiB0cmFuc2l0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHRyYW5zaXRpb25fc2VsZWN0aW9uLFxuICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uX3RyYW5zaXRpb24sXG4gIGNhbGw6IHNlbGVjdGlvbl9wcm90b3R5cGUuY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX3Byb3RvdHlwZS5lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX3Byb3RvdHlwZS5lYWNoLFxuICBvbjogdHJhbnNpdGlvbl9vbixcbiAgYXR0cjogdHJhbnNpdGlvbl9hdHRyLFxuICBhdHRyVHdlZW46IHRyYW5zaXRpb25fYXR0clR3ZWVuLFxuICBzdHlsZTogdHJhbnNpdGlvbl9zdHlsZSxcbiAgc3R5bGVUd2VlbjogdHJhbnNpdGlvbl9zdHlsZVR3ZWVuLFxuICB0ZXh0OiB0cmFuc2l0aW9uX3RleHQsXG4gIHRleHRUd2VlbjogdHJhbnNpdGlvbl90ZXh0VHdlZW4sXG4gIHJlbW92ZTogdHJhbnNpdGlvbl9yZW1vdmUsXG4gIHR3ZWVuOiB0cmFuc2l0aW9uX3R3ZWVuLFxuICBkZWxheTogdHJhbnNpdGlvbl9kZWxheSxcbiAgZHVyYXRpb246IHRyYW5zaXRpb25fZHVyYXRpb24sXG4gIGVhc2U6IHRyYW5zaXRpb25fZWFzZSxcbiAgZWFzZVZhcnlpbmc6IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcsXG4gIGVuZDogdHJhbnNpdGlvbl9lbmQsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25fcHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl1cbn07XG4iLCJleHBvcnQgY29uc3QgbGluZWFyID0gdCA9PiArdDtcbiIsImV4cG9ydCBmdW5jdGlvbiBjdWJpY0luKHQpIHtcbiAgcmV0dXJuIHQgKiB0ICogdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljT3V0KHQpIHtcbiAgcmV0dXJuIC0tdCAqIHQgKiB0ICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW5PdXQodCkge1xuICByZXR1cm4gKCh0ICo9IDIpIDw9IDEgPyB0ICogdCAqIHQgOiAodCAtPSAyKSAqIHQgKiB0ICsgMikgLyAyO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9uLCBuZXdJZH0gZnJvbSBcIi4uL3RyYW5zaXRpb24vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHtlYXNlQ3ViaWNJbk91dH0gZnJvbSBcImQzLWVhc2VcIjtcbmltcG9ydCB7bm93fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGRlZmF1bHRUaW1pbmcgPSB7XG4gIHRpbWU6IG51bGwsIC8vIFNldCBvbiB1c2UuXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogMjUwLFxuICBlYXNlOiBlYXNlQ3ViaWNJbk91dFxufTtcblxuZnVuY3Rpb24gaW5oZXJpdChub2RlLCBpZCkge1xuICB2YXIgdGltaW5nO1xuICB3aGlsZSAoISh0aW1pbmcgPSBub2RlLl9fdHJhbnNpdGlvbikgfHwgISh0aW1pbmcgPSB0aW1pbmdbaWRdKSkge1xuICAgIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyYW5zaXRpb24gJHtpZH0gbm90IGZvdW5kYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aW1pbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGlkLFxuICAgICAgdGltaW5nO1xuXG4gIGlmIChuYW1lIGluc3RhbmNlb2YgVHJhbnNpdGlvbikge1xuICAgIGlkID0gbmFtZS5faWQsIG5hbWUgPSBuYW1lLl9uYW1lO1xuICB9IGVsc2Uge1xuICAgIGlkID0gbmV3SWQoKSwgKHRpbWluZyA9IGRlZmF1bHRUaW1pbmcpLnRpbWUgPSBub3coKSwgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNjaGVkdWxlKG5vZGUsIG5hbWUsIGlkLCBpLCBncm91cCwgdGltaW5nIHx8IGluaGVyaXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnRlcnJ1cHQgZnJvbSBcIi4vaW50ZXJydXB0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RyYW5zaXRpb24gZnJvbSBcIi4vdHJhbnNpdGlvbi5qc1wiO1xuXG5zZWxlY3Rpb24ucHJvdG90eXBlLmludGVycnVwdCA9IHNlbGVjdGlvbl9pbnRlcnJ1cHQ7XG5zZWxlY3Rpb24ucHJvdG90eXBlLnRyYW5zaXRpb24gPSBzZWxlY3Rpb25fdHJhbnNpdGlvbjtcbiIsImV4cG9ydCBmdW5jdGlvbiBUcmFuc2Zvcm0oaywgeCwgeSkge1xuICB0aGlzLmsgPSBrO1xuICB0aGlzLnggPSB4O1xuICB0aGlzLnkgPSB5O1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVHJhbnNmb3JtLFxuICBzY2FsZTogZnVuY3Rpb24oaykge1xuICAgIHJldHVybiBrID09PSAxID8gdGhpcyA6IG5ldyBUcmFuc2Zvcm0odGhpcy5rICogaywgdGhpcy54LCB0aGlzLnkpO1xuICB9LFxuICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4geCA9PT0gMCAmIHkgPT09IDAgPyB0aGlzIDogbmV3IFRyYW5zZm9ybSh0aGlzLmssIHRoaXMueCArIHRoaXMuayAqIHgsIHRoaXMueSArIHRoaXMuayAqIHkpO1xuICB9LFxuICBhcHBseTogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICByZXR1cm4gW3BvaW50WzBdICogdGhpcy5rICsgdGhpcy54LCBwb2ludFsxXSAqIHRoaXMuayArIHRoaXMueV07XG4gIH0sXG4gIGFwcGx5WDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4ICogdGhpcy5rICsgdGhpcy54O1xuICB9LFxuICBhcHBseVk6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4geSAqIHRoaXMuayArIHRoaXMueTtcbiAgfSxcbiAgaW52ZXJ0OiBmdW5jdGlvbihsb2NhdGlvbikge1xuICAgIHJldHVybiBbKGxvY2F0aW9uWzBdIC0gdGhpcy54KSAvIHRoaXMuaywgKGxvY2F0aW9uWzFdIC0gdGhpcy55KSAvIHRoaXMua107XG4gIH0sXG4gIGludmVydFg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gKHggLSB0aGlzLngpIC8gdGhpcy5rO1xuICB9LFxuICBpbnZlcnRZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuICh5IC0gdGhpcy55KSAvIHRoaXMuaztcbiAgfSxcbiAgcmVzY2FsZVg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geC5jb3B5KCkuZG9tYWluKHgucmFuZ2UoKS5tYXAodGhpcy5pbnZlcnRYLCB0aGlzKS5tYXAoeC5pbnZlcnQsIHgpKTtcbiAgfSxcbiAgcmVzY2FsZVk6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4geS5jb3B5KCkuZG9tYWluKHkucmFuZ2UoKS5tYXAodGhpcy5pbnZlcnRZLCB0aGlzKS5tYXAoeS5pbnZlcnQsIHkpKTtcbiAgfSxcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHRoaXMueCArIFwiLFwiICsgdGhpcy55ICsgXCIpIHNjYWxlKFwiICsgdGhpcy5rICsgXCIpXCI7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSBuZXcgVHJhbnNmb3JtKDEsIDAsIDApO1xuXG50cmFuc2Zvcm0ucHJvdG90eXBlID0gVHJhbnNmb3JtLnByb3RvdHlwZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtKG5vZGUpIHtcbiAgd2hpbGUgKCFub2RlLl9fem9vbSkgaWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHJldHVybiBpZGVudGl0eTtcbiAgcmV0dXJuIG5vZGUuX196b29tO1xufVxuIiwiZXhwb3J0IGNvbnN0IHN2Z25zID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IDxUIGV4dGVuZHMgRWxlbWVudD4oXG4gIHNlbGVjdG9yOiBzdHJpbmcsXG4gIHR5cGU/OiBuZXcgKCkgPT4gVFxuKTogVCA9PiB7XG4gIGNvbnN0IGVsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICBpZiAoZWx0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgc2VsZWN0b3IgXCIgKyBzZWxlY3Rvcik7XG4gIH1cbiAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiAhKGVsdCBpbnN0YW5jZW9mIHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTZWxlY3RvciAke3NlbGVjdG9yfSBub3Qgb2YgdHlwZSAke3R5cGV9YCk7XG4gIH1cbiAgcmV0dXJuIGVsdCBhcyBUO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBmaXR0cyA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGJpZ1RhcmdldDEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmZpdHRzIGcuYmlnLXRhcmdldDFcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDM1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAyNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMTUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDUpO1xuICBjb25zdCBiaWdUYXJnZXQyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLmJpZy10YXJnZXQyXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAzNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMjUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDE1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCA1KTtcbiAgY29uc3Qgc21hbGxUYXJnZXQgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmZpdHRzIGcuc21hbGwtdGFyZ2V0XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoc21hbGxUYXJnZXQsIDQwLCA1MCwgNSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHB1cnBvc2UgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBiaWdUYXJnZXQxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5wdXJwb3NlIGcudGFyZ2V0XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgNDApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAzMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDIwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMTApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAxKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgaGljayA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTAxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGcxLFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsNDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzIsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMCw0MCA0MCw0MCA0MCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGczID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTAzXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGczLFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCw0MCA0MCw0MCA0MCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc0ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA0XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc0LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDIwLDQwIDQwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzUgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDVcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzUsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDAgMCw0MCA0MCwyMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNixcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsNDAgNDAsNDAgMjAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBqYWtvYiA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGFwcDEgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcuYXBwLTFcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShhcHAxLCA0MCwgNTAsIDM1KTtcbiAgY29uc3QgYXBwMiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy5hcHAtMlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGFwcDIsIDQwLCA1MCwgMzUpO1xuICBjb25zdCB5b3VyQXBwID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLnlvdXItYXBwXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoeW91ckFwcCwgNDAsIDUwLCAzNSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGdyYWRpZW50ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZ3JhZGllbnQgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCA1LCAzMCwgNDAsIDQwLCAxKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDUwLCAzMCwgNDAsIDQwLCAyKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDk1LCAzMCwgNDAsIDQwLCAzKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDE0MCwgMzAsIDQwLCA0MCwgNCk7XG4gIHQuY3JlYXRlUmVjdChnLCAxODUsIDMwLCA0MCwgNDAsIDUpO1xuICB0LmNyZWF0ZVJlY3QoZywgMjMwLCAzMCwgNDAsIDQwLCA2KTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZ2VzdGFsdCA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmdlc3RhbHQgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCwgeSAqIDIwICsgMjAsIDUsIHtcbiAgICAgICAgY2xhc3M6IFwiZnVsbFwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwcm94aW1pdHkgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5wcm94aW1pdHkgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHggPiAxICYmIHkgPCAyID8gOCA6IDA7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAgKyBvZmZzZXQsIHkgKiAyMCArIDIwIC0gb2Zmc2V0LCA1LCB7XG4gICAgICAgIGNsYXNzOiBcImZ1bGxcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3Qgc2ltaWxhcml0eSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnNpbWlsYXJpdHkgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgIGNvbnN0IG15Q2xhc3MgPSB4ID4gMSAmJiB5IDwgMiA/IFwieHh4XCIgOiBcImZ1bGxcIjtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCwgeSAqIDIwICsgMjAsIDUsIHtcbiAgICAgICAgY2xhc3M6IG15Q2xhc3MsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGNvbW1vblJlZ2lvbiA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmNvbW1vblJlZ2lvbiBnXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDEwMCArIDMyLCAxMiwgNTcsIDM3LCAyKTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogXCJmdWxsXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHNpbXBsaWNpdHkgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5zaW1wbGljaXR5IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTAwICsgMzIsIDEyLCA1NywgMzcsIDIpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTAwIC0gOCwgMTIsIDk3LCA3NywgMik7XG59O1xuIiwiaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuL1NWR1Rvb2xcIjtcbmltcG9ydCB7IGZpdHRzIH0gZnJvbSBcIi4vc3Zncy9maXR0c1wiO1xuaW1wb3J0IHsgcHVycG9zZSB9IGZyb20gXCIuL3N2Z3MvcHVycG9zZVwiO1xuaW1wb3J0IHsgaGljayB9IGZyb20gXCIuL3N2Z3MvaGlja1wiO1xuaW1wb3J0IHsgamFrb2IgfSBmcm9tIFwiLi9zdmdzL2pha29iXCI7XG5pbXBvcnQgeyBncmFkaWVudCB9IGZyb20gXCIuL3N2Z3MvZ3JhZGllbnRcIjtcbmltcG9ydCB7IGdlc3RhbHQgfSBmcm9tIFwiLi9zdmdzL2dlc3RhbHRcIjtcbmltcG9ydCB7IHByb3hpbWl0eSB9IGZyb20gXCIuL3N2Z3MvcHJveGltaXR5XCI7XG5pbXBvcnQgeyBzaW1pbGFyaXR5IH0gZnJvbSBcIi4vc3Zncy9zaW1pbGFyaXR5XCI7XG5pbXBvcnQgeyBjb21tb25SZWdpb24gfSBmcm9tIFwiLi9zdmdzL2NvbW1vblJlZ2lvblwiO1xuaW1wb3J0IHsgc2ltcGxpY2l0eSB9IGZyb20gXCIuL3N2Z3Mvc2ltcGxpY2l0eVwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnOiB7IFtrZXk6IHN0cmluZ106ICgodDogU1ZHVG9vbCkgPT4gdm9pZClbXSB9ID0ge1xuICBcIjAyLWZpdHRzXCI6IFtmaXR0c10sXG4gIFwiMDEtcHVycG9zZVwiOiBbcHVycG9zZV0sXG4gIFwiMDMtaGlja1wiOiBbaGlja10sXG4gIFwiMDQtamFrb2JcIjogW2pha29iXSxcbiAgXCIwNy1nb2FsLWdyYWRpZW50XCI6IFtncmFkaWVudF0sXG4gIFwiMDgtZ2VzdGFsdFwiOiBbZ2VzdGFsdF0sXG4gIFwiMDktbGF3LW9mLXByb3hpbWl0eVwiOiBbcHJveGltaXR5XSxcbiAgXCIxMC1sYXctb2Ytc2ltaWxhcml0eVwiOiBbc2ltaWxhcml0eV0sXG4gIFwiMTEtbGF3LW9mLWNvbW1vbi1yZWdpb25cIjogW2NvbW1vblJlZ2lvbl0sXG4gIFwiMTItbGF3LW9mLXNpbXBsaWNpdHlcIjogW3NpbXBsaWNpdHldLFxufTtcblxuY29uc3Qgc2V0ID0gbmV3IFNldDwodDogU1ZHVG9vbCkgPT4gdm9pZD4oKTtcbmZvciAoY29uc3QgdmFsdWVzIG9mIE9iamVjdC52YWx1ZXMoY29uZmlnKSkge1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgIHNldC5hZGQodmFsdWUpO1xuICB9XG59XG5leHBvcnQgY29uc3QgYWxsID0gWy4uLnNldF07XG4iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcbmltcG9ydCB7IFRyYW5zaXRpb25PcHRpb25zIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9UcmFuc2l0aW9uT3B0aW9uc1wiO1xuaW1wb3J0IHsgY29uZmlnLCBhbGwgfSBmcm9tIFwiLi9zdmdDb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIFNWR1Rvb2wge1xuICBkZWxheUNvdW50ZXIgPSAwO1xuICBkZWxheUluY3JlbWVudCA9IDEwMDtcbiAgdXNlVHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gIHN2Z05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0U3ZnTmFtZSgpO1xuICB9XG5cbiAgaW5pdFN2Z05hbWUoKSB7XG4gICAgY29uc3QgcmVnZXggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goL14uKlxcL2NhcmRzXFwvKC4qKSguaHRtbCkkLyk7XG4gICAgY29uc29sZS5sb2coXCJyZWdleDogXCIsIHJlZ2V4KTtcbiAgICBpZiAocmVnZXggaW5zdGFuY2VvZiBBcnJheSAmJiByZWdleC5sZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLnN2Z05hbWUgPSByZWdleFsxXTtcbiAgICAgIHRoaXMudXNlVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXNlVHJhbnNpdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdFN2ZygpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdmdOYW1lID8gY29uZmlnW3RoaXMuc3ZnTmFtZV0gOiBhbGw7XG4gICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGYgb2YgbGlzdCkge1xuICAgICAgZih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBnZXREZWxheSgpIHtcbiAgICB0aGlzLmRlbGF5Q291bnRlciArPSB0aGlzLmRlbGF5SW5jcmVtZW50O1xuICAgIHJldHVybiB0aGlzLmRlbGF5Q291bnRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgY3g6IG51bWJlcixcbiAgICBjeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBvcHRpb25zPzogUGFydGlhbDxUcmFuc2l0aW9uT3B0aW9ucz5cbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwiY2lyY2xlXCIsXG4gICAgICB7XG4gICAgICAgIGN4LFxuICAgICAgICBjeSxcbiAgICAgICAgcjogMCxcbiAgICAgIH0sXG4gICAgICB7IHIgfSxcbiAgICAgIG9wdHNcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUG9seWdvbihncm91cDogU1ZHR0VsZW1lbnQsIHBvaW50czogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJwb2x5Z29uXCIsXG4gICAgICB7IHBvaW50czogXCJcIiB9LFxuICAgICAgeyBwb2ludHM6IHBvaW50cyB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVQb2x5bGluZShncm91cDogU1ZHR0VsZW1lbnQsIHBvaW50czogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJwb2x5bGluZVwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUmVjdChcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGludGVuc2l0eSA9IDBcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJyZWN0XCIsXG4gICAgICB7IHgsIHksIHdpZHRoLCBoZWlnaHQ6IDAsIG9wYWNpdHk6IGludGVuc2l0eSAqICgxLjAgLyA2KSB9LFxuICAgICAgeyBoZWlnaHQ6IGhlaWdodCB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVGb3JtID0gPFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IHN0cmluZyB9PihcbiAgICBjb250YWluZXI6IFNWR0dFbGVtZW50LFxuICAgIGVsdE5hbWU6IHN0cmluZyxcbiAgICBpbml0aWFsQXR0cmlidXRlczogVCxcbiAgICBmaW5hbEF0dHJpYnV0ZXM6IFBhcnRpYWw8VD4sXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkgPT4ge1xuICAgIGNvbnN0IG9wdHM6IFRyYW5zaXRpb25PcHRpb25zID0ge1xuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICBkZWxheTogMTAwMCxcbiAgICAgIGNsYXNzOiBcIlwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuICAgIGlmICghdGhpcy51c2VUcmFuc2l0aW9uKSB7XG4gICAgICBvcHRzLmRlbGF5ID0gMDtcbiAgICAgIG9wdHMuZHVyYXRpb24gPSAwO1xuICAgIH1cbiAgICBjb25zdCBlbHQgPSBkMy5zZWxlY3QoY29udGFpbmVyKS5hcHBlbmQoZWx0TmFtZSk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbml0aWFsQXR0cmlidXRlcykpIHtcbiAgICAgIGVsdC5hdHRyKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAob3B0cy5jbGFzcykge1xuICAgICAgZWx0LmF0dHIoXCJjbGFzc1wiLCBvcHRzLmNsYXNzKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ID0gZWx0XG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24ob3B0cy5kdXJhdGlvbilcbiAgICAgIC5kZWxheShvcHRzLmRlbGF5KVxuICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcik7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhmaW5hbEF0dHJpYnV0ZXMpKSB7XG4gICAgICB0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0ICogYXMgY29udmVydCBmcm9tIFwiY29sb3ItY29udmVydFwiO1xuaW1wb3J0IHsgSFNMLCBLRVlXT1JELCBMQUIsIFJHQiB9IGZyb20gXCJjb2xvci1jb252ZXJ0L2NvbnZlcnNpb25zXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0VGhlbWUgPSAoKSA9PiB7XG4gIGhhbmRsZURhcmtUaGVtZSgpO1xuXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICBcIi0tcHJpbWFyeS1jb2xvclwiLFxuICAgIFwiaHNsKDEyMCwgMTAwJSwgMjUlKVwiXG4gICk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICBcIi0tZmlsbC1jb2xvclwiLFxuICAgIFwiaHNsYSgxMjAsIDEwMCUsIDI1JSwgMC4xKVwiXG4gICk7XG59O1xuXG5jb25zdCBoYW5kbGVEYXJrVGhlbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGlzRGFyayA9XG4gICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcztcblxuICBjb25zdCBjbCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0O1xuICBpc0RhcmsgPyBjbC5hZGQoXCJkYXJrXCIpIDogY2wuYWRkKFwibGlnaHRcIik7XG5cbiAgd2luZG93XG4gICAgLm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gZS5tYXRjaGVzID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbG9yU2NoZW1lOiBcIiwgY29sb3JTY2hlbWUpO1xuXG4gICAgICBjbC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgICAgY2wucmVtb3ZlKFwibGlnaHRcIik7XG4gICAgICBpZiAoY29sb3JTY2hlbWUgPT09IFwiZGFya1wiKSB7XG4gICAgICAgIGNsLmFkZChcImRhcmtcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbC5hZGQoXCJsaWdodFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi9TVkdUb29sXCI7XG5cbmltcG9ydCB7IGluaXRUaGVtZSB9IGZyb20gXCIuL3RoZW1lXCI7XG5cbmluaXRUaGVtZSgpO1xuXG5jb25zdCBzdmdUb29sID0gbmV3IFNWR1Rvb2woKTtcbnN2Z1Rvb2wuaW5pdFN2ZygpO1xuIl0sIm5hbWVzIjpbIm5vb3AiLCJkaXNwYXRjaCIsImkiLCJuIiwiXyIsInQiLCJEaXNwYXRjaCIsInBhcnNlVHlwZW5hbWVzIiwidHlwZW5hbWVzIiwidHlwZXMiLCJuYW1lIiwidHlwZW5hbWUiLCJjYWxsYmFjayIsIlQiLCJnZXQiLCJzZXQiLCJjb3B5IiwidHlwZSIsInRoYXQiLCJhcmdzIiwiYyIsInhodG1sIiwibmFtZXNwYWNlcyIsIm5hbWVzcGFjZSIsInByZWZpeCIsImNyZWF0b3JJbmhlcml0IiwiZG9jdW1lbnQiLCJ1cmkiLCJjcmVhdG9yRml4ZWQiLCJmdWxsbmFtZSIsImNyZWF0b3IiLCJub25lIiwic2VsZWN0b3IiLCJzZWxlY3Rpb25fc2VsZWN0Iiwic2VsZWN0IiwiZ3JvdXBzIiwibSIsInN1Ymdyb3VwcyIsImoiLCJncm91cCIsInN1Ymdyb3VwIiwibm9kZSIsInN1Ym5vZGUiLCJTZWxlY3Rpb24iLCJhcnJheSIsIngiLCJlbXB0eSIsInNlbGVjdG9yQWxsIiwiYXJyYXlBbGwiLCJzZWxlY3Rpb25fc2VsZWN0QWxsIiwicGFyZW50cyIsIm1hdGNoZXIiLCJjaGlsZE1hdGNoZXIiLCJmaW5kIiwiY2hpbGRGaW5kIiwibWF0Y2giLCJjaGlsZEZpcnN0Iiwic2VsZWN0aW9uX3NlbGVjdENoaWxkIiwiZmlsdGVyIiwiY2hpbGRyZW4iLCJjaGlsZHJlbkZpbHRlciIsInNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiIsInNlbGVjdGlvbl9maWx0ZXIiLCJzcGFyc2UiLCJ1cGRhdGUiLCJzZWxlY3Rpb25fZW50ZXIiLCJFbnRlck5vZGUiLCJwYXJlbnQiLCJkYXR1bSIsImNoaWxkIiwibmV4dCIsImNvbnN0YW50JDEiLCJiaW5kSW5kZXgiLCJlbnRlciIsImV4aXQiLCJkYXRhIiwiZ3JvdXBMZW5ndGgiLCJkYXRhTGVuZ3RoIiwiYmluZEtleSIsImtleSIsIm5vZGVCeUtleVZhbHVlIiwia2V5VmFsdWVzIiwia2V5VmFsdWUiLCJzZWxlY3Rpb25fZGF0YSIsInZhbHVlIiwiYmluZCIsImNvbnN0YW50IiwiYXJyYXlsaWtlIiwiZW50ZXJHcm91cCIsInVwZGF0ZUdyb3VwIiwiZXhpdEdyb3VwIiwiaTAiLCJpMSIsInByZXZpb3VzIiwic2VsZWN0aW9uX2V4aXQiLCJzZWxlY3Rpb25fam9pbiIsIm9uZW50ZXIiLCJvbnVwZGF0ZSIsIm9uZXhpdCIsInNlbGVjdGlvbl9tZXJnZSIsImNvbnRleHQiLCJzZWxlY3Rpb24iLCJncm91cHMwIiwiZ3JvdXBzMSIsIm0wIiwibTEiLCJtZXJnZXMiLCJncm91cDAiLCJncm91cDEiLCJtZXJnZSIsInNlbGVjdGlvbl9vcmRlciIsInNlbGVjdGlvbl9zb3J0IiwiY29tcGFyZSIsImFzY2VuZGluZyIsImNvbXBhcmVOb2RlIiwiYSIsImIiLCJzb3J0Z3JvdXBzIiwic29ydGdyb3VwIiwic2VsZWN0aW9uX2NhbGwiLCJzZWxlY3Rpb25fbm9kZXMiLCJzZWxlY3Rpb25fbm9kZSIsInNlbGVjdGlvbl9zaXplIiwic2l6ZSIsInNlbGVjdGlvbl9lbXB0eSIsInNlbGVjdGlvbl9lYWNoIiwiYXR0clJlbW92ZSIsImF0dHJSZW1vdmVOUyIsImF0dHJDb25zdGFudCIsImF0dHJDb25zdGFudE5TIiwiYXR0ckZ1bmN0aW9uIiwidiIsImF0dHJGdW5jdGlvbk5TIiwic2VsZWN0aW9uX2F0dHIiLCJkZWZhdWx0VmlldyIsInN0eWxlUmVtb3ZlIiwic3R5bGVDb25zdGFudCIsInByaW9yaXR5Iiwic3R5bGVGdW5jdGlvbiIsInNlbGVjdGlvbl9zdHlsZSIsInN0eWxlVmFsdWUiLCJwcm9wZXJ0eVJlbW92ZSIsInByb3BlcnR5Q29uc3RhbnQiLCJwcm9wZXJ0eUZ1bmN0aW9uIiwic2VsZWN0aW9uX3Byb3BlcnR5IiwiY2xhc3NBcnJheSIsInN0cmluZyIsImNsYXNzTGlzdCIsIkNsYXNzTGlzdCIsImNsYXNzZWRBZGQiLCJuYW1lcyIsImxpc3QiLCJjbGFzc2VkUmVtb3ZlIiwiY2xhc3NlZFRydWUiLCJjbGFzc2VkRmFsc2UiLCJjbGFzc2VkRnVuY3Rpb24iLCJzZWxlY3Rpb25fY2xhc3NlZCIsInRleHRSZW1vdmUiLCJ0ZXh0Q29uc3RhbnQiLCJ0ZXh0RnVuY3Rpb24iLCJzZWxlY3Rpb25fdGV4dCIsImh0bWxSZW1vdmUiLCJodG1sQ29uc3RhbnQiLCJodG1sRnVuY3Rpb24iLCJzZWxlY3Rpb25faHRtbCIsInJhaXNlIiwic2VsZWN0aW9uX3JhaXNlIiwibG93ZXIiLCJzZWxlY3Rpb25fbG93ZXIiLCJzZWxlY3Rpb25fYXBwZW5kIiwiY3JlYXRlIiwiY29uc3RhbnROdWxsIiwic2VsZWN0aW9uX2luc2VydCIsImJlZm9yZSIsInJlbW92ZSIsInNlbGVjdGlvbl9yZW1vdmUiLCJzZWxlY3Rpb25fY2xvbmVTaGFsbG93IiwiY2xvbmUiLCJzZWxlY3Rpb25fY2xvbmVEZWVwIiwic2VsZWN0aW9uX2Nsb25lIiwiZGVlcCIsInNlbGVjdGlvbl9kYXR1bSIsImNvbnRleHRMaXN0ZW5lciIsImxpc3RlbmVyIiwiZXZlbnQiLCJvblJlbW92ZSIsIm9uIiwib25BZGQiLCJvcHRpb25zIiwibyIsInNlbGVjdGlvbl9vbiIsImRpc3BhdGNoRXZlbnQiLCJwYXJhbXMiLCJ3aW5kb3ciLCJkaXNwYXRjaENvbnN0YW50IiwiZGlzcGF0Y2hGdW5jdGlvbiIsInNlbGVjdGlvbl9kaXNwYXRjaCIsInNlbGVjdGlvbl9pdGVyYXRvciIsInJvb3QiLCJzZWxlY3Rpb25fc2VsZWN0aW9uIiwiZGVmaW5lIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwicHJvdG90eXBlIiwiZXh0ZW5kIiwiZGVmaW5pdGlvbiIsIkNvbG9yIiwiZGFya2VyIiwiYnJpZ2h0ZXIiLCJyZUkiLCJyZU4iLCJyZVAiLCJyZUhleCIsInJlUmdiSW50ZWdlciIsInJlUmdiUGVyY2VudCIsInJlUmdiYUludGVnZXIiLCJyZVJnYmFQZXJjZW50IiwicmVIc2xQZXJjZW50IiwicmVIc2xhUGVyY2VudCIsIm5hbWVkIiwiY29sb3IiLCJjaGFubmVscyIsImNvbG9yX2Zvcm1hdEhleCIsImNvbG9yX2Zvcm1hdEhleDgiLCJjb2xvcl9mb3JtYXRIc2wiLCJjb2xvcl9mb3JtYXRSZ2IiLCJoc2xDb252ZXJ0IiwiZm9ybWF0IiwibCIsInJnYm4iLCJSZ2IiLCJyZ2JhIiwiaHNsYSIsInIiLCJnIiwicmdiQ29udmVydCIsInJnYiIsIm9wYWNpdHkiLCJrIiwiY2xhbXBpIiwiY2xhbXBhIiwicmdiX2Zvcm1hdEhleCIsInJnYl9mb3JtYXRIZXg4IiwicmdiX2Zvcm1hdFJnYiIsImhleCIsImgiLCJzIiwiSHNsIiwibWluIiwibWF4IiwiaHNsIiwibTIiLCJoc2wycmdiIiwiY2xhbXBoIiwiY2xhbXB0IiwibGluZWFyIiwiZCIsImV4cG9uZW50aWFsIiwieSIsImdhbW1hIiwibm9nYW1tYSIsImludGVycG9sYXRlUmdiIiwicmdiR2FtbWEiLCJzdGFydCIsImVuZCIsImNvbG9yUmdiIiwiaW50ZXJwb2xhdGVOdW1iZXIiLCJyZUEiLCJyZUIiLCJ6ZXJvIiwib25lIiwiaW50ZXJwb2xhdGVTdHJpbmciLCJiaSIsImFtIiwiYm0iLCJicyIsInEiLCJudW1iZXIiLCJkZWdyZWVzIiwiaWRlbnRpdHkiLCJkZWNvbXBvc2UiLCJlIiwiZiIsInNjYWxlWCIsInNjYWxlWSIsInNrZXdYIiwic3ZnTm9kZSIsInBhcnNlQ3NzIiwicGFyc2VTdmciLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybSIsInBhcnNlIiwicHhDb21tYSIsInB4UGFyZW4iLCJkZWdQYXJlbiIsInBvcCIsInRyYW5zbGF0ZSIsInhhIiwieWEiLCJ4YiIsInliIiwicm90YXRlIiwic2NhbGUiLCJpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyIsImludGVycG9sYXRlVHJhbnNmb3JtU3ZnIiwiZnJhbWUiLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJwb2tlRGVsYXkiLCJ0YXNrSGVhZCIsInRhc2tUYWlsIiwiY2xvY2tMYXN0IiwiY2xvY2tOb3ciLCJjbG9ja1NrZXciLCJjbG9jayIsInNldEZyYW1lIiwibm93IiwiY2xlYXJOb3ciLCJUaW1lciIsInRpbWVyIiwiZGVsYXkiLCJ0aW1lIiwic2xlZXAiLCJ0aW1lckZsdXNoIiwid2FrZSIsIm5hcCIsInBva2UiLCJ0MCIsInQxIiwidDIiLCJlbGFwc2VkIiwiZW1wdHlPbiIsImVtcHR5VHdlZW4iLCJDUkVBVEVEIiwiU0NIRURVTEVEIiwiU1RBUlRJTkciLCJTVEFSVEVEIiwiUlVOTklORyIsIkVORElORyIsIkVOREVEIiwic2NoZWR1bGUiLCJpZCIsImluZGV4IiwidGltaW5nIiwic2NoZWR1bGVzIiwiaW5pdCIsInNlbGYiLCJ0d2VlbiIsInN0b3AiLCJ0aWNrIiwiaW50ZXJydXB0IiwiYWN0aXZlIiwic2VsZWN0aW9uX2ludGVycnVwdCIsInR3ZWVuUmVtb3ZlIiwidHdlZW4wIiwidHdlZW4xIiwidHdlZW5GdW5jdGlvbiIsInRyYW5zaXRpb25fdHdlZW4iLCJ0d2VlblZhbHVlIiwidHJhbnNpdGlvbiIsImludGVycG9sYXRlIiwidmFsdWUxIiwic3RyaW5nMDAiLCJzdHJpbmcxIiwiaW50ZXJwb2xhdGUwIiwic3RyaW5nMCIsInN0cmluZzEwIiwidHJhbnNpdGlvbl9hdHRyIiwiYXR0ckludGVycG9sYXRlIiwiYXR0ckludGVycG9sYXRlTlMiLCJhdHRyVHdlZW5OUyIsImF0dHJUd2VlbiIsInRyYW5zaXRpb25fYXR0clR3ZWVuIiwiZGVsYXlGdW5jdGlvbiIsImRlbGF5Q29uc3RhbnQiLCJ0cmFuc2l0aW9uX2RlbGF5IiwiZHVyYXRpb25GdW5jdGlvbiIsImR1cmF0aW9uQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2R1cmF0aW9uIiwiZWFzZUNvbnN0YW50IiwidHJhbnNpdGlvbl9lYXNlIiwiZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nIiwidHJhbnNpdGlvbl9maWx0ZXIiLCJUcmFuc2l0aW9uIiwidHJhbnNpdGlvbl9tZXJnZSIsIm9uRnVuY3Rpb24iLCJvbjAiLCJvbjEiLCJzaXQiLCJ0cmFuc2l0aW9uX29uIiwicmVtb3ZlRnVuY3Rpb24iLCJ0cmFuc2l0aW9uX3JlbW92ZSIsInRyYW5zaXRpb25fc2VsZWN0IiwidHJhbnNpdGlvbl9zZWxlY3RBbGwiLCJpbmhlcml0IiwidHJhbnNpdGlvbl9zZWxlY3Rpb24iLCJzdHlsZU51bGwiLCJzdHlsZSIsInN0eWxlTWF5YmVSZW1vdmUiLCJsaXN0ZW5lcjAiLCJ0cmFuc2l0aW9uX3N0eWxlIiwic3R5bGVJbnRlcnBvbGF0ZSIsInN0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3N0eWxlVHdlZW4iLCJ0cmFuc2l0aW9uX3RleHQiLCJ0ZXh0SW50ZXJwb2xhdGUiLCJ0ZXh0VHdlZW4iLCJ0cmFuc2l0aW9uX3RleHRUd2VlbiIsInRyYW5zaXRpb25fdHJhbnNpdGlvbiIsImlkMCIsImlkMSIsIm5ld0lkIiwidHJhbnNpdGlvbl9lbmQiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FuY2VsIiwic2VsZWN0aW9uX3Byb3RvdHlwZSIsImN1YmljSW5PdXQiLCJkZWZhdWx0VGltaW5nIiwiZWFzZUN1YmljSW5PdXQiLCJzZWxlY3Rpb25fdHJhbnNpdGlvbiIsIlRyYW5zZm9ybSIsInBvaW50IiwibG9jYXRpb24iLCJxdWVyeVNlbGVjdG9yIiwiZWx0IiwiZml0dHMiLCJiaWdUYXJnZXQxIiwiYmlnVGFyZ2V0MiIsInNtYWxsVGFyZ2V0IiwicHVycG9zZSIsImhpY2siLCJnMSIsImcyIiwiZzMiLCJnNCIsImc1IiwiZzYiLCJqYWtvYiIsImFwcDEiLCJhcHAyIiwieW91ckFwcCIsImdyYWRpZW50IiwiZ2VzdGFsdCIsInByb3hpbWl0eSIsIm9mZnNldCIsInNpbWlsYXJpdHkiLCJteUNsYXNzIiwiY29tbW9uUmVnaW9uIiwic2ltcGxpY2l0eSIsImNvbmZpZyIsInZhbHVlcyIsImFsbCIsIlNWR1Rvb2wiLCJfX3B1YmxpY0ZpZWxkIiwiY29udGFpbmVyIiwiZWx0TmFtZSIsImluaXRpYWxBdHRyaWJ1dGVzIiwiZmluYWxBdHRyaWJ1dGVzIiwib3B0cyIsImQzLnNlbGVjdCIsImQzLmVhc2VMaW5lYXIiLCJyZWdleCIsImN4IiwiY3kiLCJwb2ludHMiLCJ3aWR0aCIsImhlaWdodCIsImludGVuc2l0eSIsImluaXRUaGVtZSIsImhhbmRsZURhcmtUaGVtZSIsImlzRGFyayIsImNsIiwiY29sb3JTY2hlbWUiLCJzdmdUb29sIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxLQUFPLEVBQUMsT0FBTyxNQUFNO0FBQUEsRUFBRTtBQUUzQixTQUFTQyxLQUFXO0FBQ2xCLFdBQVNDLElBQUksR0FBR0MsSUFBSSxVQUFVLFFBQVFDLElBQUksQ0FBQSxHQUFJQyxHQUFHSCxJQUFJQyxHQUFHLEVBQUVELEdBQUc7QUFDM0QsUUFBSSxFQUFFRyxJQUFJLFVBQVVILENBQUMsSUFBSSxPQUFRRyxLQUFLRCxLQUFNLFFBQVEsS0FBS0MsQ0FBQztBQUFHLFlBQU0sSUFBSSxNQUFNLG1CQUFtQkEsQ0FBQztBQUNqRyxJQUFBRCxFQUFFQyxDQUFDLElBQUk7RUFDUjtBQUNELFNBQU8sSUFBSUMsRUFBU0YsQ0FBQztBQUN2QjtBQUVBLFNBQVNFLEVBQVNGLEdBQUc7QUFDbkIsT0FBSyxJQUFJQTtBQUNYO0FBRUEsU0FBU0csR0FBZUMsR0FBV0MsR0FBTztBQUN4QyxTQUFPRCxFQUFVLE9BQU8sTUFBTSxPQUFPLEVBQUUsSUFBSSxTQUFTSCxHQUFHO0FBQ3JELFFBQUlLLElBQU8sSUFBSSxJQUFJTCxFQUFFLFFBQVEsR0FBRztBQUVoQyxRQURJLEtBQUssTUFBR0ssSUFBT0wsRUFBRSxNQUFNLElBQUksQ0FBQyxHQUFHQSxJQUFJQSxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQy9DQSxLQUFLLENBQUNJLEVBQU0sZUFBZUosQ0FBQztBQUFHLFlBQU0sSUFBSSxNQUFNLG1CQUFtQkEsQ0FBQztBQUN2RSxXQUFPLEVBQUMsTUFBTUEsR0FBRyxNQUFN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
