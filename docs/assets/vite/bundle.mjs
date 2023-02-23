var _n = Object.defineProperty;
var yn = (t, n, e) => n in t ? _n(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var E = (t, n, e) => (yn(t, typeof n != "symbol" ? n + "" : n, e), e);
var wn = { value: () => {
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
function vn(t, n) {
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
    var e = this._, r = vn(t + "", e), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = xn(e[i], t.name)))
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
function xn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function At(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = wn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var lt = "http://www.w3.org/1999/xhtml";
const $t = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function it(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), $t.hasOwnProperty(n) ? { space: $t[n], local: t } : t;
}
function mn(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === lt && n.documentElement.namespaceURI === lt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function bn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Pt(t) {
  var n = it(t);
  return (n.local ? bn : mn)(n);
}
function Nn() {
}
function _t(t) {
  return t == null ? Nn : function() {
    return this.querySelector(t);
  };
}
function An(t) {
  typeof t != "function" && (t = _t(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = new Array(s), u, l, c = 0; c < s; ++c)
      (u = o[c]) && (l = t.call(u, u.__data__, c, o)) && ("__data__" in u && (l.__data__ = u.__data__), a[c] = l);
  return new y(r, this._parents);
}
function $n(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function kn() {
  return [];
}
function Vt(t) {
  return t == null ? kn : function() {
    return this.querySelectorAll(t);
  };
}
function Sn(t) {
  return function() {
    return $n(t.apply(this, arguments));
  };
}
function Cn(t) {
  typeof t == "function" ? t = Sn(t) : t = Vt(t);
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
function Gt(t) {
  return function(n) {
    return n.matches(t);
  };
}
var En = Array.prototype.find;
function Tn(t) {
  return function() {
    return En.call(this.children, t);
  };
}
function Mn() {
  return this.firstElementChild;
}
function Rn(t) {
  return this.select(t == null ? Mn : Tn(typeof t == "function" ? t : Gt(t)));
}
var In = Array.prototype.filter;
function Fn() {
  return Array.from(this.children);
}
function qn(t) {
  return function() {
    return In.call(this.children, t);
  };
}
function Hn(t) {
  return this.selectAll(t == null ? Fn : qn(typeof t == "function" ? t : Gt(t)));
}
function Dn(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
      (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
  return new y(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function Xn() {
  return new y(this._enter || this._groups.map(Bt), this._parents);
}
function Z(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
Z.prototype = {
  constructor: Z,
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
function On(t) {
  return function() {
    return t;
  };
}
function Ln(t, n, e, r, i, o) {
  for (var s = 0, a, u = n.length, l = o.length; s < l; ++s)
    (a = n[s]) ? (a.__data__ = o[s], r[s] = a) : e[s] = new Z(t, o[s]);
  for (; s < u; ++s)
    (a = n[s]) && (i[s] = a);
}
function Pn(t, n, e, r, i, o, s) {
  var a, u, l = /* @__PURE__ */ new Map(), c = n.length, f = o.length, h = new Array(c), d;
  for (a = 0; a < c; ++a)
    (u = n[a]) && (h[a] = d = s.call(u, u.__data__, a, n) + "", l.has(d) ? i[a] = u : l.set(d, u));
  for (a = 0; a < f; ++a)
    d = s.call(t, o[a], a, o) + "", (u = l.get(d)) ? (r[a] = u, u.__data__ = o[a], l.delete(d)) : e[a] = new Z(t, o[a]);
  for (a = 0; a < c; ++a)
    (u = n[a]) && l.get(h[a]) === u && (i[a] = u);
}
function Vn(t) {
  return t.__data__;
}
function Yn(t, n) {
  if (!arguments.length)
    return Array.from(this, Vn);
  var e = n ? Pn : Ln, r = this._parents, i = this._groups;
  typeof t != "function" && (t = On(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), u = new Array(o), l = 0; l < o; ++l) {
    var c = r[l], f = i[l], h = f.length, d = Gn(t.call(c, c && c.__data__, l, r)), p = d.length, g = a[l] = new Array(p), $ = s[l] = new Array(p), gn = u[l] = new Array(h);
    e(c, f, g, $, gn, d, n);
    for (var I = 0, G = 0, bt, Nt; I < p; ++I)
      if (bt = g[I]) {
        for (I >= G && (G = I + 1); !(Nt = $[G]) && ++G < p; )
          ;
        bt._next = Nt || null;
      }
  }
  return s = new y(s, r), s._enter = a, s._exit = u, s;
}
function Gn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Bn() {
  return new y(this._exit || this._groups.map(Bt), this._parents);
}
function zn(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function Un(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, s = Math.min(i, o), a = new Array(i), u = 0; u < s; ++u)
    for (var l = e[u], c = r[u], f = l.length, h = a[u] = new Array(f), d, p = 0; p < f; ++p)
      (d = l[p] || c[p]) && (h[p] = d);
  for (; u < i; ++u)
    a[u] = e[u];
  return new y(a, this._parents);
}
function Kn() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Wn(t) {
  t || (t = Jn);
  function n(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = e[o], a = s.length, u = i[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = s[c]) && (u[c] = l);
    u.sort(n);
  }
  return new y(i, this._parents).order();
}
function Jn(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Qn() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Zn() {
  return Array.from(this);
}
function jn() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function te() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function ne() {
  return !this.node();
}
function ee(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function re(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ie(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function oe(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function se(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ae(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function ue(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function le(t, n) {
  var e = it(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? ie : re : typeof n == "function" ? e.local ? ue : ae : e.local ? se : oe)(e, n));
}
function zt(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ce(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function fe(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function he(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function de(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? ce : typeof n == "function" ? he : fe)(t, n, e ?? "")) : M(this.node(), t);
}
function M(t, n) {
  return t.style.getPropertyValue(n) || zt(t).getComputedStyle(t, null).getPropertyValue(n);
}
function pe(t) {
  return function() {
    delete this[t];
  };
}
function ge(t, n) {
  return function() {
    this[t] = n;
  };
}
function _e(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function ye(t, n) {
  return arguments.length > 1 ? this.each((n == null ? pe : typeof n == "function" ? _e : ge)(t, n)) : this.node()[t];
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
function we(t) {
  return function() {
    Wt(this, t);
  };
}
function ve(t) {
  return function() {
    Jt(this, t);
  };
}
function xe(t, n) {
  return function() {
    (n.apply(this, arguments) ? Wt : Jt)(this, t);
  };
}
function me(t, n) {
  var e = Ut(t + "");
  if (arguments.length < 2) {
    for (var r = yt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? xe : n ? we : ve)(e, n));
}
function be() {
  this.textContent = "";
}
function Ne(t) {
  return function() {
    this.textContent = t;
  };
}
function Ae(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function $e(t) {
  return arguments.length ? this.each(t == null ? be : (typeof t == "function" ? Ae : Ne)(t)) : this.node().textContent;
}
function ke() {
  this.innerHTML = "";
}
function Se(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ce(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Ee(t) {
  return arguments.length ? this.each(t == null ? ke : (typeof t == "function" ? Ce : Se)(t)) : this.node().innerHTML;
}
function Te() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Me() {
  return this.each(Te);
}
function Re() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ie() {
  return this.each(Re);
}
function Fe(t) {
  var n = typeof t == "function" ? t : Pt(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function qe() {
  return null;
}
function He(t, n) {
  var e = typeof t == "function" ? t : Pt(t), r = n == null ? qe : typeof n == "function" ? n : _t(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function De() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Xe() {
  return this.each(De);
}
function Oe() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Le() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Pe(t) {
  return this.select(t ? Le : Oe);
}
function Ve(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ye(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function Ge(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function Be(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function ze(t, n, e) {
  return function() {
    var r = this.__on, i, o = Ye(n);
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
function Ue(t, n, e) {
  var r = Ge(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var u = 0, l = a.length, c; u < l; ++u)
        for (i = 0, c = a[u]; i < o; ++i)
          if ((s = r[i]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = n ? ze : Be, i = 0; i < o; ++i)
    this.each(a(r[i], n, e));
  return this;
}
function Qt(t, n, e) {
  var r = zt(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function Ke(t, n) {
  return function() {
    return Qt(this, t, n);
  };
}
function We(t, n) {
  return function() {
    return Qt(this, t, n.apply(this, arguments));
  };
}
function Je(t, n) {
  return this.each((typeof n == "function" ? We : Ke)(t, n));
}
function* Qe() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Zt = [null];
function y(t, n) {
  this._groups = t, this._parents = n;
}
function V() {
  return new y([[document.documentElement]], Zt);
}
function Ze() {
  return this;
}
y.prototype = V.prototype = {
  constructor: y,
  select: An,
  selectAll: Cn,
  selectChild: Rn,
  selectChildren: Hn,
  filter: Dn,
  data: Yn,
  enter: Xn,
  exit: Bn,
  join: zn,
  merge: Un,
  selection: Ze,
  order: Kn,
  sort: Wn,
  call: Qn,
  nodes: Zn,
  node: jn,
  size: te,
  empty: ne,
  each: ee,
  attr: le,
  style: de,
  property: ye,
  classed: me,
  text: $e,
  html: Ee,
  raise: Me,
  lower: Ie,
  append: Fe,
  insert: He,
  remove: Xe,
  clone: Pe,
  datum: Ve,
  on: Ue,
  dispatch: Je,
  [Symbol.iterator]: Qe
};
function je(t) {
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
function Y() {
}
var X = 0.7, j = 1 / X, T = "\\s*([+-]?\\d+)\\s*", O = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", tr = /^#([0-9a-f]{3,8})$/, nr = new RegExp(`^rgb\\(${T},${T},${T}\\)$`), er = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), rr = new RegExp(`^rgba\\(${T},${T},${T},${O}\\)$`), ir = new RegExp(`^rgba\\(${x},${x},${x},${O}\\)$`), or = new RegExp(`^hsl\\(${O},${x},${x}\\)$`), sr = new RegExp(`^hsla\\(${O},${x},${x},${O}\\)$`), kt = {
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
wt(Y, L, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: St,
  // Deprecated! Use color.formatHex.
  formatHex: St,
  formatHex8: ar,
  formatHsl: ur,
  formatRgb: Ct,
  toString: Ct
});
function St() {
  return this.rgb().formatHex();
}
function ar() {
  return this.rgb().formatHex8();
}
function ur() {
  return tn(this).formatHsl();
}
function Ct() {
  return this.rgb().formatRgb();
}
function L(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = tr.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Et(n) : e === 3 ? new _(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? B(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? B(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = nr.exec(t)) ? new _(n[1], n[2], n[3], 1) : (n = er.exec(t)) ? new _(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = rr.exec(t)) ? B(n[1], n[2], n[3], n[4]) : (n = ir.exec(t)) ? B(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = or.exec(t)) ? Rt(n[1], n[2] / 100, n[3] / 100, 1) : (n = sr.exec(t)) ? Rt(n[1], n[2] / 100, n[3] / 100, n[4]) : kt.hasOwnProperty(t) ? Et(kt[t]) : t === "transparent" ? new _(NaN, NaN, NaN, 0) : null;
}
function Et(t) {
  return new _(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function B(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new _(t, n, e, r);
}
function lr(t) {
  return t instanceof Y || (t = L(t)), t ? (t = t.rgb(), new _(t.r, t.g, t.b, t.opacity)) : new _();
}
function ct(t, n, e, r) {
  return arguments.length === 1 ? lr(t) : new _(t, n, e, r ?? 1);
}
function _(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
wt(_, ct, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new _(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? X : Math.pow(X, t), new _(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _(S(this.r), S(this.g), S(this.b), tt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tt,
  // Deprecated! Use color.formatHex.
  formatHex: Tt,
  formatHex8: cr,
  formatRgb: Mt,
  toString: Mt
}));
function Tt() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}`;
}
function cr() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}${k((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mt() {
  const t = tt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${S(this.r)}, ${S(this.g)}, ${S(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function tt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function S(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function k(t) {
  return t = S(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Rt(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new w(t, n, e, r);
}
function tn(t) {
  if (t instanceof w)
    return new w(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = L(t)), !t)
    return new w();
  if (t instanceof w)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), s = NaN, a = o - i, u = (o + i) / 2;
  return a ? (n === o ? s = (e - r) / a + (e < r) * 6 : e === o ? s = (r - n) / a + 2 : s = (n - e) / a + 4, a /= u < 0.5 ? o + i : 2 - o - i, s *= 60) : a = u > 0 && u < 1 ? 0 : s, new w(s, a, u, t.opacity);
}
function fr(t, n, e, r) {
  return arguments.length === 1 ? tn(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
wt(w, fr, jt(Y, {
  brighter(t) {
    return t = t == null ? j : Math.pow(j, t), new w(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? X : Math.pow(X, t), new w(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new _(
      at(t >= 240 ? t - 240 : t + 120, i, r),
      at(t, i, r),
      at(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new w(It(this.h), z(this.s), z(this.l), tt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = tt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${It(this.h)}, ${z(this.s) * 100}%, ${z(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function It(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function z(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function at(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const nn = (t) => () => t;
function hr(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function dr(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function pr(t) {
  return (t = +t) == 1 ? en : function(n, e) {
    return e - n ? dr(n, e, t) : nn(isNaN(n) ? e : n);
  };
}
function en(t, n) {
  var e = n - t;
  return e ? hr(t, e) : nn(isNaN(t) ? n : t);
}
const Ft = function t(n) {
  var e = pr(n);
  function r(i, o) {
    var s = e((i = ct(i)).r, (o = ct(o)).r), a = e(i.g, o.g), u = e(i.b, o.b), l = en(i.opacity, o.opacity);
    return function(c) {
      return i.r = s(c), i.g = a(c), i.b = u(c), i.opacity = l(c), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function A(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var ft = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ut = new RegExp(ft.source, "g");
function gr(t) {
  return function() {
    return t;
  };
}
function _r(t) {
  return function(n) {
    return t(n) + "";
  };
}
function yr(t, n) {
  var e = ft.lastIndex = ut.lastIndex = 0, r, i, o, s = -1, a = [], u = [];
  for (t = t + "", n = n + ""; (r = ft.exec(t)) && (i = ut.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, u.push({ i: s, x: A(r, i) })), e = ut.lastIndex;
  return e < n.length && (o = n.slice(e), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? u[0] ? _r(u[0].x) : gr(n) : (n = u.length, function(l) {
    for (var c = 0, f; c < n; ++c)
      a[(f = u[c]).i] = f.x(l);
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
function wr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? ht : rn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function vr(t) {
  return t == null || (U || (U = document.createElementNS("http://www.w3.org/2000/svg", "g")), U.setAttribute("transform", t), !(t = U.transform.baseVal.consolidate())) ? ht : (t = t.matrix, rn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function on(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var g = d.push("translate(", null, n, null, e);
      p.push({ i: g - 4, x: A(l, f) }, { i: g - 2, x: A(c, h) });
    } else
      (f || h) && d.push("translate(" + f + n + h + e);
  }
  function s(l, c, f, h) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: A(l, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function a(l, c, f, h) {
    l !== c ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: A(l, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function u(l, c, f, h, d, p) {
    if (l !== f || c !== h) {
      var g = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: A(l, f) }, { i: g - 2, x: A(c, h) });
    } else
      (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(l, c) {
    var f = [], h = [];
    return l = t(l), c = t(c), o(l.translateX, l.translateY, c.translateX, c.translateY, f, h), s(l.rotate, c.rotate, f, h), a(l.skewX, c.skewX, f, h), u(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, h), l = c = null, function(d) {
      for (var p = -1, g = h.length, $; ++p < g; )
        f[($ = h[p]).i] = $.x(d);
      return f.join("");
    };
  };
}
var xr = on(wr, "px, ", "px)", "deg)"), mr = on(vr, ", ", ")", ")"), R = 0, q = 0, F = 0, sn = 1e3, nt, H, et = 0, C = 0, ot = 0, P = typeof performance == "object" && performance.now ? performance : Date, an = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function vt() {
  return C || (an(br), C = P.now() + ot);
}
function br() {
  C = 0;
}
function rt() {
  this._call = this._time = this._next = null;
}
rt.prototype = un.prototype = {
  constructor: rt,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? vt() : +e) + (n == null ? 0 : +n), !this._next && H !== this && (H ? H._next = this : nt = this, H = this), this._call = t, this._time = e, dt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, dt());
  }
};
function un(t, n, e) {
  var r = new rt();
  return r.restart(t, n, e), r;
}
function Nr() {
  vt(), ++R;
  for (var t = nt, n; t; )
    (n = C - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --R;
}
function Ht() {
  C = (et = P.now()) + ot, R = q = 0;
  try {
    Nr();
  } finally {
    R = 0, $r(), C = 0;
  }
}
function Ar() {
  var t = P.now(), n = t - et;
  n > sn && (ot -= n, et = t);
}
function $r() {
  for (var t, n = nt, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : nt = e);
  H = t, dt(r);
}
function dt(t) {
  if (!R) {
    q && (q = clearTimeout(q));
    var n = t - C;
    n > 24 ? (t < 1 / 0 && (q = setTimeout(Ht, t - P.now() - ot)), F && (F = clearInterval(F))) : (F || (et = P.now(), F = setInterval(Ar, sn)), R = 1, an(Ht));
  }
}
function Dt(t, n, e) {
  var r = new rt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var kr = Lt("start", "end", "cancel", "interrupt"), Sr = [], ln = 0, Xt = 1, pt = 2, W = 3, Ot = 4, gt = 5, J = 6;
function st(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (e in s)
    return;
  Cr(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: kr,
    tween: Sr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ln
  });
}
function xt(t, n) {
  var e = v(t, n);
  if (e.state > ln)
    throw new Error("too late; already scheduled");
  return e;
}
function m(t, n) {
  var e = v(t, n);
  if (e.state > W)
    throw new Error("too late; already running");
  return e;
}
function v(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function Cr(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = un(o, 0, e.time);
  function o(l) {
    e.state = Xt, e.timer.restart(s, e.delay, e.time), e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var c, f, h, d;
    if (e.state !== Xt)
      return u();
    for (c in r)
      if (d = r[c], d.name === e.name) {
        if (d.state === W)
          return Dt(s);
        d.state === Ot ? (d.state = J, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[c]) : +c < n && (d.state = J, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[c]);
      }
    if (Dt(function() {
      e.state === W && (e.state = Ot, e.timer.restart(a, e.delay, e.time), a(l));
    }), e.state = pt, e.on.call("start", t, t.__data__, e.index, e.group), e.state === pt) {
      for (e.state = W, i = new Array(h = e.tween.length), c = 0, f = -1; c < h; ++c)
        (d = e.tween[c].value.call(t, t.__data__, e.index, e.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function a(l) {
    for (var c = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = gt, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, c);
    e.state === gt && (e.on.call("end", t, t.__data__, e.index, e.group), u());
  }
  function u() {
    e.state = J, e.timer.stop(), delete r[n];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function Er(t, n) {
  var e = t.__transition, r, i, o = !0, s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > pt && r.state < gt, r.state = J, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[s];
    }
    o && delete t.__transition;
  }
}
function Tr(t) {
  return this.each(function() {
    Er(this, t);
  });
}
function Mr(t, n) {
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
function Rr(t, n, e) {
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
function Ir(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = v(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((n == null ? Mr : Rr)(e, t, n));
}
function mt(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = m(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return v(i, r).value[n];
  };
}
function cn(t, n) {
  var e;
  return (typeof n == "number" ? A : n instanceof L ? Ft : (e = L(n)) ? (n = e, Ft) : yr)(t, n);
}
function Fr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function qr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hr(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Dr(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Xr(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), u;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a)));
  };
}
function Or(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), u;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), u = a + "", s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a)));
  };
}
function Lr(t, n) {
  var e = it(t), r = e === "transform" ? mr : cn;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Or : Xr)(e, r, mt(this, "attr." + t, n)) : n == null ? (e.local ? qr : Fr)(e) : (e.local ? Dr : Hr)(e, r, n));
}
function Pr(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Vr(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Yr(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Vr(t, o)), e;
  }
  return i._value = n, i;
}
function Gr(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Pr(t, o)), e;
  }
  return i._value = n, i;
}
function Br(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var r = it(t);
  return this.tween(e, (r.local ? Yr : Gr)(r, n));
}
function zr(t, n) {
  return function() {
    xt(this, t).delay = +n.apply(this, arguments);
  };
}
function Ur(t, n) {
  return n = +n, function() {
    xt(this, t).delay = n;
  };
}
function Kr(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? zr : Ur)(n, t)) : v(this.node(), n).delay;
}
function Wr(t, n) {
  return function() {
    m(this, t).duration = +n.apply(this, arguments);
  };
}
function Jr(t, n) {
  return n = +n, function() {
    m(this, t).duration = n;
  };
}
function Qr(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wr : Jr)(n, t)) : v(this.node(), n).duration;
}
function Zr(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    m(this, t).ease = n;
  };
}
function jr(t) {
  var n = this._id;
  return arguments.length ? this.each(Zr(n, t)) : v(this.node(), n).ease;
}
function ti(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    m(this, t).ease = e;
  };
}
function ni(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ti(this._id, t));
}
function ei(t) {
  typeof t != "function" && (t = Yt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], u, l = 0; l < s; ++l)
      (u = o[l]) && t.call(u, u.__data__, l, o) && a.push(u);
  return new N(r, this._parents, this._name, this._id);
}
function ri(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var u = n[a], l = e[a], c = u.length, f = s[a] = new Array(c), h, d = 0; d < c; ++d)
      (h = u[d] || l[d]) && (f[d] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new N(s, this._parents, this._name, this._id);
}
function ii(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function oi(t, n, e) {
  var r, i, o = ii(n) ? xt : m;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(n, e), s.on = i;
  };
}
function si(t, n) {
  var e = this._id;
  return arguments.length < 2 ? v(this.node(), e).on.on(t) : this.each(oi(e, t, n));
}
function ai(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function ui() {
  return this.on("end.remove", ai(this._id));
}
function li(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = _t(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], u = a.length, l = o[s] = new Array(u), c, f, h = 0; h < u; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), l[h] = f, st(l[h], n, e, h, l, v(c, e)));
  return new N(o, this._parents, n, e);
}
function ci(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Vt(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var u = r[a], l = u.length, c, f = 0; f < l; ++f)
      if (c = u[f]) {
        for (var h = t.call(c, c.__data__, f, u), d, p = v(c, e), g = 0, $ = h.length; g < $; ++g)
          (d = h[g]) && st(d, n, e, g, h, p);
        o.push(h), s.push(c);
      }
  return new N(o, s, n, e);
}
var fi = V.prototype.constructor;
function hi() {
  return new fi(this._groups, this._parents);
}
function di(t, n) {
  var e, r, i;
  return function() {
    var o = M(this, t), s = (this.style.removeProperty(t), M(this, t));
    return o === s ? null : o === e && s === r ? i : i = n(e = o, r = s);
  };
}
function fn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function pi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = M(this, t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function gi(t, n, e) {
  var r, i, o;
  return function() {
    var s = M(this, t), a = e(this), u = a + "";
    return a == null && (u = a = (this.style.removeProperty(t), M(this, t))), s === u ? null : s === r && u === i ? o : (i = u, o = n(r = s, a));
  };
}
function _i(t, n) {
  var e, r, i, o = "style." + n, s = "end." + o, a;
  return function() {
    var u = m(this, t), l = u.on, c = u.value[o] == null ? a || (a = fn(n)) : void 0;
    (l !== e || i !== c) && (r = (e = l).copy()).on(s, i = c), u.on = r;
  };
}
function yi(t, n, e) {
  var r = (t += "") == "transform" ? xr : cn;
  return n == null ? this.styleTween(t, di(t, r)).on("end.style." + t, fn(t)) : typeof n == "function" ? this.styleTween(t, gi(t, r, mt(this, "style." + t, n))).each(_i(this._id, t)) : this.styleTween(t, pi(t, r, n), e).on("end.style." + t, null);
}
function wi(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function vi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && wi(t, s, e)), r;
  }
  return o._value = n, o;
}
function xi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (n == null)
    return this.tween(r, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(r, vi(t, n, e ?? ""));
}
function mi(t) {
  return function() {
    this.textContent = t;
  };
}
function bi(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ni(t) {
  return this.tween("text", typeof t == "function" ? bi(mt(this, "text", t)) : mi(t == null ? "" : t + ""));
}
function Ai(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function $i(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Ai(i)), n;
  }
  return r._value = t, r;
}
function ki(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, $i(t));
}
function Si() {
  for (var t = this._name, n = this._id, e = hn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
      if (u = s[l]) {
        var c = v(u, n);
        st(u, t, e, l, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new N(r, this._parents, t, e);
}
function Ci() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, s) {
    var a = { value: s }, u = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var l = m(this, r), c = l.on;
      c !== t && (n = (t = c).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(u)), l.on = n;
    }), i === 0 && o();
  });
}
var Ei = 0;
function N(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function hn() {
  return ++Ei;
}
var b = V.prototype;
N.prototype = {
  constructor: N,
  select: li,
  selectAll: ci,
  selectChild: b.selectChild,
  selectChildren: b.selectChildren,
  filter: ei,
  merge: ri,
  selection: hi,
  transition: Si,
  call: b.call,
  nodes: b.nodes,
  node: b.node,
  size: b.size,
  empty: b.empty,
  each: b.each,
  on: si,
  attr: Lr,
  attrTween: Br,
  style: yi,
  styleTween: xi,
  text: Ni,
  textTween: ki,
  remove: ui,
  tween: Ir,
  delay: Kr,
  duration: Qr,
  ease: jr,
  easeVarying: ni,
  end: Ci,
  [Symbol.iterator]: b[Symbol.iterator]
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
function Ii(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Fi(t) {
  var n, e;
  t instanceof N ? (n = t._id, t = t._name) : (n = hn(), (e = Ri).time = vt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, u, l = 0; l < a; ++l)
      (u = s[l]) && st(u, t, n, l, s, e || Ii(u, n));
  return new N(r, this._parents, t, n);
}
V.prototype.interrupt = Tr;
V.prototype.transition = Fi;
function D(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
D.prototype = {
  constructor: D,
  scale: function(t) {
    return t === 1 ? this : new D(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new D(this.k, this.x + this.k * t, this.y + this.k * n);
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
D.prototype;
const Q = (t, n) => {
  const e = document.querySelector(t);
  if (e === null)
    throw new Error("Cannot find selector " + t);
  if (n !== void 0 && !(e instanceof n))
    throw new Error(`Selector ${t} not of type ${n}`);
  return e;
}, qi = (t) => {
  const n = Q("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const e = Q("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const r = Q("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Hi = (t) => {
  const n = Q("svg.purpose g.target", SVGGElement);
  t.createCircle(n, 150, 50, 40), t.createCircle(n, 150, 50, 30), t.createCircle(n, 150, 50, 20), t.createCircle(n, 150, 50, 10), t.createCircle(n, 150, 50, 1);
}, dn = {
  "02-fitts": [qi],
  "01-purpose": [Hi]
}, pn = /* @__PURE__ */ new Set();
for (const t of Object.values(dn))
  for (const n of t)
    pn.add(n);
const Di = pn;
class Xi {
  constructor() {
    E(this, "delayCounter", 0);
    E(this, "delayIncrement", 100);
    E(this, "useTransition", !1);
    E(this, "svgName");
    E(this, "createForm", (n, e, r, i, o) => {
      const s = { duration: 2e3, delay: 1e3, ...o };
      this.useTransition || (s.delay = 0, s.duration = 0);
      const a = je(n).append(e);
      for (const [l, c] of Object.entries(r))
        a.attr(l, c);
      const u = a.transition().duration(s.duration).delay(s.delay).ease(Ti);
      for (const [l, c] of Object.entries(i))
        u.attr(l, c);
    });
    this.initSvgName();
  }
  initSvgName() {
    const n = window.location.pathname.match(/^.*\/cards\/(.*)(.html)$/);
    if (console.log("regex: ", n), n instanceof Array && n.length > 2) {
      this.svgName = n[1], this.useTransition = !0;
      return;
    }
    this.useTransition = !1;
  }
  initSvg() {
    const n = this.svgName ? dn[this.svgName] : Di;
    for (const e of n)
      e(this);
  }
  getDelay() {
    return this.delayCounter += this.delayIncrement, this.delayCounter;
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
const Oi = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, n = document.body.classList;
  t ? n.add("dark") : n.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const r = e.matches ? "dark" : "light";
    console.log("colorScheme: ", r), n.remove("dark"), n.remove("light"), r === "dark" ? n.add("dark") : n.add("light");
  });
};
Oi();
const Li = new Xi();
Li.initSvg();
