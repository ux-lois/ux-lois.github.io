var pn = Object.defineProperty;
var _n = (t, n, e) => n in t ? pn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var B = (t, n, e) => (_n(t, typeof n != "symbol" ? n + "" : n, e), e);
var gn = { value: () => {
} };
function Lt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new K(e);
}
function K(t) {
  this._ = t;
}
function yn(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
K.prototype = Lt.prototype = {
  constructor: K,
  on: function(t, n) {
    var e = this._, r = yn(t + "", e), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = wn(e[i], t.name)))
          return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if (i = (t = r[o]).type)
        e[i] = At(e[i], t.name, n);
      else if (n == null)
        for (i in e)
          e[i] = At(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n)
      t[e] = n[e].slice();
    return new K(t);
  },
  call: function(t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  }
};
function wn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function At(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = gn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var lt = "http://www.w3.org/1999/xhtml";
const kt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function rt(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), kt.hasOwnProperty(n) ? { space: kt[n], local: t } : t;
}
function xn(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === lt && n.documentElement.namespaceURI === lt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function vn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Pt(t) {
  var n = rt(t);
  return (n.local ? vn : xn)(n);
}
function mn() {
}
function gt(t) {
  return t == null ? mn : function() {
    return this.querySelector(t);
  };
}
function bn(t) {
  typeof t != "function" && (t = gt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = new Array(s), u, l, f = 0; f < s; ++f)
      (u = o[f]) && (l = t.call(u, u.__data__, f, o)) && ("__data__" in u && (l.__data__ = u.__data__), a[f] = l);
  return new y(r, this._parents);
}
function Nn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function An() {
  return [];
}
function Vt(t) {
  return t == null ? An : function() {
    return this.querySelectorAll(t);
  };
}
function kn(t) {
  return function() {
    return Nn(t.apply(this, arguments));
  };
}
function $n(t) {
  typeof t == "function" ? t = kn(t) : t = Vt(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], a = s.length, u, l = 0; l < a; ++l)
      (u = s[l]) && (r.push(t.call(u, u.__data__, l, s)), i.push(u));
  return new y(r, i);
}
function Yt(t) {
  return function() {
    return this.matches(t);
  };
}
function Bt(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Sn = Array.prototype.find;
function En(t) {
  return function() {
    return Sn.call(this.children, t);
  };
}
function Cn() {
  return this.firstElementChild;
}
function Tn(t) {
  return this.select(t == null ? Cn : En(typeof t == "function" ? t : Bt(t)));
}
var Mn = Array.prototype.filter;
function Rn() {
  return Array.from(this.children);
}
function In(t) {
  return function() {
    return Mn.call(this.children, t);
  };
}
function Fn(t) {
  return this.selectAll(t == null ? Rn : In(typeof t == "function" ? t : Bt(t)));
}
function qn(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
      (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
  return new y(r, this._parents);
}
function zt(t) {
  return new Array(t.length);
}
function Hn() {
  return new y(this._enter || this._groups.map(zt), this._parents);
}
function Q(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Q.prototype = {
  constructor: Q,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Dn(t) {
  return function() {
    return t;
  };
}
function Xn(t, n, e, r, i, o) {
  for (var s = 0, a, u = n.length, l = o.length; s < l; ++s)
    (a = n[s]) ? (a.__data__ = o[s], r[s] = a) : e[s] = new Q(t, o[s]);
  for (; s < u; ++s)
    (a = n[s]) && (i[s] = a);
}
function On(t, n, e, r, i, o, s) {
  var a, u, l = /* @__PURE__ */ new Map(), f = n.length, c = o.length, h = new Array(f), d;
  for (a = 0; a < f; ++a)
    (u = n[a]) && (h[a] = d = s.call(u, u.__data__, a, n) + "", l.has(d) ? i[a] = u : l.set(d, u));
  for (a = 0; a < c; ++a)
    d = s.call(t, o[a], a, o) + "", (u = l.get(d)) ? (r[a] = u, u.__data__ = o[a], l.delete(d)) : e[a] = new Q(t, o[a]);
  for (a = 0; a < f; ++a)
    (u = n[a]) && l.get(h[a]) === u && (i[a] = u);
}
function Ln(t) {
  return t.__data__;
}
function Pn(t, n) {
  if (!arguments.length)
    return Array.from(this, Ln);
  var e = n ? On : Xn, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Dn(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), u = new Array(o), l = 0; l < o; ++l) {
    var f = r[l], c = i[l], h = c.length, d = Vn(t.call(f, f && f.__data__, l, r)), p = d.length, _ = a[l] = new Array(p), k = s[l] = new Array(p), dn = u[l] = new Array(h);
    e(f, c, _, k, dn, d, n);
    for (var R = 0, Y = 0, bt, Nt; R < p; ++R)
      if (bt = _[R]) {
        for (R >= Y && (Y = R + 1); !(Nt = k[Y]) && ++Y < p; )
          ;
        bt._next = Nt || null;
      }
  }
  return s = new y(s, r), s._enter = a, s._exit = u, s;
}
function Vn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Yn() {
  return new y(this._exit || this._groups.map(zt), this._parents);
}
function Bn(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function zn(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, s = Math.min(i, o), a = new Array(i), u = 0; u < s; ++u)
    for (var l = e[u], f = r[u], c = l.length, h = a[u] = new Array(c), d, p = 0; p < c; ++p)
      (d = l[p] || f[p]) && (h[p] = d);
  for (; u < i; ++u)
    a[u] = e[u];
  return new y(a, this._parents);
}
function Gn() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Un(t) {
  t || (t = Kn);
  function n(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = e[o], a = s.length, u = i[o] = new Array(a), l, f = 0; f < a; ++f)
      (l = s[f]) && (u[f] = l);
    u.sort(n);
  }
  return new y(i, this._parents).order();
}
function Kn(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Wn() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Jn() {
  return Array.from(this);
}
function Qn() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function Zn() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function jn() {
  return !this.node();
}
function te(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function ne(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ee(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function re(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function ie(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function oe(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function se(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function ae(t, n) {
  var e = rt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? ee : ne : typeof n == "function" ? e.local ? se : oe : e.local ? ie : re)(e, n));
}
function Gt(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ue(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function le(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function fe(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function ce(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? ue : typeof n == "function" ? fe : le)(t, n, e ?? "")) : T(this.node(), t);
}
function T(t, n) {
  return t.style.getPropertyValue(n) || Gt(t).getComputedStyle(t, null).getPropertyValue(n);
}
function he(t) {
  return function() {
    delete this[t];
  };
}
function de(t, n) {
  return function() {
    this[t] = n;
  };
}
function pe(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function _e(t, n) {
  return arguments.length > 1 ? this.each((n == null ? he : typeof n == "function" ? pe : de)(t, n)) : this.node()[t];
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
    var n = this._names.indexOf(t);
    n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var n = this._names.indexOf(t);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Wt(t, n) {
  for (var e = yt(t), r = -1, i = n.length; ++r < i; )
    e.add(n[r]);
}
function Jt(t, n) {
  for (var e = yt(t), r = -1, i = n.length; ++r < i; )
    e.remove(n[r]);
}
function ge(t) {
  return function() {
    Wt(this, t);
  };
}
function ye(t) {
  return function() {
    Jt(this, t);
  };
}
function we(t, n) {
  return function() {
    (n.apply(this, arguments) ? Wt : Jt)(this, t);
  };
}
function xe(t, n) {
  var e = Ut(t + "");
  if (arguments.length < 2) {
    for (var r = yt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? we : n ? ge : ye)(e, n));
}
function ve() {
  this.textContent = "";
}
function me(t) {
  return function() {
    this.textContent = t;
  };
}
function be(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ne(t) {
  return arguments.length ? this.each(t == null ? ve : (typeof t == "function" ? be : me)(t)) : this.node().textContent;
}
function Ae() {
  this.innerHTML = "";
}
function ke(t) {
  return function() {
    this.innerHTML = t;
  };
}
function $e(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Se(t) {
  return arguments.length ? this.each(t == null ? Ae : (typeof t == "function" ? $e : ke)(t)) : this.node().innerHTML;
}
function Ee() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ce() {
  return this.each(Ee);
}
function Te() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Me() {
  return this.each(Te);
}
function Re(t) {
  var n = typeof t == "function" ? t : Pt(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Ie() {
  return null;
}
function Fe(t, n) {
  var e = typeof t == "function" ? t : Pt(t), r = n == null ? Ie : typeof n == "function" ? n : gt(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function qe() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function He() {
  return this.each(qe);
}
function De() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Xe() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Oe(t) {
  return this.select(t ? Xe : De);
}
function Le(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Pe(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function Ve(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Ye(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function Be(t, n, e) {
  return function() {
    var r = this.__on, i, o = Pe(n);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = e), i.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), i = { type: t.type, name: t.name, value: n, listener: o, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function ze(t, n, e) {
  var r = Ve(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var u = 0, l = a.length, f; u < l; ++u)
        for (i = 0, f = a[u]; i < o; ++i)
          if ((s = r[i]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = n ? Be : Ye, i = 0; i < o; ++i)
    this.each(a(r[i], n, e));
  return this;
}
function Qt(t, n, e) {
  var r = Gt(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Ge(t, n) {
  return function() {
    return Qt(this, t, n);
  };
}
function Ue(t, n) {
  return function() {
    return Qt(this, t, n.apply(this, arguments));
  };
}
function Ke(t, n) {
  return this.each((typeof n == "function" ? Ue : Ge)(t, n));
}
function* We() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Zt = [null];
function y(t, n) {
  this._groups = t, this._parents = n;
}
function P() {
  return new y([[document.documentElement]], Zt);
}
function Je() {
  return this;
}
y.prototype = P.prototype = {
  constructor: y,
  select: bn,
  selectAll: $n,
  selectChild: Tn,
  selectChildren: Fn,
  filter: qn,
  data: Pn,
  enter: Hn,
  exit: Yn,
  join: Bn,
  merge: zn,
  selection: Je,
  order: Gn,
  sort: Un,
  call: Wn,
  nodes: Jn,
  node: Qn,
  size: Zn,
  empty: jn,
  each: te,
  attr: ae,
  style: ce,
  property: _e,
  classed: xe,
  text: Ne,
  html: Se,
  raise: Ce,
  lower: Me,
  append: Re,
  insert: Fe,
  remove: He,
  clone: Oe,
  datum: Le,
  on: ze,
  dispatch: Ke,
  [Symbol.iterator]: We
};
function Qe(t) {
  return typeof t == "string" ? new y([[document.querySelector(t)]], [document.documentElement]) : new y([[t]], Zt);
}
function wt(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function jt(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n)
    e[r] = n[r];
  return e;
}
function V() {
}
var D = 0.7, Z = 1 / D, C = "\\s*([+-]?\\d+)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", v = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ze = /^#([0-9a-f]{3,8})$/, je = new RegExp(`^rgb\\(${C},${C},${C}\\)$`), tr = new RegExp(`^rgb\\(${v},${v},${v}\\)$`), nr = new RegExp(`^rgba\\(${C},${C},${C},${X}\\)$`), er = new RegExp(`^rgba\\(${v},${v},${v},${X}\\)$`), rr = new RegExp(`^hsl\\(${X},${v},${v}\\)$`), ir = new RegExp(`^hsla\\(${X},${v},${v},${X}\\)$`), $t = {
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
wt(V, O, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: St,
  // Deprecated! Use color.formatHex.
  formatHex: St,
  formatHex8: or,
  formatHsl: sr,
  formatRgb: Et,
  toString: Et
});
function St() {
  return this.rgb().formatHex();
}
function or() {
  return this.rgb().formatHex8();
}
function sr() {
  return tn(this).formatHsl();
}
function Et() {
  return this.rgb().formatRgb();
}
function O(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = Ze.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Ct(n) : e === 3 ? new g(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? z(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? z(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = je.exec(t)) ? new g(n[1], n[2], n[3], 1) : (n = tr.exec(t)) ? new g(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = nr.exec(t)) ? z(n[1], n[2], n[3], n[4]) : (n = er.exec(t)) ? z(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = rr.exec(t)) ? Rt(n[1], n[2] / 100, n[3] / 100, 1) : (n = ir.exec(t)) ? Rt(n[1], n[2] / 100, n[3] / 100, n[4]) : $t.hasOwnProperty(t) ? Ct($t[t]) : t === "transparent" ? new g(NaN, NaN, NaN, 0) : null;
}
function Ct(t) {
  return new g(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function z(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new g(t, n, e, r);
}
function ar(t) {
  return t instanceof V || (t = O(t)), t ? (t = t.rgb(), new g(t.r, t.g, t.b, t.opacity)) : new g();
}
function ft(t, n, e, r) {
  return arguments.length === 1 ? ar(t) : new g(t, n, e, r ?? 1);
}
function g(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
wt(g, ft, jt(V, {
  brighter(t) {
    return t = t == null ? Z : Math.pow(Z, t), new g(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? D : Math.pow(D, t), new g(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new g(S(this.r), S(this.g), S(this.b), j(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tt,
  // Deprecated! Use color.formatHex.
  formatHex: Tt,
  formatHex8: ur,
  formatRgb: Mt,
  toString: Mt
}));
function Tt() {
  return `#${$(this.r)}${$(this.g)}${$(this.b)}`;
}
function ur() {
  return `#${$(this.r)}${$(this.g)}${$(this.b)}${$((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mt() {
  const t = j(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${S(this.r)}, ${S(this.g)}, ${S(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function j(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function S(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function $(t) {
  return t = S(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Rt(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new w(t, n, e, r);
}
function tn(t) {
  if (t instanceof w)
    return new w(t.h, t.s, t.l, t.opacity);
  if (t instanceof V || (t = O(t)), !t)
    return new w();
  if (t instanceof w)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), s = NaN, a = o - i, u = (o + i) / 2;
  return a ? (n === o ? s = (e - r) / a + (e < r) * 6 : e === o ? s = (r - n) / a + 2 : s = (n - e) / a + 4, a /= u < 0.5 ? o + i : 2 - o - i, s *= 60) : a = u > 0 && u < 1 ? 0 : s, new w(s, a, u, t.opacity);
}
function lr(t, n, e, r) {
  return arguments.length === 1 ? tn(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
wt(w, lr, jt(V, {
  brighter(t) {
    return t = t == null ? Z : Math.pow(Z, t), new w(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? D : Math.pow(D, t), new w(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new g(
      st(t >= 240 ? t - 240 : t + 120, i, r),
      st(t, i, r),
      st(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new w(It(this.h), G(this.s), G(this.l), j(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = j(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${It(this.h)}, ${G(this.s) * 100}%, ${G(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function It(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function G(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function st(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const nn = (t) => () => t;
function fr(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function cr(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function hr(t) {
  return (t = +t) == 1 ? en : function(n, e) {
    return e - n ? cr(n, e, t) : nn(isNaN(n) ? e : n);
  };
}
function en(t, n) {
  var e = n - t;
  return e ? fr(t, e) : nn(isNaN(t) ? n : t);
}
const Ft = function t(n) {
  var e = hr(n);
  function r(i, o) {
    var s = e((i = ft(i)).r, (o = ft(o)).r), a = e(i.g, o.g), u = e(i.b, o.b), l = en(i.opacity, o.opacity);
    return function(f) {
      return i.r = s(f), i.g = a(f), i.b = u(f), i.opacity = l(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function A(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var ct = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, at = new RegExp(ct.source, "g");
function dr(t) {
  return function() {
    return t;
  };
}
function pr(t) {
  return function(n) {
    return t(n) + "";
  };
}
function _r(t, n) {
  var e = ct.lastIndex = at.lastIndex = 0, r, i, o, s = -1, a = [], u = [];
  for (t = t + "", n = n + ""; (r = ct.exec(t)) && (i = at.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, u.push({ i: s, x: A(r, i) })), e = at.lastIndex;
  return e < n.length && (o = n.slice(e), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? u[0] ? pr(u[0].x) : dr(n) : (n = u.length, function(l) {
    for (var f = 0, c; f < n; ++f)
      a[(c = u[f]).i] = c.x(l);
    return a.join("");
  });
}
var qt = 180 / Math.PI, ht = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function rn(t, n, e, r, i, o) {
  var s, a, u;
  return (s = Math.sqrt(t * t + n * n)) && (t /= s, n /= s), (u = t * e + n * r) && (e -= t * u, r -= n * u), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, u /= a), t * r < n * e && (t = -t, n = -n, u = -u, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * qt,
    skewX: Math.atan(u) * qt,
    scaleX: s,
    scaleY: a
  };
}
var U;
function gr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? ht : rn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function yr(t) {
  return t == null || (U || (U = document.createElementNS("http://www.w3.org/2000/svg", "g")), U.setAttribute("transform", t), !(t = U.transform.baseVal.consolidate())) ? ht : (t = t.matrix, rn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function on(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, f, c, h, d, p) {
    if (l !== c || f !== h) {
      var _ = d.push("translate(", null, n, null, e);
      p.push({ i: _ - 4, x: A(l, c) }, { i: _ - 2, x: A(f, h) });
    } else
      (c || h) && d.push("translate(" + c + n + h + e);
  }
  function s(l, f, c, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: A(l, f) })) : f && c.push(i(c) + "rotate(" + f + r);
  }
  function a(l, f, c, h) {
    l !== f ? h.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: A(l, f) }) : f && c.push(i(c) + "skewX(" + f + r);
  }
  function u(l, f, c, h, d, p) {
    if (l !== c || f !== h) {
      var _ = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: _ - 4, x: A(l, c) }, { i: _ - 2, x: A(f, h) });
    } else
      (c !== 1 || h !== 1) && d.push(i(d) + "scale(" + c + "," + h + ")");
  }
  return function(l, f) {
    var c = [], h = [];
    return l = t(l), f = t(f), o(l.translateX, l.translateY, f.translateX, f.translateY, c, h), s(l.rotate, f.rotate, c, h), a(l.skewX, f.skewX, c, h), u(l.scaleX, l.scaleY, f.scaleX, f.scaleY, c, h), l = f = null, function(d) {
      for (var p = -1, _ = h.length, k; ++p < _; )
        c[(k = h[p]).i] = k.x(d);
      return c.join("");
    };
  };
}
var wr = on(gr, "px, ", "px)", "deg)"), xr = on(yr, ", ", ")", ")"), M = 0, F = 0, I = 0, sn = 1e3, tt, q, nt = 0, E = 0, it = 0, L = typeof performance == "object" && performance.now ? performance : Date, an = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function xt() {
  return E || (an(vr), E = L.now() + it);
}
function vr() {
  E = 0;
}
function et() {
  this._call = this._time = this._next = null;
}
et.prototype = un.prototype = {
  constructor: et,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? xt() : +e) + (n == null ? 0 : +n), !this._next && q !== this && (q ? q._next = this : tt = this, q = this), this._call = t, this._time = e, dt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, dt());
  }
};
function un(t, n, e) {
  var r = new et();
  return r.restart(t, n, e), r;
}
function mr() {
  xt(), ++M;
  for (var t = tt, n; t; )
    (n = E - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --M;
}
function Ht() {
  E = (nt = L.now()) + it, M = F = 0;
  try {
    mr();
  } finally {
    M = 0, Nr(), E = 0;
  }
}
function br() {
  var t = L.now(), n = t - nt;
  n > sn && (it -= n, nt = t);
}
function Nr() {
  for (var t, n = tt, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : tt = e);
  q = t, dt(r);
}
function dt(t) {
  if (!M) {
    F && (F = clearTimeout(F));
    var n = t - E;
    n > 24 ? (t < 1 / 0 && (F = setTimeout(Ht, t - L.now() - it)), I && (I = clearInterval(I))) : (I || (nt = L.now(), I = setInterval(br, sn)), M = 1, an(Ht));
  }
}
function Dt(t, n, e) {
  var r = new et();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Ar = Lt("start", "end", "cancel", "interrupt"), kr = [], ln = 0, Xt = 1, pt = 2, W = 3, Ot = 4, _t = 5, J = 6;
function ot(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (e in s)
    return;
  $r(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ar,
    tween: kr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ln
  });
}
function vt(t, n) {
  var e = x(t, n);
  if (e.state > ln)
    throw new Error("too late; already scheduled");
  return e;
}
function m(t, n) {
  var e = x(t, n);
  if (e.state > W)
    throw new Error("too late; already running");
  return e;
}
function x(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function $r(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = un(o, 0, e.time);
  function o(l) {
    e.state = Xt, e.timer.restart(s, e.delay, e.time), e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var f, c, h, d;
    if (e.state !== Xt)
      return u();
    for (f in r)
      if (d = r[f], d.name === e.name) {
        if (d.state === W)
          return Dt(s);
        d.state === Ot ? (d.state = J, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[f]) : +f < n && (d.state = J, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[f]);
      }
    if (Dt(function() {
      e.state === W && (e.state = Ot, e.timer.restart(a, e.delay, e.time), a(l));
    }), e.state = pt, e.on.call("start", t, t.__data__, e.index, e.group), e.state === pt) {
      for (e.state = W, i = new Array(h = e.tween.length), f = 0, c = -1; f < h; ++f)
        (d = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (i[++c] = d);
      i.length = c + 1;
    }
  }
  function a(l) {
    for (var f = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = _t, 1), c = -1, h = i.length; ++c < h; )
      i[c].call(t, f);
    e.state === _t && (e.on.call("end", t, t.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = J, e.timer.stop(), delete r[n];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function Sr(t, n) {
  var e = t.__transition, r, i, o = !0, s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > pt && r.state < _t, r.state = J, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[s];
    }
    o && delete t.__transition;
  }
}
function Er(t) {
  return this.each(function() {
    Sr(this, t);
  });
}
function Cr(t, n) {
  var e, r;
  return function() {
    var i = m(this, t), o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === n) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Tr(t, n, e) {
  var r, i;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var o = m(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: n, value: e }, u = 0, l = i.length; u < l; ++u)
        if (i[u].name === n) {
          i[u] = a;
          break;
        }
      u === l && i.push(a);
    }
    o.tween = i;
  };
}
function Mr(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = x(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((n == null ? Cr : Tr)(e, t, n));
}
function mt(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = m(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return x(i, r).value[n];
  };
}
function fn(t, n) {
  var e;
  return (typeof n == "number" ? A : n instanceof O ? Ft : (e = O(n)) ? (n = e, Ft) : _r)(t, n);
}
function Rr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ir(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fr(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function qr(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Hr(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), u;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a)));
  };
}
function Dr(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), u;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a)));
  };
}
function Xr(t, n) {
  var e = rt(t), r = e === "transform" ? xr : fn;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Dr : Hr)(e, r, mt(this, "attr." + t, n)) : n == null ? (e.local ? Ir : Rr)(e) : (e.local ? qr : Fr)(e, r, n));
}
function Or(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Lr(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Pr(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Lr(t, o)), e;
  }
  return i._value = n, i;
}
function Vr(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Or(t, o)), e;
  }
  return i._value = n, i;
}
function Yr(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var r = rt(t);
  return this.tween(e, (r.local ? Pr : Vr)(r, n));
}
function Br(t, n) {
  return function() {
    vt(this, t).delay = +n.apply(this, arguments);
  };
}
function zr(t, n) {
  return n = +n, function() {
    vt(this, t).delay = n;
  };
}
function Gr(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Br : zr)(n, t)) : x(this.node(), n).delay;
}
function Ur(t, n) {
  return function() {
    m(this, t).duration = +n.apply(this, arguments);
  };
}
function Kr(t, n) {
  return n = +n, function() {
    m(this, t).duration = n;
  };
}
function Wr(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ur : Kr)(n, t)) : x(this.node(), n).duration;
}
function Jr(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    m(this, t).ease = n;
  };
}
function Qr(t) {
  var n = this._id;
  return arguments.length ? this.each(Jr(n, t)) : x(this.node(), n).ease;
}
function Zr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    m(this, t).ease = e;
  };
}
function jr(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Zr(this._id, t));
}
function ti(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
      (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
  return new N(r, this._parents, this._name, this._id);
}
function ni(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var u = n[a], l = e[a], f = u.length, c = s[a] = new Array(f), h, d = 0; d < f; ++d)
      (h = u[d] || l[d]) && (c[d] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new N(s, this._parents, this._name, this._id);
}
function ei(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function ri(t, n, e) {
  var r, i, o = ei(n) ? vt : m;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(n, e), s.on = i;
  };
}
function ii(t, n) {
  var e = this._id;
  return arguments.length < 2 ? x(this.node(), e).on.on(t) : this.each(ri(e, t, n));
}
function oi(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function si() {
  return this.on("end.remove", oi(this._id));
}
function ai(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = gt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], u = a.length, l = o[s] = new Array(u), f, c, h = 0; h < u; ++h)
      (f = a[h]) && (c = t.call(f, f.__data__, h, a)) && ("__data__" in f && (c.__data__ = f.__data__), l[h] = c, ot(l[h], n, e, h, l, x(f, e)));
  return new N(o, this._parents, n, e);
}
function ui(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Vt(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var u = r[a], l = u.length, f, c = 0; c < l; ++c)
      if (f = u[c]) {
        for (var h = t.call(f, f.__data__, c, u), d, p = x(f, e), _ = 0, k = h.length; _ < k; ++_)
          (d = h[_]) && ot(d, n, e, _, h, p);
        o.push(h), s.push(f);
      }
  return new N(o, s, n, e);
}
var li = P.prototype.constructor;
function fi() {
  return new li(this._groups, this._parents);
}
function ci(t, n) {
  var e, r, i;
  return function() {
    var o = T(this, t), s = (this.style.removeProperty(t), T(this, t));
    return o === s ? null : o === e && s === r ? i : i = n(e = o, r = s);
  };
}
function cn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function hi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = T(this, t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function di(t, n, e) {
  var r, i, o;
  return function() {
    var s = T(this, t), a = e(this), u = a + "";
    return a == null && (u = a = (this.style.removeProperty(t), T(this, t))), s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a));
  };
}
function pi(t, n) {
  var e, r, i, o = "style." + n, s = "end." + o, a;
  return function() {
    var u = m(this, t), l = u.on, f = u.value[o] == null ? a || (a = cn(n)) : void 0;
    (l !== e || i !== f) && (r = (e = l).copy()).on(s, i = f), u.on = r;
  };
}
function _i(t, n, e) {
  var r = (t += "") == "transform" ? wr : fn;
  return n == null ? this.styleTween(t, ci(t, r)).on("end.style." + t, cn(t)) : typeof n == "function" ? this.styleTween(t, di(t, r, mt(this, "style." + t, n))).each(pi(this._id, t)) : this.styleTween(t, hi(t, r, n), e).on("end.style." + t, null);
}
function gi(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function yi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && gi(t, s, e)), r;
  }
  return o._value = n, o;
}
function wi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (n == null)
    return this.tween(r, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(r, yi(t, n, e ?? ""));
}
function xi(t) {
  return function() {
    this.textContent = t;
  };
}
function vi(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function mi(t) {
  return this.tween("text", typeof t == "function" ? vi(mt(this, "text", t)) : xi(t == null ? "" : t + ""));
}
function bi(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ni(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && bi(i)), n;
  }
  return r._value = t, r;
}
function Ai(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, Ni(t));
}
function ki() {
  for (var t = this._name, n = this._id, e = hn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
      if (u = s[l]) {
        var f = x(u, n);
        ot(u, t, e, l, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new N(r, this._parents, t, e);
}
function $i() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, s) {
    var a = { value: s }, u = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var l = m(this, r), f = l.on;
      f !== t && (n = (t = f).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(u)), l.on = n;
    }), i === 0 && o();
  });
}
var Si = 0;
function N(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function hn() {
  return ++Si;
}
var b = P.prototype;
N.prototype = {
  constructor: N,
  select: ai,
  selectAll: ui,
  selectChild: b.selectChild,
  selectChildren: b.selectChildren,
  filter: ti,
  merge: ni,
  selection: fi,
  transition: ki,
  call: b.call,
  nodes: b.nodes,
  node: b.node,
  size: b.size,
  empty: b.empty,
  each: b.each,
  on: ii,
  attr: Xr,
  attrTween: Yr,
  style: _i,
  styleTween: wi,
  text: mi,
  textTween: Ai,
  remove: si,
  tween: Mr,
  delay: Gr,
  duration: Wr,
  ease: Qr,
  easeVarying: jr,
  end: $i,
  [Symbol.iterator]: b[Symbol.iterator]
};
const Ei = (t) => +t;
function Ci(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ti = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ci
};
function Mi(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Ri(t) {
  var n, e;
  t instanceof N ? (n = t._id, t = t._name) : (n = hn(), (e = Ti).time = xt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
      (u = s[l]) && ot(u, t, n, l, s, e || Mi(u, n));
  return new N(r, this._parents, t, n);
}
P.prototype.interrupt = Er;
P.prototype.transition = Ri;
function H(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
H.prototype = {
  constructor: H,
  scale: function(t) {
    return t === 1 ? this : new H(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new H(this.k, this.x + this.k * t, this.y + this.k * n);
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
H.prototype;
const ut = (t, n) => {
  const e = document.querySelector(t);
  if (e === null)
    throw new Error("Cannot find selector " + t);
  if (n !== void 0 && !(e instanceof n))
    throw new Error(`Selector ${t} not of type ${n}`);
  return e;
};
class Ii {
  constructor(n) {
    B(this, "delayCounter", 0);
    B(this, "delayIncrement", 100);
    B(this, "createForm", (n, e, r, i, o) => {
      const s = { duration: 2e3, delay: 1e3, ...o };
      this.useTranstion || (s.delay = 0, s.duration = 0);
      const a = Qe(n).append(e);
      for (const [l, f] of Object.entries(r))
        a.attr(l, f);
      const u = a.transition().duration(s.duration).delay(s.delay).ease(Ei);
      for (const [l, f] of Object.entries(i))
        u.attr(l, f);
    });
    this.useTranstion = n;
  }
  getDelay() {
    return this.delayCounter += this.delayIncrement, this.delayCounter;
  }
  initAllSvg() {
    this.initFitts();
  }
  initFitts() {
    if (!document.querySelector("svg.fitts"))
      return;
    const n = ut("svg.fitts g.big-target1", SVGGElement);
    this.createCircle(n, 40, 50, 35), this.createCircle(n, 40, 50, 25), this.createCircle(n, 40, 50, 15), this.createCircle(n, 40, 50, 5);
    const e = ut("svg.fitts g.big-target2", SVGGElement);
    this.createCircle(e, 40, 50, 35), this.createCircle(e, 40, 50, 25), this.createCircle(e, 40, 50, 15), this.createCircle(e, 40, 50, 5);
    const r = ut("svg.fitts g.small-target", SVGGElement);
    this.createCircle(r, 40, 50, 5);
  }
  createCircle(n, e, r, i) {
    return this.createForm(
      n,
      "circle",
      {
        cx: e,
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
}
const Fi = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, n = document.body.classList;
  t ? n.add("dark") : n.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const r = e.matches ? "dark" : "light";
    console.log("colorScheme: ", r), n.remove("dark"), n.remove("light"), r === "dark" ? n.add("dark") : n.add("light");
  });
};
Fi();
console.log("window.location: ", window.location);
const qi = window.location.pathname.match(/\/cards\//) !== null, Hi = new Ii(qi);
Hi.initAllSvg();
