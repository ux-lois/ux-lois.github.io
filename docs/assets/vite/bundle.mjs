var me = Object.defineProperty;
var _e = (t, e, n) => e in t ? me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var G = (t, e, n) => (_e(t, typeof e != "symbol" ? e + "" : e, n), n);
var ve = { value: () => {
} };
function Lt() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new J(n);
}
function J(t) {
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
J.prototype = Lt.prototype = {
  constructor: J,
  on: function(t, e) {
    var n = this._, r = we(t + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = xe(n[i], t.name)))
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
    return new J(t);
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
function xe(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ct(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ve, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ut = "http://www.w3.org/1999/xhtml";
const Nt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ut,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ot(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Nt.hasOwnProperty(e) ? { space: Nt[e], local: t } : t;
}
function be(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ut && e.documentElement.namespaceURI === ut ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Se(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xt(t) {
  var e = ot(t);
  return (e.local ? Se : be)(e);
}
function Ee() {
}
function mt(t) {
  return t == null ? Ee : function() {
    return this.querySelector(t);
  };
}
function Ce(t) {
  typeof t != "function" && (t = mt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = new Array(s), l, c, u = 0; u < s; ++u)
      (l = o[u]) && (c = t.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new _(r, this._parents);
}
function Ne(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ke() {
  return [];
}
function Ot(t) {
  return t == null ? ke : function() {
    return this.querySelectorAll(t);
  };
}
function Ae(t) {
  return function() {
    return Ne(t.apply(this, arguments));
  };
}
function $e(t) {
  typeof t == "function" ? t = Ae(t) : t = Ot(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), i.push(l));
  return new _(r, i);
}
function Yt(t) {
  return function() {
    return this.matches(t);
  };
}
function zt(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ge = Array.prototype.find;
function Re(t) {
  return function() {
    return Ge.call(this.children, t);
  };
}
function Te() {
  return this.firstElementChild;
}
function Ve(t) {
  return this.select(t == null ? Te : Re(typeof t == "function" ? t : zt(t)));
}
var Me = Array.prototype.filter;
function Fe() {
  return Array.from(this.children);
}
function Ie(t) {
  return function() {
    return Me.call(this.children, t);
  };
}
function De(t) {
  return this.selectAll(t == null ? Fe : Ie(typeof t == "function" ? t : zt(t)));
}
function Pe(t) {
  typeof t != "function" && (t = Yt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new _(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function qe() {
  return new _(this._enter || this._groups.map(Bt), this._parents);
}
function j(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
j.prototype = {
  constructor: j,
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
function He(t) {
  return function() {
    return t;
  };
}
function Le(t, e, n, r, i, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new j(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (i[s] = a);
}
function Xe(t, e, n, r, i, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), u = e.length, f = o.length, h = new Array(u), g;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (h[a] = g = s.call(l, l.__data__, a, e) + "", c.has(g) ? i[a] = l : c.set(g, l));
  for (a = 0; a < f; ++a)
    g = s.call(t, o[a], a, o) + "", (l = c.get(g)) ? (r[a] = l, l.__data__ = o[a], c.delete(g)) : n[a] = new j(t, o[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && c.get(h[a]) === l && (i[a] = l);
}
function Oe(t) {
  return t.__data__;
}
function Ye(t, e) {
  if (!arguments.length)
    return Array.from(this, Oe);
  var n = e ? Xe : Le, r = this._parents, i = this._groups;
  typeof t != "function" && (t = He(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = r[c], f = i[c], h = f.length, g = ze(t.call(u, u && u.__data__, c, r)), p = g.length, y = a[c] = new Array(p), N = s[c] = new Array(p), ye = l[c] = new Array(h);
    n(u, f, y, N, ye, g, e);
    for (var M = 0, z = 0, St, Et; M < p; ++M)
      if (St = y[M]) {
        for (M >= z && (z = M + 1); !(Et = N[z]) && ++z < p; )
          ;
        St._next = Et || null;
      }
  }
  return s = new _(s, r), s._enter = a, s._exit = l, s;
}
function ze(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Be() {
  return new _(this._exit || this._groups.map(Bt), this._parents);
}
function Ue(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Ke(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, s = Math.min(i, o), a = new Array(i), l = 0; l < s; ++l)
    for (var c = n[l], u = r[l], f = c.length, h = a[l] = new Array(f), g, p = 0; p < f; ++p)
      (g = c[p] || u[p]) && (h[p] = g);
  for (; l < i; ++l)
    a[l] = n[l];
  return new _(a, this._parents);
}
function We() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Je(t) {
  t || (t = Qe);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], a = s.length, l = i[o] = new Array(a), c, u = 0; u < a; ++u)
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new _(i, this._parents).order();
}
function Qe(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ze() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function je() {
  return Array.from(this);
}
function tn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function en() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function nn() {
  return !this.node();
}
function rn(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function on(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function sn(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function an(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ln(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function cn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function un(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function fn(t, e) {
  var n = ot(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? sn : on : typeof e == "function" ? n.local ? un : cn : n.local ? ln : an)(n, e));
}
function Ut(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function hn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gn(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function dn(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function pn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? hn : typeof e == "function" ? dn : gn)(t, e, n ?? "")) : T(this.node(), t);
}
function T(t, e) {
  return t.style.getPropertyValue(e) || Ut(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yn(t) {
  return function() {
    delete this[t];
  };
}
function mn(t, e) {
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
function vn(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yn : typeof e == "function" ? _n : mn)(t, e)) : this.node()[t];
}
function Kt(t) {
  return t.trim().split(/^|\s+/);
}
function _t(t) {
  return t.classList || new Wt(t);
}
function Wt(t) {
  this._node = t, this._names = Kt(t.getAttribute("class") || "");
}
Wt.prototype = {
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
function Jt(t, e) {
  for (var n = _t(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Qt(t, e) {
  for (var n = _t(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function wn(t) {
  return function() {
    Jt(this, t);
  };
}
function xn(t) {
  return function() {
    Qt(this, t);
  };
}
function bn(t, e) {
  return function() {
    (e.apply(this, arguments) ? Jt : Qt)(this, t);
  };
}
function Sn(t, e) {
  var n = Kt(t + "");
  if (arguments.length < 2) {
    for (var r = _t(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? bn : e ? wn : xn)(n, e));
}
function En() {
  this.textContent = "";
}
function Cn(t) {
  return function() {
    this.textContent = t;
  };
}
function Nn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function kn(t) {
  return arguments.length ? this.each(t == null ? En : (typeof t == "function" ? Nn : Cn)(t)) : this.node().textContent;
}
function An() {
  this.innerHTML = "";
}
function $n(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Gn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Rn(t) {
  return arguments.length ? this.each(t == null ? An : (typeof t == "function" ? Gn : $n)(t)) : this.node().innerHTML;
}
function Tn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vn() {
  return this.each(Tn);
}
function Mn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fn() {
  return this.each(Mn);
}
function In(t) {
  var e = typeof t == "function" ? t : Xt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Dn() {
  return null;
}
function Pn(t, e) {
  var n = typeof t == "function" ? t : Xt(t), r = e == null ? Dn : typeof e == "function" ? e : mt(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function qn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Hn() {
  return this.each(qn);
}
function Ln() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function On(t) {
  return this.select(t ? Xn : Ln);
}
function Yn(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function zn(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Bn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Un(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Kn(t, e, n) {
  return function() {
    var r = this.__on, i, o = zn(e);
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
function Wn(t, e, n) {
  var r = Bn(t + ""), i, o = r.length, s;
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
  for (a = e ? Kn : Un, i = 0; i < o; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Zt(t, e, n) {
  var r = Ut(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Jn(t, e) {
  return function() {
    return Zt(this, t, e);
  };
}
function Qn(t, e) {
  return function() {
    return Zt(this, t, e.apply(this, arguments));
  };
}
function Zn(t, e) {
  return this.each((typeof e == "function" ? Qn : Jn)(t, e));
}
function* jn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var jt = [null];
function _(t, e) {
  this._groups = t, this._parents = e;
}
function O() {
  return new _([[document.documentElement]], jt);
}
function tr() {
  return this;
}
_.prototype = O.prototype = {
  constructor: _,
  select: Ce,
  selectAll: $e,
  selectChild: Ve,
  selectChildren: De,
  filter: Pe,
  data: Ye,
  enter: qe,
  exit: Be,
  join: Ue,
  merge: Ke,
  selection: tr,
  order: We,
  sort: Je,
  call: Ze,
  nodes: je,
  node: tn,
  size: en,
  empty: nn,
  each: rn,
  attr: fn,
  style: pn,
  property: vn,
  classed: Sn,
  text: kn,
  html: Rn,
  raise: Vn,
  lower: Fn,
  append: In,
  insert: Pn,
  remove: Hn,
  clone: On,
  datum: Yn,
  on: Wn,
  dispatch: Zn,
  [Symbol.iterator]: jn
};
function er(t) {
  return typeof t == "string" ? new _([[document.querySelector(t)]], [document.documentElement]) : new _([[t]], jt);
}
function vt(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function te(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function Y() {
}
var q = 0.7, tt = 1 / q, R = "\\s*([+-]?\\d+)\\s*", H = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", nr = /^#([0-9a-f]{3,8})$/, rr = new RegExp(`^rgb\\(${R},${R},${R}\\)$`), ir = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), or = new RegExp(`^rgba\\(${R},${R},${R},${H}\\)$`), sr = new RegExp(`^rgba\\(${x},${x},${x},${H}\\)$`), ar = new RegExp(`^hsl\\(${H},${x},${x}\\)$`), lr = new RegExp(`^hsla\\(${H},${x},${x},${H}\\)$`), kt = {
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
vt(Y, L, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: At,
  // Deprecated! Use color.formatHex.
  formatHex: At,
  formatHex8: cr,
  formatHsl: ur,
  formatRgb: $t,
  toString: $t
});
function At() {
  return this.rgb().formatHex();
}
function cr() {
  return this.rgb().formatHex8();
}
function ur() {
  return ee(this).formatHsl();
}
function $t() {
  return this.rgb().formatRgb();
}
function L(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = nr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Gt(e) : n === 3 ? new m(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? B(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? B(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = rr.exec(t)) ? new m(e[1], e[2], e[3], 1) : (e = ir.exec(t)) ? new m(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = or.exec(t)) ? B(e[1], e[2], e[3], e[4]) : (e = sr.exec(t)) ? B(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ar.exec(t)) ? Vt(e[1], e[2] / 100, e[3] / 100, 1) : (e = lr.exec(t)) ? Vt(e[1], e[2] / 100, e[3] / 100, e[4]) : kt.hasOwnProperty(t) ? Gt(kt[t]) : t === "transparent" ? new m(NaN, NaN, NaN, 0) : null;
}
function Gt(t) {
  return new m(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function B(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new m(t, e, n, r);
}
function fr(t) {
  return t instanceof Y || (t = L(t)), t ? (t = t.rgb(), new m(t.r, t.g, t.b, t.opacity)) : new m();
}
function ft(t, e, n, r) {
  return arguments.length === 1 ? fr(t) : new m(t, e, n, r ?? 1);
}
function m(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
vt(m, ft, te(Y, {
  brighter(t) {
    return t = t == null ? tt : Math.pow(tt, t), new m(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? q : Math.pow(q, t), new m(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new m(A(this.r), A(this.g), A(this.b), et(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Rt,
  // Deprecated! Use color.formatHex.
  formatHex: Rt,
  formatHex8: hr,
  formatRgb: Tt,
  toString: Tt
}));
function Rt() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}`;
}
function hr() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}${k((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tt() {
  const t = et(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${A(this.r)}, ${A(this.g)}, ${A(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function et(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function A(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function k(t) {
  return t = A(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Vt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new v(t, e, n, r);
}
function ee(t) {
  if (t instanceof v)
    return new v(t.h, t.s, t.l, t.opacity);
  if (t instanceof Y || (t = L(t)), !t)
    return new v();
  if (t instanceof v)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), s = NaN, a = o - i, l = (o + i) / 2;
  return a ? (e === o ? s = (n - r) / a + (n < r) * 6 : n === o ? s = (r - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? o + i : 2 - o - i, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new v(s, a, l, t.opacity);
}
function gr(t, e, n, r) {
  return arguments.length === 1 ? ee(t) : new v(t, e, n, r ?? 1);
}
function v(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
vt(v, gr, te(Y, {
  brighter(t) {
    return t = t == null ? tt : Math.pow(tt, t), new v(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? q : Math.pow(q, t), new v(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new m(
      lt(t >= 240 ? t - 240 : t + 120, i, r),
      lt(t, i, r),
      lt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new v(Mt(this.h), U(this.s), U(this.l), et(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = et(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Mt(this.h)}, ${U(this.s) * 100}%, ${U(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Mt(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function U(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function lt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ne = (t) => () => t;
function dr(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function pr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function yr(t) {
  return (t = +t) == 1 ? re : function(e, n) {
    return n - e ? pr(e, n, t) : ne(isNaN(e) ? n : e);
  };
}
function re(t, e) {
  var n = e - t;
  return n ? dr(t, n) : ne(isNaN(t) ? e : t);
}
const Ft = function t(e) {
  var n = yr(e);
  function r(i, o) {
    var s = n((i = ft(i)).r, (o = ft(o)).r), a = n(i.g, o.g), l = n(i.b, o.b), c = re(i.opacity, o.opacity);
    return function(u) {
      return i.r = s(u), i.g = a(u), i.b = l(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function C(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var ht = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ct = new RegExp(ht.source, "g");
function mr(t) {
  return function() {
    return t;
  };
}
function _r(t) {
  return function(e) {
    return t(e) + "";
  };
}
function vr(t, e) {
  var n = ht.lastIndex = ct.lastIndex = 0, r, i, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = ht.exec(t)) && (i = ct.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, l.push({ i: s, x: C(r, i) })), n = ct.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? _r(l[0].x) : mr(e) : (e = l.length, function(c) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(c);
    return a.join("");
  });
}
var It = 180 / Math.PI, gt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ie(t, e, n, r, i, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * r) && (n -= t * l, r -= e * l), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, l /= a), t * r < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * It,
    skewX: Math.atan(l) * It,
    scaleX: s,
    scaleY: a
  };
}
var K;
function wr(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? gt : ie(e.a, e.b, e.c, e.d, e.e, e.f);
}
function xr(t) {
  return t == null || (K || (K = document.createElementNS("http://www.w3.org/2000/svg", "g")), K.setAttribute("transform", t), !(t = K.transform.baseVal.consolidate())) ? gt : (t = t.matrix, ie(t.a, t.b, t.c, t.d, t.e, t.f));
}
function oe(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, f, h, g, p) {
    if (c !== f || u !== h) {
      var y = g.push("translate(", null, e, null, n);
      p.push({ i: y - 4, x: C(c, f) }, { i: y - 2, x: C(u, h) });
    } else
      (f || h) && g.push("translate(" + f + e + h + n);
  }
  function s(c, u, f, h) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: C(c, u) })) : u && f.push(i(f) + "rotate(" + u + r);
  }
  function a(c, u, f, h) {
    c !== u ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: C(c, u) }) : u && f.push(i(f) + "skewX(" + u + r);
  }
  function l(c, u, f, h, g, p) {
    if (c !== f || u !== h) {
      var y = g.push(i(g) + "scale(", null, ",", null, ")");
      p.push({ i: y - 4, x: C(c, f) }, { i: y - 2, x: C(u, h) });
    } else
      (f !== 1 || h !== 1) && g.push(i(g) + "scale(" + f + "," + h + ")");
  }
  return function(c, u) {
    var f = [], h = [];
    return c = t(c), u = t(u), o(c.translateX, c.translateY, u.translateX, u.translateY, f, h), s(c.rotate, u.rotate, f, h), a(c.skewX, u.skewX, f, h), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, f, h), c = u = null, function(g) {
      for (var p = -1, y = h.length, N; ++p < y; )
        f[(N = h[p]).i] = N.x(g);
      return f.join("");
    };
  };
}
var br = oe(wr, "px, ", "px)", "deg)"), Sr = oe(xr, ", ", ")", ")"), V = 0, I = 0, F = 0, se = 1e3, nt, D, rt = 0, $ = 0, st = 0, X = typeof performance == "object" && performance.now ? performance : Date, ae = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function wt() {
  return $ || (ae(Er), $ = X.now() + st);
}
function Er() {
  $ = 0;
}
function it() {
  this._call = this._time = this._next = null;
}
it.prototype = le.prototype = {
  constructor: it,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? wt() : +n) + (e == null ? 0 : +e), !this._next && D !== this && (D ? D._next = this : nt = this, D = this), this._call = t, this._time = n, dt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, dt());
  }
};
function le(t, e, n) {
  var r = new it();
  return r.restart(t, e, n), r;
}
function Cr() {
  wt(), ++V;
  for (var t = nt, e; t; )
    (e = $ - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --V;
}
function Dt() {
  $ = (rt = X.now()) + st, V = I = 0;
  try {
    Cr();
  } finally {
    V = 0, kr(), $ = 0;
  }
}
function Nr() {
  var t = X.now(), e = t - rt;
  e > se && (st -= e, rt = t);
}
function kr() {
  for (var t, e = nt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : nt = n);
  D = t, dt(r);
}
function dt(t) {
  if (!V) {
    I && (I = clearTimeout(I));
    var e = t - $;
    e > 24 ? (t < 1 / 0 && (I = setTimeout(Dt, t - X.now() - st)), F && (F = clearInterval(F))) : (F || (rt = X.now(), F = setInterval(Nr, se)), V = 1, ae(Dt));
  }
}
function Pt(t, e, n) {
  var r = new it();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ar = Lt("start", "end", "cancel", "interrupt"), $r = [], ce = 0, qt = 1, pt = 2, Q = 3, Ht = 4, yt = 5, Z = 6;
function at(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (n in s)
    return;
  Gr(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ar,
    tween: $r,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ce
  });
}
function xt(t, e) {
  var n = w(t, e);
  if (n.state > ce)
    throw new Error("too late; already scheduled");
  return n;
}
function b(t, e) {
  var n = w(t, e);
  if (n.state > Q)
    throw new Error("too late; already running");
  return n;
}
function w(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Gr(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = le(o, 0, n.time);
  function o(c) {
    n.state = qt, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, f, h, g;
    if (n.state !== qt)
      return l();
    for (u in r)
      if (g = r[u], g.name === n.name) {
        if (g.state === Q)
          return Pt(s);
        g.state === Ht ? (g.state = Z, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[u]) : +u < e && (g.state = Z, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[u]);
      }
    if (Pt(function() {
      n.state === Q && (n.state = Ht, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = pt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === pt) {
      for (n.state = Q, i = new Array(h = n.tween.length), u = 0, f = -1; u < h; ++u)
        (g = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = g);
      i.length = f + 1;
    }
  }
  function a(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = yt, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, u);
    n.state === yt && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Z, n.timer.stop(), delete r[e];
    for (var c in r)
      return;
    delete t.__transition;
  }
}
function Rr(t, e) {
  var n = t.__transition, r, i, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > pt && r.state < yt, r.state = Z, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function Tr(t) {
  return this.each(function() {
    Rr(this, t);
  });
}
function Vr(t, e) {
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
function Fr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = w(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Vr : Mr)(n, t, e));
}
function bt(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = b(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return w(i, r).value[e];
  };
}
function ue(t, e) {
  var n;
  return (typeof e == "number" ? C : e instanceof L ? Ft : (n = L(e)) ? (e = n, Ft) : vr)(t, e);
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
function Pr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function qr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function Hr(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a)));
  };
}
function Lr(t, e, n) {
  var r, i, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a)));
  };
}
function Xr(t, e) {
  var n = ot(t), r = n === "transform" ? Sr : ue;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Lr : Hr)(n, r, bt(this, "attr." + t, e)) : e == null ? (n.local ? Dr : Ir)(n) : (n.local ? qr : Pr)(n, r, e));
}
function Or(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Yr(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function zr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Yr(t, o)), n;
  }
  return i._value = e, i;
}
function Br(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Or(t, o)), n;
  }
  return i._value = e, i;
}
function Ur(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = ot(t);
  return this.tween(n, (r.local ? zr : Br)(r, e));
}
function Kr(t, e) {
  return function() {
    xt(this, t).delay = +e.apply(this, arguments);
  };
}
function Wr(t, e) {
  return e = +e, function() {
    xt(this, t).delay = e;
  };
}
function Jr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Kr : Wr)(e, t)) : w(this.node(), e).delay;
}
function Qr(t, e) {
  return function() {
    b(this, t).duration = +e.apply(this, arguments);
  };
}
function Zr(t, e) {
  return e = +e, function() {
    b(this, t).duration = e;
  };
}
function jr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qr : Zr)(e, t)) : w(this.node(), e).duration;
}
function ti(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    b(this, t).ease = e;
  };
}
function ei(t) {
  var e = this._id;
  return arguments.length ? this.each(ti(e, t)) : w(this.node(), e).ease;
}
function ni(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    b(this, t).ease = n;
  };
}
function ri(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ni(this._id, t));
}
function ii(t) {
  typeof t != "function" && (t = Yt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = r[i] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new E(r, this._parents, this._name, this._id);
}
function oi(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], c = n[a], u = l.length, f = s[a] = new Array(u), h, g = 0; g < u; ++g)
      (h = l[g] || c[g]) && (f[g] = h);
  for (; a < r; ++a)
    s[a] = e[a];
  return new E(s, this._parents, this._name, this._id);
}
function si(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ai(t, e, n) {
  var r, i, o = si(e) ? xt : b;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(e, n), s.on = i;
  };
}
function li(t, e) {
  var n = this._id;
  return arguments.length < 2 ? w(this.node(), n).on.on(t) : this.each(ai(n, t, e));
}
function ci(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function ui() {
  return this.on("end.remove", ci(this._id));
}
function fi(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = mt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], l = a.length, c = o[s] = new Array(l), u, f, h = 0; h < l; ++h)
      (u = a[h]) && (f = t.call(u, u.__data__, h, a)) && ("__data__" in u && (f.__data__ = u.__data__), c[h] = f, at(c[h], e, n, h, c, w(u, n)));
  return new E(o, this._parents, e, n);
}
function hi(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ot(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var l = r[a], c = l.length, u, f = 0; f < c; ++f)
      if (u = l[f]) {
        for (var h = t.call(u, u.__data__, f, l), g, p = w(u, n), y = 0, N = h.length; y < N; ++y)
          (g = h[y]) && at(g, e, n, y, h, p);
        o.push(h), s.push(u);
      }
  return new E(o, s, e, n);
}
var gi = O.prototype.constructor;
function di() {
  return new gi(this._groups, this._parents);
}
function pi(t, e) {
  var n, r, i;
  return function() {
    var o = T(this, t), s = (this.style.removeProperty(t), T(this, t));
    return o === s ? null : o === n && s === r ? i : i = e(n = o, r = s);
  };
}
function fe(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function yi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var s = T(this, t);
    return s === i ? null : s === r ? o : o = e(r = s, n);
  };
}
function mi(t, e, n) {
  var r, i, o;
  return function() {
    var s = T(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), T(this, t))), s === l ? null : s === r && l === i ? o : (i = l, o = e(r = s, a));
  };
}
function _i(t, e) {
  var n, r, i, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = b(this, t), c = l.on, u = l.value[o] == null ? a || (a = fe(e)) : void 0;
    (c !== n || i !== u) && (r = (n = c).copy()).on(s, i = u), l.on = r;
  };
}
function vi(t, e, n) {
  var r = (t += "") == "transform" ? br : ue;
  return e == null ? this.styleTween(t, pi(t, r)).on("end.style." + t, fe(t)) : typeof e == "function" ? this.styleTween(t, mi(t, r, bt(this, "style." + t, e))).each(_i(this._id, t)) : this.styleTween(t, yi(t, r, e), n).on("end.style." + t, null);
}
function wi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function xi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && wi(t, s, n)), r;
  }
  return o._value = e, o;
}
function bi(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, xi(t, e, n ?? ""));
}
function Si(t) {
  return function() {
    this.textContent = t;
  };
}
function Ei(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ci(t) {
  return this.tween("text", typeof t == "function" ? Ei(bt(this, "text", t)) : Si(t == null ? "" : t + ""));
}
function Ni(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ki(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ni(i)), e;
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
  return this.tween(e, ki(t));
}
function $i() {
  for (var t = this._name, e = this._id, n = he(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var u = w(l, e);
        at(l, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new E(r, this._parents, t, n);
}
function Gi() {
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
var Ri = 0;
function E(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function he() {
  return ++Ri;
}
var S = O.prototype;
E.prototype = {
  constructor: E,
  select: fi,
  selectAll: hi,
  selectChild: S.selectChild,
  selectChildren: S.selectChildren,
  filter: ii,
  merge: oi,
  selection: di,
  transition: $i,
  call: S.call,
  nodes: S.nodes,
  node: S.node,
  size: S.size,
  empty: S.empty,
  each: S.each,
  on: li,
  attr: Xr,
  attrTween: Ur,
  style: vi,
  styleTween: bi,
  text: Ci,
  textTween: Ai,
  remove: ui,
  tween: Fr,
  delay: Jr,
  duration: jr,
  ease: ei,
  easeVarying: ri,
  end: Gi,
  [Symbol.iterator]: S[Symbol.iterator]
};
const Ti = (t) => +t;
function Vi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Mi = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Vi
};
function Fi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ii(t) {
  var e, n;
  t instanceof E ? (e = t._id, t = t._name) : (e = he(), (n = Mi).time = wt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && at(l, t, e, c, s, n || Fi(l, e));
  return new E(r, this._parents, t, e);
}
O.prototype.interrupt = Tr;
O.prototype.transition = Ii;
function P(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
P.prototype = {
  constructor: P,
  scale: function(t) {
    return t === 1 ? this : new P(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new P(this.k, this.x + this.k * t, this.y + this.k * e);
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
P.prototype;
const d = (t, e) => {
  const n = document.querySelector(t);
  if (n === null)
    throw new Error("Cannot find selector " + t);
  if (e !== void 0 && !(n instanceof e))
    throw new Error(`Selector ${t} not of type ${e}`);
  return n;
}, Di = (t) => {
  const e = d("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const n = d("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const r = d("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Pi = (t) => {
  const e = d("svg.purpose g.target", SVGGElement);
  t.createCircle(e, 150, 50, 40), t.createCircle(e, 150, 50, 30), t.createCircle(e, 150, 50, 20), t.createCircle(e, 150, 50, 10), t.createCircle(e, 150, 50, 1);
}, qi = (t) => {
  const e = d("svg.hick g.choice-01", SVGGElement);
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
  const n = d("svg.hick g.choice-02", SVGGElement);
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
  const r = d("svg.hick g.choice-03", SVGGElement);
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
  const i = d("svg.hick g.choice-04", SVGGElement);
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
  const o = d("svg.hick g.choice-05", SVGGElement);
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
  const s = d("svg.hick g.choice-06", SVGGElement);
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
}, Hi = (t) => {
  const e = d("svg.jakob g.app-1", SVGGElement);
  t.createCircle(e, 40, 50, 35);
  const n = d("svg.jakob g.app-2", SVGGElement);
  t.createCircle(n, 40, 50, 35);
  const r = d("svg.jakob g.your-app", SVGGElement);
  t.createCircle(r, 40, 50, 35);
}, Li = (t) => {
  const e = d("svg.gradient g", SVGGElement);
  t.createRect(e, 5, 30, 40, 40, 1), t.createRect(e, 50, 30, 40, 40, 2), t.createRect(e, 95, 30, 40, 40, 3), t.createRect(e, 140, 30, 40, 40, 4), t.createRect(e, 185, 30, 40, 40, 5), t.createRect(e, 230, 30, 40, 40, 6);
}, Xi = (t) => {
  const e = d("svg.gestalt g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Oi = (t) => {
  const e = d("svg.proximity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? 8 : 0;
      t.createCircle(e, n * 20 + 100 + i, r * 20 + 20 - i, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
    }
}, Yi = (t) => {
  const e = d("svg.similarity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, zi = (t) => {
  const e = d("svg.commonRegion g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Bi = (t) => {
  const e = d("svg.simplicity g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2), t.createRect(e, 100 - 8, 12, 97, 77, 2);
}, Ui = (t) => {
  const e = d("svg.miller g", SVGGElement);
  t.createCircle(e, 130, 20, 5, { class: "full" }), t.createCircle(e, 150, 20, 5, { class: "full" }), t.createCircle(e, 170, 20, 5, { class: "full" }), t.createCircle(e, 170, 40, 5, { class: "full" }), t.createCircle(e, 170, 60, 5, { class: "full" }), t.createCircle(e, 170, 80, 5, { class: "full" });
}, Ki = (t) => {
  const e = d("svg.tesler g", SVGGElement);
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 20, 5, {
      class: n >= 3 ? "empty" : "full"
    });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 50, 5, { class: n % 2 ? "empty" : "full" });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 80, 5, { class: n < 3 ? "empty" : "full" });
}, Wi = (t) => {
  const e = d("svg.postel g", SVGGElement);
  t.createCircle(e, 80, 50, 35, { class: "full" }), t.createCircle(e, 220, 50, 35, { class: "empty" });
}, Ji = (t) => {
  const e = d("svg.zeigarnik g", SVGGElement);
  for (let n = 1; n < 5; n++)
    t.createRect(e, 50, n * 15, 200, 10, 6, "emptyrect");
  t.createRect(e, 50, 5 * 15, 150, 10, 6, "fullrect");
}, Qi = (t) => {
  const e = d("svg.vonRestorff g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n === 2 && r === 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, W = "20,10, 20,20 10,30, 20,40 20,50, 10,50 10,60 20,60 20,70 20,80 10,90", Zi = (t) => {
  const e = d(".symetrie svg g", SVGGElement);
  e.innerHTML = `
<g class="p1" transform="translate(60)"></g>
<g class="p2" transform="translate(80)"></g>
<g class="p3" transform="translate(180)"></g>
<g class="p4" transform="translate(230) scale(-1, 1)"></g>
`;
  const n = d(".symetrie svg g.p1", SVGGElement);
  t.createPolyline(n, W, "empty");
  const r = d(".symetrie svg g.p2", SVGGElement);
  t.createPolyline(r, W, "empty");
  const i = d(".symetrie svg g.p3", SVGGElement);
  t.createPolyline(i, W, "empty");
  const o = d(".symetrie svg g.p4", SVGGElement);
  t.createPolyline(o, W, "empty");
}, ji = (t) => {
  const e = d(".serialPosition svg g", SVGGElement);
  for (let n = 0; n < 7; n++) {
    const r = n === 0 || n === 6 ? "full" : "empty";
    t.createCircle(e, n * 40 + 30, 50, 20, {
      class: r,
      delay: 0,
      duration: 300
    });
  }
}, to = (t) => {
  const e = d(".pareto svg g", SVGGElement);
  t.createRect(e, 50, 40, 50, 20, 6, "empty"), t.createRect(e, 150, 10, 100, 80, 6, "empty");
}, eo = (t) => {
  const e = d(".peakEnd svg g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n === 1 && r === 1 || n === 4 && r === 3 ? "empty" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i
      });
    }
}, ge = {
  fitts: [Di],
  purpose: [Pi],
  hick: [qi],
  jakob: [Hi],
  gradient: [Li],
  gestalt: [Xi],
  proximity: [Oi],
  similarity: [Yi],
  commonRegion: [zi],
  simplicity: [Bi],
  miller: [Ui],
  tesler: [Ki],
  postel: [Wi],
  zeigarnik: [Ji],
  vonRestorff: [Qi],
  symetrie: [Zi],
  serialPosition: [ji],
  pareto: [to],
  peakEnd: [eo]
}, de = /* @__PURE__ */ new Set();
for (const t of Object.values(ge))
  for (const e of t)
    de.add(e);
const no = [...de];
class ro {
  constructor() {
    G(this, "delayCounter", 0);
    G(this, "delayIncrement", 100);
    G(this, "useTransition", !1);
    G(this, "svgName");
    G(this, "createForm", (e, n, r, i, o) => {
      const s = {
        duration: 2e3,
        delay: 1e3,
        class: "",
        ...o
      };
      this.useTransition || (s.delay = 0, s.duration = 0);
      const a = er(e).append(n);
      for (const [c, u] of Object.entries(r))
        a.attr(c, u);
      s.class && a.attr("class", s.class);
      const l = a.transition().duration(s.duration).delay(s.delay).ease(Ti);
      for (const [c, u] of Object.entries(i))
        l.attr(c, u);
    });
    this.initSvgName();
  }
  initSvgName() {
    const e = window.uxlawImageName, n = window.uxlawClassName, r = e === "default" ? n : e;
    if (r) {
      this.svgName = r, this.useTransition = !0;
      return;
    }
    this.useTransition = !1;
  }
  initSvg() {
    const e = this.svgName ? ge[this.svgName] : no;
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
  createPolyline(e, n, r = "full") {
    return this.createForm(
      e,
      "polyline",
      { points: "" },
      { points: n },
      {
        duration: 300,
        delay: this.getDelay(),
        class: r
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
const io = () => {
  oo(), document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  ), document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 0%, 25%, 0.1)"
  ), so();
}, oo = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
window.toggleUglyTheme = () => {
  let t = localStorage.getItem("theme");
  t = t !== "ugly" ? "ugly" : "default", localStorage.setItem("theme", t), console.log("update theme to " + t), document.body.classList.remove("ugly"), document.body.classList.remove("default"), document.body.classList.add(t), pe();
};
const so = () => {
  let t = localStorage.getItem("theme");
  t = t !== "ugly" ? "default" : "ugly", document.body.classList.add(t), pe();
}, pe = () => {
  let t = localStorage.getItem("theme");
  const e = t === "ugly" ? "Remettre l'esthétique" : "Enlever l'esthétique", n = document.querySelector("button.toggle-theme");
  n && (n.innerHTML = e);
  const r = d("header div.ugly-theme");
  r.innerHTML = t !== "ugly" ? "" : `
<button onClick="window.toggleUglyTheme()"> 
  Remettre l'esthétique
</button>
    `;
};
io();
const ao = new ro();
ao.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9ncmFkaWVudC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL2dlc3RhbHQudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9wcm94aW1pdHkudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zaW1pbGFyaXR5LnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvY29tbW9uUmVnaW9uLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc2ltcGxpY2l0eS50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL21pbGxlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Rlc2xlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Bvc3RlbC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3plaWdhcm5pay50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3ZvblJlc3RvcmZmLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc3ltZXRyaWUudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zZXJpYWxQb3NpdGlvbi50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3BhcmV0by50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3BlYWtFbmQudHMiLCIuLi8uLi8uLi9zcmMvc3ZnQ29uZmlnLnRzIiwiLi4vLi4vLi4vc3JjL1NWR1Rvb2wudHMiLCIuLi8uLi8uLi9zcmMvdGhlbWUudHMiLCIuLi8uLi8uLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IHt2YWx1ZTogKCkgPT4ge319O1xuXG5mdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBfID0ge30sIHQ7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoISh0ID0gYXJndW1lbnRzW2ldICsgXCJcIikgfHwgKHQgaW4gXykgfHwgL1tcXHMuXS8udGVzdCh0KSkgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0eXBlOiBcIiArIHQpO1xuICAgIF9bdF0gPSBbXTtcbiAgfVxuICByZXR1cm4gbmV3IERpc3BhdGNoKF8pO1xufVxuXG5mdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gIHRoaXMuXyA9IF87XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIGlmICh0ICYmICF0eXBlcy5oYXNPd25Qcm9wZXJ0eSh0KSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHQpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5EaXNwYXRjaC5wcm90b3R5cGUgPSBkaXNwYXRjaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgb246IGZ1bmN0aW9uKHR5cGVuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBfID0gdGhpcy5fLFxuICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgdCxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAvLyBJZiBubyBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZXR1cm4gdGhlIGNhbGxiYWNrIG9mIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSBudWxsIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJlbW92ZSBjYWxsYmFja3Mgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgY2FsbGJhY2s6IFwiICsgY2FsbGJhY2spO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgY2FsbGJhY2spO1xuICAgICAgZWxzZSBpZiAoY2FsbGJhY2sgPT0gbnVsbCkgZm9yICh0IGluIF8pIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3B5ID0ge30sIF8gPSB0aGlzLl87XG4gICAgZm9yICh2YXIgdCBpbiBfKSBjb3B5W3RdID0gX1t0XS5zbGljZSgpO1xuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uKHR5cGUsIHRoYXQpIHtcbiAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbih0eXBlLCB0aGF0LCBhcmdzKSB7XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoLCBjOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKChjID0gdHlwZVtpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldCh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgdHlwZVtpXSA9IG5vb3AsIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpLmNvbmNhdCh0eXBlLnNsaWNlKGkgKyAxKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHR5cGUucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IGNhbGxiYWNrfSk7XG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaDtcbiIsImV4cG9ydCB2YXIgeGh0bWwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcbiIsImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4vbmFtZXNwYWNlLmpzXCI7XG5pbXBvcnQge3hodG1sfSBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0b3JJbmhlcml0KG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCxcbiAgICAgICAgdXJpID0gdGhpcy5uYW1lc3BhY2VVUkk7XG4gICAgcmV0dXJuIHVyaSA9PT0geGh0bWwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0geGh0bWxcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0b3JGaXhlZChmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59XG4iLCJmdW5jdGlvbiBub25lKCkge31cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBub25lIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCIvLyBHaXZlbiBzb21ldGhpbmcgYXJyYXkgbGlrZSAob3IgbnVsbCksIHJldHVybnMgc29tZXRoaW5nIHRoYXQgaXMgc3RyaWN0bHkgYW5cbi8vIGFycmF5LiBUaGlzIGlzIHVzZWQgdG8gZW5zdXJlIHRoYXQgYXJyYXktbGlrZSBvYmplY3RzIHBhc3NlZCB0byBkMy5zZWxlY3RBbGxcbi8vIG9yIHNlbGVjdGlvbi5zZWxlY3RBbGwgYXJlIGNvbnZlcnRlZCBpbnRvIHByb3BlciBhcnJheXMgd2hlbiBjcmVhdGluZyBhXG4vLyBzZWxlY3Rpb247IHdlIGRvbuKAmXQgZXZlciB3YW50IHRvIGNyZWF0ZSBhIHNlbGVjdGlvbiBiYWNrZWQgYnkgYSBsaXZlXG4vLyBIVE1MQ29sbGVjdGlvbiBvciBOb2RlTGlzdC4gSG93ZXZlciwgbm90ZSB0aGF0IHNlbGVjdGlvbi5zZWxlY3RBbGwgd2lsbCB1c2UgYVxuLy8gc3RhdGljIE5vZGVMaXN0IGFzIGEgZ3JvdXAsIHNpbmNlIGl0IHNhZmVseSBkZXJpdmVkIGZyb20gcXVlcnlTZWxlY3RvckFsbC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbCA/IFtdIDogQXJyYXkuaXNBcnJheSh4KSA/IHggOiBBcnJheS5mcm9tKHgpO1xufVxuIiwiZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgYXJyYXkgZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsLmpzXCI7XG5cbmZ1bmN0aW9uIGFycmF5QWxsKHNlbGVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFycmF5KHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IGFycmF5QWxsKHNlbGVjdCk7XG4gIGVsc2Ugc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTWF0Y2hlcihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuXG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbmQgPSBBcnJheS5wcm90b3R5cGUuZmluZDtcblxuZnVuY3Rpb24gY2hpbGRGaW5kKG1hdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmluZC5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hpbGRGaXJzdCgpIHtcbiAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChtYXRjaCA9PSBudWxsID8gY2hpbGRGaXJzdFxuICAgICAgOiBjaGlsZEZpbmQodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmlsdGVyID0gQXJyYXkucHJvdG90eXBlLmZpbHRlcjtcblxuZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkZpbHRlcihtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsKG1hdGNoID09IG51bGwgPyBjaGlsZHJlblxuICAgICAgOiBjaGlsZHJlbkZpbHRlcih0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2hlciBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHVwZGF0ZS5sZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtFbnRlck5vZGV9IGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4uL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGJpbmRJbmRleChwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG5vZGUsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZml0IGludG8gdXBkYXRlLlxuICAvLyBQdXQgYW55IG51bGwgbm9kZXMgaW50byBlbnRlci5cbiAgLy8gUHV0IGFueSByZW1haW5pbmcgZGF0YSBpbnRvIGVudGVyLlxuICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGRvbuKAmXQgZml0IGludG8gZXhpdC5cbiAgZm9yICg7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRLZXkocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSwga2V5KSB7XG4gIHZhciBpLFxuICAgICAgbm9kZSxcbiAgICAgIG5vZGVCeUtleVZhbHVlID0gbmV3IE1hcCxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAga2V5VmFsdWVzID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKSxcbiAgICAgIGtleVZhbHVlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBub2RlLlxuICAvLyBJZiBtdWx0aXBsZSBub2RlcyBoYXZlIHRoZSBzYW1lIGtleSwgdGhlIGR1cGxpY2F0ZXMgYXJlIGFkZGVkIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAga2V5VmFsdWVzW2ldID0ga2V5VmFsdWUgPSBrZXkuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkgKyBcIlwiO1xuICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHtcbiAgICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBkYXR1bS5cbiAgLy8gSWYgdGhlcmUgYSBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSwgam9pbiBhbmQgYWRkIGl0IHRvIHVwZGF0ZS5cbiAgLy8gSWYgdGhlcmUgaXMgbm90IChvciB0aGUga2V5IGlzIGEgZHVwbGljYXRlKSwgYWRkIGl0IHRvIGVudGVyLlxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAga2V5VmFsdWUgPSBrZXkuY2FsbChwYXJlbnQsIGRhdGFbaV0sIGksIGRhdGEpICsgXCJcIjtcbiAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZSkpIHtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIG5vZGVCeUtleVZhbHVlLmRlbGV0ZShrZXlWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBhbnkgcmVtYWluaW5nIG5vZGVzIHRoYXQgd2VyZSBub3QgYm91bmQgdG8gZGF0YSB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAobm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlc1tpXSkgPT09IG5vZGUpKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0dW0obm9kZSkge1xuICByZXR1cm4gbm9kZS5fX2RhdGFfXztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBBcnJheS5mcm9tKHRoaXMsIGRhdHVtKTtcblxuICB2YXIgYmluZCA9IGtleSA/IGJpbmRLZXkgOiBiaW5kSW5kZXgsXG4gICAgICBwYXJlbnRzID0gdGhpcy5fcGFyZW50cyxcbiAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHZhbHVlID0gY29uc3RhbnQodmFsdWUpO1xuXG4gIGZvciAodmFyIG0gPSBncm91cHMubGVuZ3RoLCB1cGRhdGUgPSBuZXcgQXJyYXkobSksIGVudGVyID0gbmV3IEFycmF5KG0pLCBleGl0ID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2pdLFxuICAgICAgICBncm91cCA9IGdyb3Vwc1tqXSxcbiAgICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICAgIGRhdGEgPSBhcnJheWxpa2UodmFsdWUuY2FsbChwYXJlbnQsIHBhcmVudCAmJiBwYXJlbnQuX19kYXRhX18sIGosIHBhcmVudHMpKSxcbiAgICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAgICBlbnRlckdyb3VwID0gZW50ZXJbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIHVwZGF0ZUdyb3VwID0gdXBkYXRlW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICBleGl0R3JvdXAgPSBleGl0W2pdID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKTtcblxuICAgIGJpbmQocGFyZW50LCBncm91cCwgZW50ZXJHcm91cCwgdXBkYXRlR3JvdXAsIGV4aXRHcm91cCwgZGF0YSwga2V5KTtcblxuICAgIC8vIE5vdyBjb25uZWN0IHRoZSBlbnRlciBub2RlcyB0byB0aGVpciBmb2xsb3dpbmcgdXBkYXRlIG5vZGUsIHN1Y2ggdGhhdFxuICAgIC8vIGFwcGVuZENoaWxkIGNhbiBpbnNlcnQgdGhlIG1hdGVyaWFsaXplZCBlbnRlciBub2RlIGJlZm9yZSB0aGlzIG5vZGUsXG4gICAgLy8gcmF0aGVyIHRoYW4gYXQgdGhlIGVuZCBvZiB0aGUgcGFyZW50IG5vZGUuXG4gICAgZm9yICh2YXIgaTAgPSAwLCBpMSA9IDAsIHByZXZpb3VzLCBuZXh0OyBpMCA8IGRhdGFMZW5ndGg7ICsraTApIHtcbiAgICAgIGlmIChwcmV2aW91cyA9IGVudGVyR3JvdXBbaTBdKSB7XG4gICAgICAgIGlmIChpMCA+PSBpMSkgaTEgPSBpMCArIDE7XG4gICAgICAgIHdoaWxlICghKG5leHQgPSB1cGRhdGVHcm91cFtpMV0pICYmICsraTEgPCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgcHJldmlvdXMuX25leHQgPSBuZXh0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlID0gbmV3IFNlbGVjdGlvbih1cGRhdGUsIHBhcmVudHMpO1xuICB1cGRhdGUuX2VudGVyID0gZW50ZXI7XG4gIHVwZGF0ZS5fZXhpdCA9IGV4aXQ7XG4gIHJldHVybiB1cGRhdGU7XG59XG5cbi8vIEdpdmVuIHNvbWUgZGF0YSwgdGhpcyByZXR1cm5zIGFuIGFycmF5LWxpa2UgdmlldyBvZiBpdDogYW4gb2JqZWN0IHRoYXRcbi8vIGV4cG9zZXMgYSBsZW5ndGggcHJvcGVydHkgYW5kIGFsbG93cyBudW1lcmljIGluZGV4aW5nLiBOb3RlIHRoYXQgdW5saWtlXG4vLyBzZWxlY3RBbGwsIHRoaXMgaXNu4oCZdCB3b3JyaWVkIGFib3V0IOKAnGxpdmXigJ0gY29sbGVjdGlvbnMgYmVjYXVzZSB0aGUgcmVzdWx0aW5nXG4vLyBhcnJheSB3aWxsIG9ubHkgYmUgdXNlZCBicmllZmx5IHdoaWxlIGRhdGEgaXMgYmVpbmcgYm91bmQuIChJdCBpcyBwb3NzaWJsZSB0b1xuLy8gY2F1c2UgdGhlIGRhdGEgdG8gY2hhbmdlIHdoaWxlIGl0ZXJhdGluZyBieSB1c2luZyBhIGtleSBmdW5jdGlvbiwgYnV0IHBsZWFzZVxuLy8gZG9u4oCZdDsgd2XigJlkIHJhdGhlciBhdm9pZCBhIGdyYXR1aXRvdXMgY29weS4pXG5mdW5jdGlvbiBhcnJheWxpa2UoZGF0YSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBkYXRhXG4gICAgPyBkYXRhIC8vIEFycmF5LCBUeXBlZEFycmF5LCBOb2RlTGlzdCwgYXJyYXktbGlrZVxuICAgIDogQXJyYXkuZnJvbShkYXRhKTsgLy8gTWFwLCBTZXQsIGl0ZXJhYmxlLCBzdHJpbmcsIG9yIGFueXRoaW5nIGVsc2Vcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2V4aXQgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9uZW50ZXIsIG9udXBkYXRlLCBvbmV4aXQpIHtcbiAgdmFyIGVudGVyID0gdGhpcy5lbnRlcigpLCB1cGRhdGUgPSB0aGlzLCBleGl0ID0gdGhpcy5leGl0KCk7XG4gIGlmICh0eXBlb2Ygb25lbnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZW50ZXIgPSBvbmVudGVyKGVudGVyKTtcbiAgICBpZiAoZW50ZXIpIGVudGVyID0gZW50ZXIuc2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgZW50ZXIgPSBlbnRlci5hcHBlbmQob25lbnRlciArIFwiXCIpO1xuICB9XG4gIGlmIChvbnVwZGF0ZSAhPSBudWxsKSB7XG4gICAgdXBkYXRlID0gb251cGRhdGUodXBkYXRlKTtcbiAgICBpZiAodXBkYXRlKSB1cGRhdGUgPSB1cGRhdGUuc2VsZWN0aW9uKCk7XG4gIH1cbiAgaWYgKG9uZXhpdCA9PSBudWxsKSBleGl0LnJlbW92ZSgpOyBlbHNlIG9uZXhpdChleGl0KTtcbiAgcmV0dXJuIGVudGVyICYmIHVwZGF0ZSA/IGVudGVyLm1lcmdlKHVwZGF0ZSkub3JkZXIoKSA6IHVwZGF0ZTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHZhciBzZWxlY3Rpb24gPSBjb250ZXh0LnNlbGVjdGlvbiA/IGNvbnRleHQuc2VsZWN0aW9uKCkgOiBjb250ZXh0O1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSBzZWxlY3Rpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IC0xLCBtID0gZ3JvdXBzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGlmIChuZXh0ICYmIG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24obmV4dCkgXiA0KSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb21wYXJlKSB7XG4gIGlmICghY29tcGFyZSkgY29tcGFyZSA9IGFzY2VuZGluZztcblxuICBmdW5jdGlvbiBjb21wYXJlTm9kZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGNvbXBhcmUoYS5fX2RhdGFfXywgYi5fX2RhdGFfXykgOiAhYSAtICFiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc29ydGdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc29ydGdyb3VwID0gc29ydGdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc29ydGdyb3VwW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ydGdyb3VwLnNvcnQoY29tcGFyZU5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc29ydGdyb3VwcywgdGhpcy5fcGFyZW50cykub3JkZXIoKTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgYXJndW1lbnRzWzBdID0gdGhpcztcbiAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIG5vZGUgPSBncm91cFtpXTtcbiAgICAgIGlmIChub2RlKSByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBsZXQgc2l6ZSA9IDA7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzKSArK3NpemU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuIHNpemU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLm5vZGUoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi4vbmFtZXNwYWNlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHYpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdik7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgIHJldHVybiBmdWxsbmFtZS5sb2NhbFxuICAgICAgICA/IG5vZGUuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKVxuICAgICAgICA6IG5vZGUuZ2V0QXR0cmlidXRlKGZ1bGxuYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KSkpKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gKG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIC8vIG5vZGUgaXMgYSBOb2RlXG4gICAgICB8fCAobm9kZS5kb2N1bWVudCAmJiBub2RlKSAvLyBub2RlIGlzIGEgV2luZG93XG4gICAgICB8fCBub2RlLmRlZmF1bHRWaWV3OyAvLyBub2RlIGlzIGEgRG9jdW1lbnRcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbHVlLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdiwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgPyBzdHlsZVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IHN0eWxlRnVuY3Rpb25cbiAgICAgICAgICAgIDogc3R5bGVDb25zdGFudCkobmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKVxuICAgICAgOiBzdHlsZVZhbHVlKHRoaXMubm9kZSgpLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVmFsdWUobm9kZSwgbmFtZSkge1xuICByZXR1cm4gbm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpXG4gICAgICB8fCBkZWZhdWx0Vmlldyhub2RlKS5nZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG59XG4iLCJmdW5jdGlvbiBwcm9wZXJ0eVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1tuYW1lXSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgZWxzZSB0aGlzW25hbWVdID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gcHJvcGVydHlSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gcHJvcGVydHlGdW5jdGlvblxuICAgICAgICAgIDogcHJvcGVydHlDb25zdGFudCkobmFtZSwgdmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKVtuYW1lXTtcbn1cbiIsImZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufVxuIiwiZnVuY3Rpb24gdGV4dFJlbW92ZSgpIHtcbiAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyB0ZXh0UmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0ZXh0RnVuY3Rpb25cbiAgICAgICAgICA6IHRleHRDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbn1cbiIsImZ1bmN0aW9uIGh0bWxSZW1vdmUoKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaHRtbENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBodG1sRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gaHRtbFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gaHRtbEZ1bmN0aW9uXG4gICAgICAgICAgOiBodG1sQ29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xufVxuIiwiZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJhaXNlKTtcbn1cbiIsImZ1bmN0aW9uIGxvd2VyKCkge1xuICBpZiAodGhpcy5wcmV2aW91c1NpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChsb3dlcik7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyZW1vdmUpO1xufVxuIiwiZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lU2hhbGxvdygpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUoZmFsc2UpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVEZWVwKCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVlcCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZGVlcCA/IHNlbGVjdGlvbl9jbG9uZURlZXAgOiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCJmdW5jdGlvbiBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdGhpcy5fX2RhdGFfXyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uUmVtb3ZlKHR5cGVuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb247XG4gICAgaWYgKCFvbikgcmV0dXJuO1xuICAgIGZvciAodmFyIGogPSAwLCBpID0gLTEsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGlmIChvID0gb25bal0sICghdHlwZW5hbWUudHlwZSB8fCBvLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUpICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25bKytpXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgrK2kpIG9uLmxlbmd0aCA9IGk7XG4gICAgZWxzZSBkZWxldGUgdGhpcy5fX29uO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbkFkZCh0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbiwgbywgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIodmFsdWUpO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8ub3B0aW9ucyA9IG9wdGlvbnMpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBvcHRpb25zOiBvcHRpb25zfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGVuYW1lcyA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiksIGksIG4gPSB0eXBlbmFtZXMubGVuZ3RoLCB0O1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBvbiA9IHRoaXMubm9kZSgpLl9fb247XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgZm9yIChpID0gMCwgbyA9IG9uW2pdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICgodCA9IHR5cGVuYW1lc1tpXSkudHlwZSA9PT0gby50eXBlICYmIHQubmFtZSA9PT0gby5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb24gPSB2YWx1ZSA/IG9uQWRkIDogb25SZW1vdmU7XG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHRoaXMuZWFjaChvbih0eXBlbmFtZXNbaV0sIHZhbHVlLCBvcHRpb25zKSk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3cuanNcIjtcblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlLCB0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlZmF1bHRWaWV3KG5vZGUpLFxuICAgICAgZXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5cbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnQgPSBuZXcgZXZlbnQodHlwZSwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGlmIChwYXJhbXMpIGV2ZW50LmluaXRFdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUpLCBldmVudC5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIGVsc2UgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaENvbnN0YW50KHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hGdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBkaXNwYXRjaEZ1bmN0aW9uXG4gICAgICA6IGRpc3BhdGNoQ29uc3RhbnQpKHR5cGUsIHBhcmFtcykpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgeWllbGQgbm9kZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzZWxlY3Rpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkIGZyb20gXCIuL3NlbGVjdENoaWxkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIGZyb20gXCIuL3NlbGVjdENoaWxkcmVuLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0YSBmcm9tIFwiLi9kYXRhLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VudGVyIGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2V4aXQgZnJvbSBcIi4vZXhpdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9qb2luIGZyb20gXCIuL2pvaW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb3JkZXIgZnJvbSBcIi4vb3JkZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc29ydCBmcm9tIFwiLi9zb3J0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NhbGwgZnJvbSBcIi4vY2FsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlcyBmcm9tIFwiLi9ub2Rlcy5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlIGZyb20gXCIuL25vZGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2l6ZSBmcm9tIFwiLi9zaXplLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VtcHR5IGZyb20gXCIuL2VtcHR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VhY2ggZnJvbSBcIi4vZWFjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcHJvcGVydHkgZnJvbSBcIi4vcHJvcGVydHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xhc3NlZCBmcm9tIFwiLi9jbGFzc2VkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9odG1sIGZyb20gXCIuL2h0bWwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmFpc2UgZnJvbSBcIi4vcmFpc2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbG93ZXIgZnJvbSBcIi4vbG93ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXBwZW5kIGZyb20gXCIuL2FwcGVuZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnNlcnQgZnJvbSBcIi4vaW5zZXJ0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xvbmUgZnJvbSBcIi4vY2xvbmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0dW0gZnJvbSBcIi4vZGF0dW0uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGlzcGF0Y2ggZnJvbSBcIi4vZGlzcGF0Y2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faXRlcmF0b3IgZnJvbSBcIi4vaXRlcmF0b3IuanNcIjtcblxuZXhwb3J0IHZhciByb290ID0gW251bGxdO1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0aW9uKGdyb3VwcywgcGFyZW50cykge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XV0sIHJvb3QpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fc2VsZWN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuU2VsZWN0aW9uLnByb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBTZWxlY3Rpb24sXG4gIHNlbGVjdDogc2VsZWN0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiBzZWxlY3Rpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3NlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHNlbGVjdGlvbl9maWx0ZXIsXG4gIGRhdGE6IHNlbGVjdGlvbl9kYXRhLFxuICBlbnRlcjogc2VsZWN0aW9uX2VudGVyLFxuICBleGl0OiBzZWxlY3Rpb25fZXhpdCxcbiAgam9pbjogc2VsZWN0aW9uX2pvaW4sXG4gIG1lcmdlOiBzZWxlY3Rpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogc2VsZWN0aW9uX3NlbGVjdGlvbixcbiAgb3JkZXI6IHNlbGVjdGlvbl9vcmRlcixcbiAgc29ydDogc2VsZWN0aW9uX3NvcnQsXG4gIGNhbGw6IHNlbGVjdGlvbl9jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX25vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fbm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3NpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9lYWNoLFxuICBhdHRyOiBzZWxlY3Rpb25fYXR0cixcbiAgc3R5bGU6IHNlbGVjdGlvbl9zdHlsZSxcbiAgcHJvcGVydHk6IHNlbGVjdGlvbl9wcm9wZXJ0eSxcbiAgY2xhc3NlZDogc2VsZWN0aW9uX2NsYXNzZWQsXG4gIHRleHQ6IHNlbGVjdGlvbl90ZXh0LFxuICBodG1sOiBzZWxlY3Rpb25faHRtbCxcbiAgcmFpc2U6IHNlbGVjdGlvbl9yYWlzZSxcbiAgbG93ZXI6IHNlbGVjdGlvbl9sb3dlcixcbiAgYXBwZW5kOiBzZWxlY3Rpb25fYXBwZW5kLFxuICBpbnNlcnQ6IHNlbGVjdGlvbl9pbnNlcnQsXG4gIHJlbW92ZTogc2VsZWN0aW9uX3JlbW92ZSxcbiAgY2xvbmU6IHNlbGVjdGlvbl9jbG9uZSxcbiAgZGF0dW06IHNlbGVjdGlvbl9kYXR1bSxcbiAgb246IHNlbGVjdGlvbl9vbixcbiAgZGlzcGF0Y2g6IHNlbGVjdGlvbl9kaXNwYXRjaCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9pdGVyYXRvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW9uO1xuIiwiaW1wb3J0IHtTZWxlY3Rpb24sIHJvb3R9IGZyb20gXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiXG4gICAgICA/IG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKV1dLCBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XSlcbiAgICAgIDogbmV3IFNlbGVjdGlvbihbW3NlbGVjdG9yXV0sIHJvb3QpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uc3RydWN0b3IsIGZhY3RvcnksIHByb3RvdHlwZSkge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBmYWN0b3J5LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgcHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQocGFyZW50LCBkZWZpbml0aW9uKSB7XG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuICBmb3IgKHZhciBrZXkgaW4gZGVmaW5pdGlvbikgcHJvdG90eXBlW2tleV0gPSBkZWZpbml0aW9uW2tleV07XG4gIHJldHVybiBwcm90b3R5cGU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KVxcXFxzKlwiLFxuICAgIHJlUCA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9XFxcXCkkYCksXG4gICAgcmVSZ2JQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlUmdiYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbFxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZUhzbGFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbGFcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5KGNoYW5uZWxzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IHRoaXMuY29uc3RydWN0b3IsIHRoaXMsIGNoYW5uZWxzKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiBjb2xvcl9mb3JtYXRIZXg4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXg4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IFJnYihjbGFtcGkodGhpcy5yKSwgY2xhbXBpKHRoaXMuZyksIGNsYW1waSh0aGlzLmIpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogcmdiX2Zvcm1hdEhleDgsXG4gIGZvcm1hdFJnYjogcmdiX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IHJnYl9mb3JtYXRSZ2Jcbn0pKTtcblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfSR7aGV4KChpc05hTih0aGlzLm9wYWNpdHkpID8gMSA6IHRoaXMub3BhY2l0eSkgKiAyNTUpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgcmV0dXJuIGAke2EgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIn0ke2NsYW1waSh0aGlzLnIpfSwgJHtjbGFtcGkodGhpcy5nKX0sICR7Y2xhbXBpKHRoaXMuYil9JHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbn1cblxuZnVuY3Rpb24gY2xhbXBhKG9wYWNpdHkpIHtcbiAgcmV0dXJuIGlzTmFOKG9wYWNpdHkpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG9wYWNpdHkpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXBpKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodmFsdWUpIHx8IDApKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gY2xhbXBpKHZhbHVlKTtcbiAgcmV0dXJuICh2YWx1ZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIHZhbHVlLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gaHNsYShoLCBzLCBsLCBhKSB7XG4gIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgZWxzZSBpZiAobCA8PSAwIHx8IGwgPj0gMSkgaCA9IHMgPSBOYU47XG4gIGVsc2UgaWYgKHMgPD0gMCkgaCA9IE5hTjtcbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBuZXcgSHNsKG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBvO1xuICBvID0gby5yZ2IoKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICBoID0gTmFOLFxuICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChzKSB7XG4gICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgZWxzZSBpZiAoZyA9PT0gbWF4KSBoID0gKGIgLSByKSAvIHMgKyAyO1xuICAgIGVsc2UgaCA9IChyIC0gZykgLyBzICsgNDtcbiAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgIGggKj0gNjA7XG4gIH0gZWxzZSB7XG4gICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gIH1cbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5mdW5jdGlvbiBIc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5zID0gK3M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKEhzbCwgaHNsLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICBzID0gaXNOYU4oaCkgfHwgaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMsXG4gICAgICAgIGwgPSB0aGlzLmwsXG4gICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgIG0xID0gMiAqIGwgLSBtMjtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCA8IDEyMCA/IGggKyAyNDAgOiBoIC0gMTIwLCBtMSwgbTIpLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBIc2woY2xhbXBoKHRoaXMuaCksIGNsYW1wdCh0aGlzLnMpLCBjbGFtcHQodGhpcy5sKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsKCkge1xuICAgIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgICByZXR1cm4gYCR7YSA9PT0gMSA/IFwiaHNsKFwiIDogXCJoc2xhKFwifSR7Y2xhbXBoKHRoaXMuaCl9LCAke2NsYW1wdCh0aGlzLnMpICogMTAwfSUsICR7Y2xhbXB0KHRoaXMubCkgKiAxMDB9JSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG4gIH1cbn0pKTtcblxuZnVuY3Rpb24gY2xhbXBoKHZhbHVlKSB7XG4gIHZhbHVlID0gKHZhbHVlIHx8IDApICUgMzYwO1xuICByZXR1cm4gdmFsdWUgPCAwID8gdmFsdWUgKyAzNjAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2xhbXB0KHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSB8fCAwKSk7XG59XG5cbi8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbmZ1bmN0aW9uIGhzbDJyZ2IoaCwgbTEsIG0yKSB7XG4gIHJldHVybiAoaCA8IDYwID8gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjBcbiAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICA6IGggPCAyNDAgPyBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwXG4gICAgICA6IG0xKSAqIDI1NTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHggPT4gKCkgPT4geDtcbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBsaW5lYXIoYSwgZCkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICsgdCAqIGQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4cG9uZW50aWFsKGEsIGIsIHkpIHtcbiAgcmV0dXJuIGEgPSBNYXRoLnBvdyhhLCB5KSwgYiA9IE1hdGgucG93KGIsIHkpIC0gYSwgeSA9IDEgLyB5LCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KGEgKyB0ICogYiwgeSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodWUoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkID4gMTgwIHx8IGQgPCAtMTgwID8gZCAtIDM2MCAqIE1hdGgucm91bmQoZCAvIDM2MCkgOiBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtbWEoeSkge1xuICByZXR1cm4gKHkgPSAreSkgPT09IDEgPyBub2dhbW1hIDogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiIC0gYSA/IGV4cG9uZW50aWFsKGEsIGIsIHkpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vZ2FtbWEoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuIiwiaW1wb3J0IHtyZ2IgYXMgY29sb3JSZ2J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGJhc2lzIGZyb20gXCIuL2Jhc2lzLmpzXCI7XG5pbXBvcnQgYmFzaXNDbG9zZWQgZnJvbSBcIi4vYmFzaXNDbG9zZWQuanNcIjtcbmltcG9ydCBub2dhbW1hLCB7Z2FtbWF9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiByZ2JHYW1tYSh5KSB7XG4gIHZhciBjb2xvciA9IGdhbW1hKHkpO1xuXG4gIGZ1bmN0aW9uIHJnYihzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSBjb2xvcigoc3RhcnQgPSBjb2xvclJnYihzdGFydCkpLnIsIChlbmQgPSBjb2xvclJnYihlbmQpKS5yKSxcbiAgICAgICAgZyA9IGNvbG9yKHN0YXJ0LmcsIGVuZC5nKSxcbiAgICAgICAgYiA9IGNvbG9yKHN0YXJ0LmIsIGVuZC5iKSxcbiAgICAgICAgb3BhY2l0eSA9IG5vZ2FtbWEoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5yID0gcih0KTtcbiAgICAgIHN0YXJ0LmcgPSBnKHQpO1xuICAgICAgc3RhcnQuYiA9IGIodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxuXG4gIHJnYi5nYW1tYSA9IHJnYkdhbW1hO1xuXG4gIHJldHVybiByZ2I7XG59KSgxKTtcblxuZnVuY3Rpb24gcmdiU3BsaW5lKHNwbGluZSkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIG4gPSBjb2xvcnMubGVuZ3RoLFxuICAgICAgICByID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBnID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBiID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBpLCBjb2xvcjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb2xvciA9IGNvbG9yUmdiKGNvbG9yc1tpXSk7XG4gICAgICByW2ldID0gY29sb3IuciB8fCAwO1xuICAgICAgZ1tpXSA9IGNvbG9yLmcgfHwgMDtcbiAgICAgIGJbaV0gPSBjb2xvci5iIHx8IDA7XG4gICAgfVxuICAgIHIgPSBzcGxpbmUocik7XG4gICAgZyA9IHNwbGluZShnKTtcbiAgICBiID0gc3BsaW5lKGIpO1xuICAgIGNvbG9yLm9wYWNpdHkgPSAxO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBjb2xvci5yID0gcih0KTtcbiAgICAgIGNvbG9yLmcgPSBnKHQpO1xuICAgICAgY29sb3IuYiA9IGIodCk7XG4gICAgICByZXR1cm4gY29sb3IgKyBcIlwiO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgcmdiQmFzaXMgPSByZ2JTcGxpbmUoYmFzaXMpO1xuZXhwb3J0IHZhciByZ2JCYXNpc0Nsb3NlZCA9IHJnYlNwbGluZShiYXNpc0Nsb3NlZCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHJlQSA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZyxcbiAgICByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcblxuZnVuY3Rpb24gemVybyhiKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25lKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYih0KSArIFwiXCI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGJpID0gcmVBLmxhc3RJbmRleCA9IHJlQi5sYXN0SW5kZXggPSAwLCAvLyBzY2FuIGluZGV4IGZvciBuZXh0IG51bWJlciBpbiBiXG4gICAgICBhbSwgLy8gY3VycmVudCBtYXRjaCBpbiBhXG4gICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICBicywgLy8gc3RyaW5nIHByZWNlZGluZyBjdXJyZW50IG51bWJlciBpbiBiLCBpZiBhbnlcbiAgICAgIGkgPSAtMSwgLy8gaW5kZXggaW4gc1xuICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcblxuICAvLyBDb2VyY2UgaW5wdXRzIHRvIHN0cmluZ3MuXG4gIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gIC8vIEludGVycG9sYXRlIHBhaXJzIG9mIG51bWJlcnMgaW4gYSAmIGIuXG4gIHdoaWxlICgoYW0gPSByZUEuZXhlYyhhKSlcbiAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgIGlmICgoYnMgPSBibS5pbmRleCkgPiBiaSkgeyAvLyBhIHN0cmluZyBwcmVjZWRlcyB0aGUgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYnMgPSBiLnNsaWNlKGJpLCBicyk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBibTsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYm07XG4gICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgIHNbKytpXSA9IG51bGw7XG4gICAgICBxLnB1c2goe2k6IGksIHg6IG51bWJlcihhbSwgYm0pfSk7XG4gICAgfVxuICAgIGJpID0gcmVCLmxhc3RJbmRleDtcbiAgfVxuXG4gIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gIGlmIChiaSA8IGIubGVuZ3RoKSB7XG4gICAgYnMgPSBiLnNsaWNlKGJpKTtcbiAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICBlbHNlIHNbKytpXSA9IGJzO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgZWFjaCBvZiB0aGUgbnVtYmVycyBhbmQgcmVqb2luIHRoZSBzdHJpbmcuXG4gIHJldHVybiBzLmxlbmd0aCA8IDIgPyAocVswXVxuICAgICAgPyBvbmUocVswXS54KVxuICAgICAgOiB6ZXJvKGIpKVxuICAgICAgOiAoYiA9IHEubGVuZ3RoLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgICAgICB9KTtcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IGRlY29tcG9zZSwge2lkZW50aXR5fSBmcm9tIFwiLi9kZWNvbXBvc2UuanNcIjtcblxudmFyIHN2Z05vZGU7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgY29uc3QgbSA9IG5ldyAodHlwZW9mIERPTU1hdHJpeCA9PT0gXCJmdW5jdGlvblwiID8gRE9NTWF0cml4IDogV2ViS2l0Q1NTTWF0cml4KSh2YWx1ZSArIFwiXCIpO1xuICByZXR1cm4gbS5pc0lkZW50aXR5ID8gaWRlbnRpdHkgOiBkZWNvbXBvc2UobS5hLCBtLmIsIG0uYywgbS5kLCBtLmUsIG0uZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZeKAmXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW7igJl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwodW5kZWZpbmVkLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1RpbWVyfSBmcm9tIFwiLi90aW1lci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIGRlbGF5ID0gZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXk7XG4gIHQucmVzdGFydChlbGFwc2VkID0+IHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuIiwiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge3RpbWVyLCB0aW1lb3V0fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGVtcHR5T24gPSBkaXNwYXRjaChcInN0YXJ0XCIsIFwiZW5kXCIsIFwiY2FuY2VsXCIsIFwiaW50ZXJydXB0XCIpO1xudmFyIGVtcHR5VHdlZW4gPSBbXTtcblxuZXhwb3J0IHZhciBDUkVBVEVEID0gMDtcbmV4cG9ydCB2YXIgU0NIRURVTEVEID0gMTtcbmV4cG9ydCB2YXIgU1RBUlRJTkcgPSAyO1xuZXhwb3J0IHZhciBTVEFSVEVEID0gMztcbmV4cG9ydCB2YXIgUlVOTklORyA9IDQ7XG5leHBvcnQgdmFyIEVORElORyA9IDU7XG5leHBvcnQgdmFyIEVOREVEID0gNjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSwgaWQsIGluZGV4LCBncm91cCwgdGltaW5nKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZXMpIG5vZGUuX190cmFuc2l0aW9uID0ge307XG4gIGVsc2UgaWYgKGlkIGluIHNjaGVkdWxlcykgcmV0dXJuO1xuICBjcmVhdGUobm9kZSwgaWQsIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGluZGV4OiBpbmRleCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIGdyb3VwOiBncm91cCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIG9uOiBlbXB0eU9uLFxuICAgIHR3ZWVuOiBlbXB0eVR3ZWVuLFxuICAgIHRpbWU6IHRpbWluZy50aW1lLFxuICAgIGRlbGF5OiB0aW1pbmcuZGVsYXksXG4gICAgZHVyYXRpb246IHRpbWluZy5kdXJhdGlvbixcbiAgICBlYXNlOiB0aW1pbmcuZWFzZSxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBzdGF0ZTogQ1JFQVRFRFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gQ1JFQVRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgc2NoZWR1bGVkXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gU1RBUlRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgcnVubmluZ1wiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlIHx8ICEoc2NoZWR1bGUgPSBzY2hlZHVsZVtpZF0pKSB0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2l0aW9uIG5vdCBmb3VuZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUobm9kZSwgaWQsIHNlbGYpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgdHdlZW47XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2VsZiB0aW1lciB3aGVuIHRoZSB0cmFuc2l0aW9uIGlzIGNyZWF0ZWQuXG4gIC8vIE5vdGUgdGhlIGFjdHVhbCBkZWxheSBpcyBub3Qga25vd24gdW50aWwgdGhlIGZpcnN0IGNhbGxiYWNrIVxuICBzY2hlZHVsZXNbaWRdID0gc2VsZjtcbiAgc2VsZi50aW1lciA9IHRpbWVyKHNjaGVkdWxlLCAwLCBzZWxmLnRpbWUpO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlKGVsYXBzZWQpIHtcbiAgICBzZWxmLnN0YXRlID0gU0NIRURVTEVEO1xuICAgIHNlbGYudGltZXIucmVzdGFydChzdGFydCwgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcblxuICAgIC8vIElmIHRoZSBlbGFwc2VkIGRlbGF5IGlzIGxlc3MgdGhhbiBvdXIgZmlyc3Qgc2xlZXAsIHN0YXJ0IGltbWVkaWF0ZWx5LlxuICAgIGlmIChzZWxmLmRlbGF5IDw9IGVsYXBzZWQpIHN0YXJ0KGVsYXBzZWQgLSBzZWxmLmRlbGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGVsYXBzZWQpIHtcbiAgICB2YXIgaSwgaiwgbiwgbztcblxuICAgIC8vIElmIHRoZSBzdGF0ZSBpcyBub3QgU0NIRURVTEVELCB0aGVuIHdlIHByZXZpb3VzbHkgZXJyb3JlZCBvbiBzdGFydC5cbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU0NIRURVTEVEKSByZXR1cm4gc3RvcCgpO1xuXG4gICAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgICAgbyA9IHNjaGVkdWxlc1tpXTtcbiAgICAgIGlmIChvLm5hbWUgIT09IHNlbGYubmFtZSkgY29udGludWU7XG5cbiAgICAgIC8vIFdoaWxlIHRoaXMgZWxlbWVudCBhbHJlYWR5IGhhcyBhIHN0YXJ0aW5nIHRyYW5zaXRpb24gZHVyaW5nIHRoaXMgZnJhbWUsXG4gICAgICAvLyBkZWZlciBzdGFydGluZyBhbiBpbnRlcnJ1cHRpbmcgdHJhbnNpdGlvbiB1bnRpbCB0aGF0IHRyYW5zaXRpb24gaGFzIGFcbiAgICAgIC8vIGNoYW5jZSB0byB0aWNrIChhbmQgcG9zc2libHkgZW5kKTsgc2VlIGQzL2QzLXRyYW5zaXRpb24jNTQhXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gU1RBUlRFRCkgcmV0dXJuIHRpbWVvdXQoc3RhcnQpO1xuXG4gICAgICAvLyBJbnRlcnJ1cHQgdGhlIGFjdGl2ZSB0cmFuc2l0aW9uLCBpZiBhbnkuXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gUlVOTklORykge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJpbnRlcnJ1cHRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbCBhbnkgcHJlLWVtcHRlZCB0cmFuc2l0aW9ucy5cbiAgICAgIGVsc2UgaWYgKCtpIDwgaWQpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmVyIHRoZSBmaXJzdCB0aWNrIHRvIGVuZCBvZiB0aGUgY3VycmVudCBmcmFtZTsgc2VlIGQzL2QzIzE1NzYuXG4gICAgLy8gTm90ZSB0aGUgdHJhbnNpdGlvbiBtYXkgYmUgY2FuY2VsZWQgYWZ0ZXIgc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3QgdGljayFcbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBzY2hlZHVsZWQgYmVmb3JlIHRoZSBzdGFydCBldmVudDsgc2VlIGQzL2QzLXRyYW5zaXRpb24jMTYhXG4gICAgLy8gQXNzdW1pbmcgdGhpcyBpcyBzdWNjZXNzZnVsLCBzdWJzZXF1ZW50IGNhbGxiYWNrcyBnbyBzdHJhaWdodCB0byB0aWNrLlxuICAgIHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gU1RBUlRFRCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gUlVOTklORztcbiAgICAgICAgc2VsZi50aW1lci5yZXN0YXJ0KHRpY2ssIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG4gICAgICAgIHRpY2soZWxhcHNlZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgc3RhcnQgZXZlbnQuXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgdGhlIHR3ZWVuIGFyZSBpbml0aWFsaXplZC5cbiAgICBzZWxmLnN0YXRlID0gU1RBUlRJTkc7XG4gICAgc2VsZi5vbi5jYWxsKFwic3RhcnRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNUQVJUSU5HKSByZXR1cm47IC8vIGludGVycnVwdGVkXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJURUQ7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0d2VlbiwgZGVsZXRpbmcgbnVsbCB0d2Vlbi5cbiAgICB0d2VlbiA9IG5ldyBBcnJheShuID0gc2VsZi50d2Vlbi5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGogPSAtMTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG8gPSBzZWxmLnR3ZWVuW2ldLnZhbHVlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCkpIHtcbiAgICAgICAgdHdlZW5bKytqXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIHR3ZWVuLmxlbmd0aCA9IGogKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gdGljayhlbGFwc2VkKSB7XG4gICAgdmFyIHQgPSBlbGFwc2VkIDwgc2VsZi5kdXJhdGlvbiA/IHNlbGYuZWFzZS5jYWxsKG51bGwsIGVsYXBzZWQgLyBzZWxmLmR1cmF0aW9uKSA6IChzZWxmLnRpbWVyLnJlc3RhcnQoc3RvcCksIHNlbGYuc3RhdGUgPSBFTkRJTkcsIDEpLFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSB0d2Vlbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgdHdlZW5baV0uY2FsbChub2RlLCB0KTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZW5kIGV2ZW50LlxuICAgIGlmIChzZWxmLnN0YXRlID09PSBFTkRJTkcpIHtcbiAgICAgIHNlbGYub24uY2FsbChcImVuZFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHNlbGYuc3RhdGUgPSBFTkRFRDtcbiAgICBzZWxmLnRpbWVyLnN0b3AoKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2lkXTtcbiAgICBmb3IgKHZhciBpIGluIHNjaGVkdWxlcykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQVJUSU5HLCBFTkRJTkcsIEVOREVEfSBmcm9tIFwiLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBhY3RpdmUsXG4gICAgICBlbXB0eSA9IHRydWUsXG4gICAgICBpO1xuXG4gIGlmICghc2NoZWR1bGVzKSByZXR1cm47XG5cbiAgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcblxuICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgaWYgKChzY2hlZHVsZSA9IHNjaGVkdWxlc1tpXSkubmFtZSAhPT0gbmFtZSkgeyBlbXB0eSA9IGZhbHNlOyBjb250aW51ZTsgfVxuICAgIGFjdGl2ZSA9IHNjaGVkdWxlLnN0YXRlID4gU1RBUlRJTkcgJiYgc2NoZWR1bGUuc3RhdGUgPCBFTkRJTkc7XG4gICAgc2NoZWR1bGUuc3RhdGUgPSBFTkRFRDtcbiAgICBzY2hlZHVsZS50aW1lci5zdG9wKCk7XG4gICAgc2NoZWR1bGUub24uY2FsbChhY3RpdmUgPyBcImludGVycnVwdFwiIDogXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2NoZWR1bGUuaW5kZXgsIHNjaGVkdWxlLmdyb3VwKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICB9XG5cbiAgaWYgKGVtcHR5KSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG59XG4iLCJpbXBvcnQgaW50ZXJydXB0IGZyb20gXCIuLi9pbnRlcnJ1cHQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGludGVycnVwdCh0aGlzLCBuYW1lKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiB0d2VlblJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gdHdlZW4wID0gdHdlZW47XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xID0gdHdlZW4xLnNsaWNlKCk7XG4gICAgICAgICAgdHdlZW4xLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0d2VlbkZ1bmN0aW9uKGlkLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9ICh0d2VlbjAgPSB0d2Vlbikuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIHQgPSB7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSwgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMVtpXSA9IHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBuKSB0d2VlbjEucHVzaCh0KTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgbmFtZSArPSBcIlwiO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciB0d2VlbiA9IGdldCh0aGlzLm5vZGUoKSwgaWQpLnR3ZWVuO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4ubGVuZ3RoLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKHQgPSB0d2VlbltpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsID8gdHdlZW5SZW1vdmUgOiB0d2VlbkZ1bmN0aW9uKShpZCwgbmFtZSwgdmFsdWUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWVuVmFsdWUodHJhbnNpdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdHJhbnNpdGlvbi5faWQ7XG5cbiAgdHJhbnNpdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCk7XG4gICAgKHNjaGVkdWxlLnZhbHVlIHx8IChzY2hlZHVsZS52YWx1ZSA9IHt9KSlbbmFtZV0gPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBnZXQobm9kZSwgaWQpLnZhbHVlW25hbWVdO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJnYiwgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBjO1xuICByZXR1cm4gKHR5cGVvZiBiID09PSBcIm51bWJlclwiID8gaW50ZXJwb2xhdGVOdW1iZXJcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gaW50ZXJwb2xhdGVSZ2JcbiAgICAgIDogKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIGludGVycG9sYXRlUmdiKVxuICAgICAgOiBpbnRlcnBvbGF0ZVN0cmluZykoYSwgYik7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtU3ZnIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKSwgaSA9IGZ1bGxuYW1lID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHRoaXMuYXR0clR3ZWVuKG5hbWUsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKShmdWxsbmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcImF0dHIuXCIgKyBuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHZhbHVlID09IG51bGwgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKShmdWxsbmFtZSlcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKGZ1bGxuYW1lLCBpLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlKG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW5OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2VlbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGtleSA9IFwiYXR0ci5cIiArIG5hbWU7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIChmdWxsbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkZWxheUZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVsYXlDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkZWxheUZ1bmN0aW9uXG4gICAgICAgICAgOiBkZWxheUNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kZWxheTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGR1cmF0aW9uRnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGR1cmF0aW9uQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkdXJhdGlvbkZ1bmN0aW9uXG4gICAgICAgICAgOiBkdXJhdGlvbkNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kdXJhdGlvbjtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKGVhc2VDb25zdGFudChpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5lYXNlO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VWYXJ5aW5nKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgdiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLmVhY2goZWFzZVZhcnlpbmcodGhpcy5faWQsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge21hdGNoZXJ9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICBpZiAodHJhbnNpdGlvbi5faWQgIT09IHRoaXMuX2lkKSB0aHJvdyBuZXcgRXJyb3I7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHRyYW5zaXRpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlRnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9fdHJhbnNpdGlvbikgaWYgKCtpICE9PSBpZCkgcmV0dXJuO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9uKFwiZW5kLnJlbW92ZVwiLCByZW1vdmVGdW5jdGlvbih0aGlzLl9pZCkpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgICAgc2NoZWR1bGUoc3ViZ3JvdXBbaV0sIG5hbWUsIGlkLCBpLCBzdWJncm91cCwgZ2V0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG52YXIgU2VsZWN0aW9uID0gc2VsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2dyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtQ3NzIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c3R5bGV9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlTnVsbChuYW1lLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHN0cmluZzEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCBzdHJpbmcxMCA9IHN0cmluZzEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHZhbHVlMSA9IHZhbHVlKHRoaXMpLFxuICAgICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHN0cmluZzEgPSB2YWx1ZTEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVNYXliZVJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgb24wLCBvbjEsIGxpc3RlbmVyMCwga2V5ID0gXCJzdHlsZS5cIiArIG5hbWUsIGV2ZW50ID0gXCJlbmQuXCIgKyBrZXksIHJlbW92ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub24sXG4gICAgICAgIGxpc3RlbmVyID0gc2NoZWR1bGUudmFsdWVba2V5XSA9PSBudWxsID8gcmVtb3ZlIHx8IChyZW1vdmUgPSBzdHlsZVJlbW92ZShuYW1lKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjAgfHwgbGlzdGVuZXIwICE9PSBsaXN0ZW5lcikgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihldmVudCwgbGlzdGVuZXIwID0gbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgaSA9IChuYW1lICs9IFwiXCIpID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZU51bGwobmFtZSwgaSkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBzdHlsZVJlbW92ZShuYW1lKSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVGdW5jdGlvbihuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwic3R5bGUuXCIgKyBuYW1lLCB2YWx1ZSkpKVxuICAgICAgLmVhY2goc3R5bGVNYXliZVJlbW92ZSh0aGlzLl9pZCwgbmFtZSkpXG4gICAgOiB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUNvbnN0YW50KG5hbWUsIGksIHZhbHVlKSwgcHJpb3JpdHkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBudWxsKTtcbn1cbiIsImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsImltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlMSA9IHZhbHVlKHRoaXMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTEgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLnR3ZWVuKFwidGV4dFwiLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB0ZXh0RnVuY3Rpb24odHdlZW5WYWx1ZSh0aGlzLCBcInRleHRcIiwgdmFsdWUpKVxuICAgICAgOiB0ZXh0Q29uc3RhbnQodmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCIpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRJbnRlcnBvbGF0ZShpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IGkuY2FsbCh0aGlzLCB0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dFR3ZWVuKHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgdGV4dEludGVycG9sYXRlKGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJ0ZXh0XCI7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCB0ZXh0VHdlZW4odmFsdWUpKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgb24wLCBvbjEsIHRoYXQgPSB0aGlzLCBpZCA9IHRoYXQuX2lkLCBzaXplID0gdGhhdC5zaXplKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgY2FuY2VsID0ge3ZhbHVlOiByZWplY3R9LFxuICAgICAgICBlbmQgPSB7dmFsdWU6IGZ1bmN0aW9uKCkgeyBpZiAoLS1zaXplID09PSAwKSByZXNvbHZlKCk7IH19O1xuXG4gICAgdGhhdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgICAgaWYgKG9uICE9PSBvbjApIHtcbiAgICAgICAgb24xID0gKG9uMCA9IG9uKS5jb3B5KCk7XG4gICAgICAgIG9uMS5fLmNhbmNlbC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmludGVycnVwdC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmVuZC5wdXNoKGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIHNlbGVjdGlvbiB3YXMgZW1wdHksIHJlc29sdmUgZW5kIGltbWVkaWF0ZWx5XG4gICAgaWYgKHNpemUgPT09IDApIHJlc29sdmUoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyVHdlZW4gZnJvbSBcIi4vYXR0clR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kZWxheSBmcm9tIFwiLi9kZWxheS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZHVyYXRpb24gZnJvbSBcIi4vZHVyYXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2UgZnJvbSBcIi4vZWFzZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcgZnJvbSBcIi4vZWFzZVZhcnlpbmcuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlVHdlZW4gZnJvbSBcIi4vc3R5bGVUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0VHdlZW4gZnJvbSBcIi4vdGV4dFR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3R3ZWVuIGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lbmQgZnJvbSBcIi4vZW5kLmpzXCI7XG5cbnZhciBpZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2l0aW9uKGdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIHRoaXMuX2lkID0gaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0aW9uKCkudHJhbnNpdGlvbihuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0lkKCkge1xuICByZXR1cm4gKytpZDtcbn1cblxudmFyIHNlbGVjdGlvbl9wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZSA9IHRyYW5zaXRpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVHJhbnNpdGlvbixcbiAgc2VsZWN0OiB0cmFuc2l0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiB0cmFuc2l0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHRyYW5zaXRpb25fZmlsdGVyLFxuICBtZXJnZTogdHJhbnNpdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiB0cmFuc2l0aW9uX3NlbGVjdGlvbixcbiAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbl90cmFuc2l0aW9uLFxuICBjYWxsOiBzZWxlY3Rpb25fcHJvdG90eXBlLmNhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9wcm90b3R5cGUuZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9wcm90b3R5cGUuZWFjaCxcbiAgb246IHRyYW5zaXRpb25fb24sXG4gIGF0dHI6IHRyYW5zaXRpb25fYXR0cixcbiAgYXR0clR3ZWVuOiB0cmFuc2l0aW9uX2F0dHJUd2VlbixcbiAgc3R5bGU6IHRyYW5zaXRpb25fc3R5bGUsXG4gIHN0eWxlVHdlZW46IHRyYW5zaXRpb25fc3R5bGVUd2VlbixcbiAgdGV4dDogdHJhbnNpdGlvbl90ZXh0LFxuICB0ZXh0VHdlZW46IHRyYW5zaXRpb25fdGV4dFR3ZWVuLFxuICByZW1vdmU6IHRyYW5zaXRpb25fcmVtb3ZlLFxuICB0d2VlbjogdHJhbnNpdGlvbl90d2VlbixcbiAgZGVsYXk6IHRyYW5zaXRpb25fZGVsYXksXG4gIGR1cmF0aW9uOiB0cmFuc2l0aW9uX2R1cmF0aW9uLFxuICBlYXNlOiB0cmFuc2l0aW9uX2Vhc2UsXG4gIGVhc2VWYXJ5aW5nOiB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nLFxuICBlbmQ6IHRyYW5zaXRpb25fZW5kLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX3Byb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdXG59O1xuIiwiZXhwb3J0IGNvbnN0IGxpbmVhciA9IHQgPT4gK3Q7XG4iLCJleHBvcnQgZnVuY3Rpb24gY3ViaWNJbih0KSB7XG4gIHJldHVybiB0ICogdCAqIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY091dCh0KSB7XG4gIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY0luT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gdCAqIHQgKiB0IDogKHQgLT0gMikgKiB0ICogdCArIDIpIC8gMjtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUgZnJvbSBcIi4uL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7ZWFzZUN1YmljSW5PdXR9IGZyb20gXCJkMy1lYXNlXCI7XG5pbXBvcnQge25vd30gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBkZWZhdWx0VGltaW5nID0ge1xuICB0aW1lOiBudWxsLCAvLyBTZXQgb24gdXNlLlxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDI1MCxcbiAgZWFzZTogZWFzZUN1YmljSW5PdXRcbn07XG5cbmZ1bmN0aW9uIGluaGVyaXQobm9kZSwgaWQpIHtcbiAgdmFyIHRpbWluZztcbiAgd2hpbGUgKCEodGltaW5nID0gbm9kZS5fX3RyYW5zaXRpb24pIHx8ICEodGltaW5nID0gdGltaW5nW2lkXSkpIHtcbiAgICBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmFuc2l0aW9uICR7aWR9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGltaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBpZCxcbiAgICAgIHRpbWluZztcblxuICBpZiAobmFtZSBpbnN0YW5jZW9mIFRyYW5zaXRpb24pIHtcbiAgICBpZCA9IG5hbWUuX2lkLCBuYW1lID0gbmFtZS5fbmFtZTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IG5ld0lkKCksICh0aW1pbmcgPSBkZWZhdWx0VGltaW5nKS50aW1lID0gbm93KCksIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZCwgaSwgZ3JvdXAsIHRpbWluZyB8fCBpbmhlcml0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBzZWxlY3Rpb25faW50ZXJydXB0IGZyb20gXCIuL2ludGVycnVwdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcblxuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBzZWxlY3Rpb25faW50ZXJydXB0O1xuc2VsZWN0aW9uLnByb3RvdHlwZS50cmFuc2l0aW9uID0gc2VsZWN0aW9uX3RyYW5zaXRpb247XG4iLCJleHBvcnQgZnVuY3Rpb24gVHJhbnNmb3JtKGssIHgsIHkpIHtcbiAgdGhpcy5rID0gaztcbiAgdGhpcy54ID0geDtcbiAgdGhpcy55ID0geTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zZm9ybSxcbiAgc2NhbGU6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gayA9PT0gMSA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuayAqIGssIHRoaXMueCwgdGhpcy55KTtcbiAgfSxcbiAgdHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHggPT09IDAgJiB5ID09PSAwID8gdGhpcyA6IG5ldyBUcmFuc2Zvcm0odGhpcy5rLCB0aGlzLnggKyB0aGlzLmsgKiB4LCB0aGlzLnkgKyB0aGlzLmsgKiB5KTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIFtwb2ludFswXSAqIHRoaXMuayArIHRoaXMueCwgcG9pbnRbMV0gKiB0aGlzLmsgKyB0aGlzLnldO1xuICB9LFxuICBhcHBseVg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCAqIHRoaXMuayArIHRoaXMueDtcbiAgfSxcbiAgYXBwbHlZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLmsgKyB0aGlzLnk7XG4gIH0sXG4gIGludmVydDogZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICByZXR1cm4gWyhsb2NhdGlvblswXSAtIHRoaXMueCkgLyB0aGlzLmssIChsb2NhdGlvblsxXSAtIHRoaXMueSkgLyB0aGlzLmtdO1xuICB9LFxuICBpbnZlcnRYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4IC0gdGhpcy54KSAvIHRoaXMuaztcbiAgfSxcbiAgaW52ZXJ0WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiAoeSAtIHRoaXMueSkgLyB0aGlzLms7XG4gIH0sXG4gIHJlc2NhbGVYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHguY29weSgpLmRvbWFpbih4LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WCwgdGhpcykubWFwKHguaW52ZXJ0LCB4KSk7XG4gIH0sXG4gIHJlc2NhbGVZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkuY29weSgpLmRvbWFpbih5LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WSwgdGhpcykubWFwKHkuaW52ZXJ0LCB5KSk7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnggKyBcIixcIiArIHRoaXMueSArIFwiKSBzY2FsZShcIiArIHRoaXMuayArIFwiKVwiO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0gbmV3IFRyYW5zZm9ybSgxLCAwLCAwKTtcblxudHJhbnNmb3JtLnByb3RvdHlwZSA9IFRyYW5zZm9ybS5wcm90b3R5cGU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlKSB7XG4gIHdoaWxlICghbm9kZS5fX3pvb20pIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHJldHVybiBub2RlLl9fem9vbTtcbn1cbiIsImV4cG9ydCBjb25zdCBzdmducyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSA8VCBleHRlbmRzIEVsZW1lbnQ+KFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICB0eXBlPzogbmV3ICgpID0+IFRcbik6IFQgPT4ge1xuICBjb25zdCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgaWYgKGVsdCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIHNlbGVjdG9yIFwiICsgc2VsZWN0b3IpO1xuICB9XG4gIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgIShlbHQgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgU2VsZWN0b3IgJHtzZWxlY3Rvcn0gbm90IG9mIHR5cGUgJHt0eXBlfWApO1xuICB9XG4gIHJldHVybiBlbHQgYXMgVDtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZml0dHMgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBiaWdUYXJnZXQxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLmJpZy10YXJnZXQxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAzNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMjUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDE1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCA1KTtcbiAgY29uc3QgYmlnVGFyZ2V0MiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5iaWctdGFyZ2V0MlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMzUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDI1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAxNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgNSk7XG4gIGNvbnN0IHNtYWxsVGFyZ2V0ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLnNtYWxsLXRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHNtYWxsVGFyZ2V0LCA0MCwgNTAsIDUpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwdXJwb3NlID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYmlnVGFyZ2V0MSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucHVycG9zZSBnLnRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDQwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMzApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAyMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDEwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGhpY2sgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnMSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wMVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMSxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDQwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGcyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTAyXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGcyLFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnMyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wM1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMyxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNCxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAyMCw0MCA0MCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc1ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA1XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc1LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsMjBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzYgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDZcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzYsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDQwIDQwLDQwIDIwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgamFrb2IgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBhcHAxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLmFwcC0xXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYXBwMSwgNDAsIDUwLCAzNSk7XG4gIGNvbnN0IGFwcDIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcuYXBwLTJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShhcHAyLCA0MCwgNTAsIDM1KTtcbiAgY29uc3QgeW91ckFwcCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy55b3VyLWFwcFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHlvdXJBcHAsIDQwLCA1MCwgMzUpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBncmFkaWVudCA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmdyYWRpZW50IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVJlY3QoZywgNSwgMzAsIDQwLCA0MCwgMSk7XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgMzAsIDQwLCA0MCwgMik7XG4gIHQuY3JlYXRlUmVjdChnLCA5NSwgMzAsIDQwLCA0MCwgMyk7XG4gIHQuY3JlYXRlUmVjdChnLCAxNDAsIDMwLCA0MCwgNDAsIDQpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTg1LCAzMCwgNDAsIDQwLCA1KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDIzMCwgMzAsIDQwLCA0MCwgNik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGdlc3RhbHQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5nZXN0YWx0IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAsIHkgKiAyMCArIDIwLCA1LCB7XG4gICAgICAgIGNsYXNzOiBcImZ1bGxcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgcHJveGltaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucHJveGltaXR5IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSB4ID4gMSAmJiB5IDwgMiA/IDggOiAwO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwICsgb2Zmc2V0LCB5ICogMjAgKyAyMCAtIG9mZnNldCwgNSwge1xuICAgICAgICBjbGFzczogXCJmdWxsXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHNpbWlsYXJpdHkgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5zaW1pbGFyaXR5IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBteUNsYXNzID0geCA+IDEgJiYgeSA8IDIgPyBcInh4eFwiIDogXCJmdWxsXCI7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAsIHkgKiAyMCArIDIwLCA1LCB7XG4gICAgICAgIGNsYXNzOiBteUNsYXNzLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBjb21tb25SZWdpb24gPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5jb21tb25SZWdpb24gZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCAxMDAgKyAzMiwgMTIsIDU3LCAzNywgMik7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCwgeSAqIDIwICsgMjAsIDUsIHtcbiAgICAgICAgY2xhc3M6IFwiZnVsbFwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBzaW1wbGljaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuc2ltcGxpY2l0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDEwMCArIDMyLCAxMiwgNTcsIDM3LCAyKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDEwMCAtIDgsIDEyLCA5NywgNzcsIDIpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBtaWxsZXIgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5taWxsZXIgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDEzMCwgMjAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxNTAsIDIwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTcwLCAyMCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDE3MCwgNDAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxNzAsIDYwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTcwLCA4MCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHRlc2xlciA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnRlc2xlciBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICB0LmNyZWF0ZUNpcmNsZShnLCAxMDAgKyBpICogMjAsIDIwLCA1LCB7XG4gICAgICBjbGFzczogaSA+PSAzID8gXCJlbXB0eVwiIDogXCJmdWxsXCIsXG4gICAgfSk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICB0LmNyZWF0ZUNpcmNsZShnLCAxMDAgKyBpICogMjAsIDUwLCA1LCB7IGNsYXNzOiBpICUgMiA/IFwiZW1wdHlcIiA6IFwiZnVsbFwiIH0pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgMTAwICsgaSAqIDIwLCA4MCwgNSwgeyBjbGFzczogaSA8IDMgPyBcImVtcHR5XCIgOiBcImZ1bGxcIiB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwb3N0ZWwgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5wb3N0ZWwgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDgwLCA1MCwgMzUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAyMjAsIDUwLCAzNSwgeyBjbGFzczogXCJlbXB0eVwiIH0pO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCB6ZWlnYXJuaWsgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy56ZWlnYXJuaWsgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgdC5jcmVhdGVSZWN0KGcsIDUwLCBpICogMTUsIDIwMCwgMTAsIDYsIFwiZW1wdHlyZWN0XCIpO1xuICB9XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgNSAqIDE1LCAxNTAsIDEwLCA2LCBcImZ1bGxyZWN0XCIpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCB2b25SZXN0b3JmZiA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnZvblJlc3RvcmZmIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBteUNsYXNzID0geCA9PT0gMiAmJiB5ID09PSAyID8gXCJ4eHhcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogbXlDbGFzcyxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5jb25zdCBwb2ludHMgPVxuICBcIjIwLDEwLCAyMCwyMCAxMCwzMCwgMjAsNDAgMjAsNTAsIDEwLDUwIDEwLDYwIDIwLDYwIDIwLDcwIDIwLDgwIDEwLDkwXCI7XG5cbmV4cG9ydCBjb25zdCBzeW1ldHJpZSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZy5pbm5lckhUTUwgPSBgXG48ZyBjbGFzcz1cInAxXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDYwKVwiPjwvZz5cbjxnIGNsYXNzPVwicDJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoODApXCI+PC9nPlxuPGcgY2xhc3M9XCJwM1wiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgxODApXCI+PC9nPlxuPGcgY2xhc3M9XCJwNFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyMzApIHNjYWxlKC0xLCAxKVwiPjwvZz5cbmA7XG5cbiAgY29uc3QgZzEgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnLnAxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVQb2x5bGluZShnMSwgcG9pbnRzLCBcImVtcHR5XCIpO1xuICBjb25zdCBnMiA9IHF1ZXJ5U2VsZWN0b3IoXCIuc3ltZXRyaWUgc3ZnIGcucDJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVBvbHlsaW5lKGcyLCBwb2ludHMsIFwiZW1wdHlcIik7XG5cbiAgY29uc3QgZzMgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnLnAzXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVQb2x5bGluZShnMywgcG9pbnRzLCBcImVtcHR5XCIpO1xuICBjb25zdCBnNCA9IHF1ZXJ5U2VsZWN0b3IoXCIuc3ltZXRyaWUgc3ZnIGcucDRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVBvbHlsaW5lKGc0LCBwb2ludHMsIFwiZW1wdHlcIik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHNlcmlhbFBvc2l0aW9uID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCIuc2VyaWFsUG9zaXRpb24gc3ZnIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDc7IHgrKykge1xuICAgIGNvbnN0IGNzc0NsYXNzID0geCA9PT0gMCB8fCB4ID09PSA2ID8gXCJmdWxsXCIgOiBcImVtcHR5XCI7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDQwICsgMzAsIDUwLCAyMCwge1xuICAgICAgY2xhc3M6IGNzc0NsYXNzLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHBhcmV0byA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwiLnBhcmV0byBzdmcgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgNDAsIDUwLCAyMCwgNiwgXCJlbXB0eVwiKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDE1MCwgMTAsIDEwMCwgODAsIDYsIFwiZW1wdHlcIik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHBlYWtFbmQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcIi5wZWFrRW5kIHN2ZyBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3QgY3NzQ2xhc3MgPVxuICAgICAgICAoeCA9PT0gMSAmJiB5ID09PSAxKSB8fCAoeCA9PT0gNCAmJiB5ID09PSAzKSA/IFwiZW1wdHlcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogY3NzQ2xhc3MsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4vU1ZHVG9vbFwiO1xuaW1wb3J0IHsgZml0dHMgfSBmcm9tIFwiLi9zdmdzL2ZpdHRzXCI7XG5pbXBvcnQgeyBwdXJwb3NlIH0gZnJvbSBcIi4vc3Zncy9wdXJwb3NlXCI7XG5pbXBvcnQgeyBoaWNrIH0gZnJvbSBcIi4vc3Zncy9oaWNrXCI7XG5pbXBvcnQgeyBqYWtvYiB9IGZyb20gXCIuL3N2Z3MvamFrb2JcIjtcbmltcG9ydCB7IGdyYWRpZW50IH0gZnJvbSBcIi4vc3Zncy9ncmFkaWVudFwiO1xuaW1wb3J0IHsgZ2VzdGFsdCB9IGZyb20gXCIuL3N2Z3MvZ2VzdGFsdFwiO1xuaW1wb3J0IHsgcHJveGltaXR5IH0gZnJvbSBcIi4vc3Zncy9wcm94aW1pdHlcIjtcbmltcG9ydCB7IHNpbWlsYXJpdHkgfSBmcm9tIFwiLi9zdmdzL3NpbWlsYXJpdHlcIjtcbmltcG9ydCB7IGNvbW1vblJlZ2lvbiB9IGZyb20gXCIuL3N2Z3MvY29tbW9uUmVnaW9uXCI7XG5pbXBvcnQgeyBzaW1wbGljaXR5IH0gZnJvbSBcIi4vc3Zncy9zaW1wbGljaXR5XCI7XG5pbXBvcnQgeyBtaWxsZXIgfSBmcm9tIFwiLi9zdmdzL21pbGxlclwiO1xuaW1wb3J0IHsgdGVzbGVyIH0gZnJvbSBcIi4vc3Zncy90ZXNsZXJcIjtcbmltcG9ydCB7IHBvc3RlbCB9IGZyb20gXCIuL3N2Z3MvcG9zdGVsXCI7XG5pbXBvcnQgeyB6ZWlnYXJuaWsgfSBmcm9tIFwiLi9zdmdzL3plaWdhcm5pa1wiO1xuaW1wb3J0IHsgdm9uUmVzdG9yZmYgfSBmcm9tIFwiLi9zdmdzL3ZvblJlc3RvcmZmXCI7XG5pbXBvcnQgeyBzeW1ldHJpZSB9IGZyb20gXCIuL3N2Z3Mvc3ltZXRyaWVcIjtcbmltcG9ydCB7IHNlcmlhbFBvc2l0aW9uIH0gZnJvbSBcIi4vc3Zncy9zZXJpYWxQb3NpdGlvblwiO1xuaW1wb3J0IHsgcGFyZXRvIH0gZnJvbSBcIi4vc3Zncy9wYXJldG9cIjtcbmltcG9ydCB7IHBlYWtFbmQgfSBmcm9tIFwiLi9zdmdzL3BlYWtFbmRcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiAoKHQ6IFNWR1Rvb2wpID0+IHZvaWQpW10gfSA9IHtcbiAgZml0dHM6IFtmaXR0c10sXG4gIHB1cnBvc2U6IFtwdXJwb3NlXSxcbiAgaGljazogW2hpY2tdLFxuICBqYWtvYjogW2pha29iXSxcbiAgZ3JhZGllbnQ6IFtncmFkaWVudF0sXG4gIGdlc3RhbHQ6IFtnZXN0YWx0XSxcbiAgcHJveGltaXR5OiBbcHJveGltaXR5XSxcbiAgc2ltaWxhcml0eTogW3NpbWlsYXJpdHldLFxuICBjb21tb25SZWdpb246IFtjb21tb25SZWdpb25dLFxuICBzaW1wbGljaXR5OiBbc2ltcGxpY2l0eV0sXG4gIG1pbGxlcjogW21pbGxlcl0sXG4gIHRlc2xlcjogW3Rlc2xlcl0sXG4gIHBvc3RlbDogW3Bvc3RlbF0sXG4gIHplaWdhcm5pazogW3plaWdhcm5pa10sXG4gIHZvblJlc3RvcmZmOiBbdm9uUmVzdG9yZmZdLFxuICBzeW1ldHJpZTogW3N5bWV0cmllXSxcbiAgc2VyaWFsUG9zaXRpb246IFtzZXJpYWxQb3NpdGlvbl0sXG4gIHBhcmV0bzogW3BhcmV0b10sXG4gIHBlYWtFbmQ6IFtwZWFrRW5kXSxcbn07XG5cbmNvbnN0IHNldCA9IG5ldyBTZXQ8KHQ6IFNWR1Rvb2wpID0+IHZvaWQ+KCk7XG5mb3IgKGNvbnN0IHZhbHVlcyBvZiBPYmplY3QudmFsdWVzKGNvbmZpZykpIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICBzZXQuYWRkKHZhbHVlKTtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IGFsbCA9IFsuLi5zZXRdO1xuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2ludGVyZmFjZXMvVHJhbnNpdGlvbk9wdGlvbnNcIjtcbmltcG9ydCB7IGNvbmZpZywgYWxsIH0gZnJvbSBcIi4vc3ZnQ29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBTVkdUb29sIHtcbiAgZGVsYXlDb3VudGVyID0gMDtcbiAgZGVsYXlJbmNyZW1lbnQgPSAxMDA7XG4gIHVzZVRyYW5zaXRpb24gPSBmYWxzZTtcblxuICBzdmdOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdFN2Z05hbWUoKTtcbiAgfVxuXG4gIGluaXRTdmdOYW1lKCkge1xuICAgIGNvbnN0IHV4bGF3SW1hZ2VOYW1lID0gKHdpbmRvdyBhcyBhbnkpW1widXhsYXdJbWFnZU5hbWVcIl07XG4gICAgY29uc3QgdXhsYXdDbGFzc05hbWUgPSAod2luZG93IGFzIGFueSlbXCJ1eGxhd0NsYXNzTmFtZVwiXTtcbiAgICBjb25zdCBzdmdOYW1lID1cbiAgICAgIHV4bGF3SW1hZ2VOYW1lID09PSBcImRlZmF1bHRcIiA/IHV4bGF3Q2xhc3NOYW1lIDogdXhsYXdJbWFnZU5hbWU7XG4gICAgaWYgKHN2Z05hbWUpIHtcbiAgICAgIHRoaXMuc3ZnTmFtZSA9IHN2Z05hbWU7XG4gICAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXRTdmcoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3ZnTmFtZSA/IGNvbmZpZ1t0aGlzLnN2Z05hbWVdIDogYWxsO1xuICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBmIG9mIGxpc3QpIHtcbiAgICAgIGYodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVsYXkoKSB7XG4gICAgdGhpcy5kZWxheUNvdW50ZXIgKz0gdGhpcy5kZWxheUluY3JlbWVudDtcbiAgICByZXR1cm4gdGhpcy5kZWxheUNvdW50ZXI7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUoXG4gICAgZ3JvdXA6IFNWR0dFbGVtZW50LFxuICAgIGN4OiBudW1iZXIsXG4gICAgY3k6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3JtKFxuICAgICAgZ3JvdXAsXG4gICAgICBcImNpcmNsZVwiLFxuICAgICAge1xuICAgICAgICBjeCxcbiAgICAgICAgY3ksXG4gICAgICAgIHI6IDAsXG4gICAgICB9LFxuICAgICAgeyByIH0sXG4gICAgICBvcHRzXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlnb24oZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWdvblwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUG9seWxpbmUoZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZywgY3NzQ2xhc3MgPSBcImZ1bGxcIikge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWxpbmVcIixcbiAgICAgIHsgcG9pbnRzOiBcIlwiIH0sXG4gICAgICB7IHBvaW50czogcG9pbnRzIH0sXG4gICAgICB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRlbGF5OiB0aGlzLmdldERlbGF5KCksXG4gICAgICAgIGNsYXNzOiBjc3NDbGFzcyxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUmVjdChcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGludGVuc2l0eSA9IDYsXG4gICAgY3NzQ2xhc3MgPSBcImVtcHR5XCJcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJyZWN0XCIsXG4gICAgICB7IHgsIHksIHdpZHRoLCBoZWlnaHQ6IDAsIG9wYWNpdHk6IGludGVuc2l0eSAqICgxLjAgLyA2KSB9LFxuICAgICAgeyBoZWlnaHQ6IGhlaWdodCB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgICBjbGFzczogY3NzQ2xhc3MsXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZUZvcm0gPSA8VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgc3RyaW5nIH0+KFxuICAgIGNvbnRhaW5lcjogU1ZHR0VsZW1lbnQsXG4gICAgZWx0TmFtZTogc3RyaW5nLFxuICAgIGluaXRpYWxBdHRyaWJ1dGVzOiBULFxuICAgIGZpbmFsQXR0cmlidXRlczogUGFydGlhbDxUPixcbiAgICBvcHRpb25zPzogUGFydGlhbDxUcmFuc2l0aW9uT3B0aW9ucz5cbiAgKSA9PiB7XG4gICAgY29uc3Qgb3B0czogVHJhbnNpdGlvbk9wdGlvbnMgPSB7XG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIGRlbGF5OiAxMDAwLFxuICAgICAgY2xhc3M6IFwiXCIsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgaWYgKCF0aGlzLnVzZVRyYW5zaXRpb24pIHtcbiAgICAgIG9wdHMuZGVsYXkgPSAwO1xuICAgICAgb3B0cy5kdXJhdGlvbiA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGVsdCA9IGQzLnNlbGVjdChjb250YWluZXIpLmFwcGVuZChlbHROYW1lKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGluaXRpYWxBdHRyaWJ1dGVzKSkge1xuICAgICAgZWx0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChvcHRzLmNsYXNzKSB7XG4gICAgICBlbHQuYXR0cihcImNsYXNzXCIsIG9wdHMuY2xhc3MpO1xuICAgIH1cblxuICAgIGNvbnN0IHQgPSBlbHRcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbihvcHRzLmR1cmF0aW9uKVxuICAgICAgLmRlbGF5KG9wdHMuZGVsYXkpXG4gICAgICAuZWFzZShkMy5lYXNlTGluZWFyKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbmFsQXR0cmlidXRlcykpIHtcbiAgICAgIHQuYXR0cihrZXksIHZhbHVlKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4vbWlzY1wiO1xuXG5leHBvcnQgY29uc3QgaW5pdFRoZW1lID0gKCkgPT4ge1xuICBoYW5kbGVEYXJrVGhlbWUoKTtcblxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgXCItLXByaW1hcnktY29sb3JcIixcbiAgICBcImhzbCgxMjAsIDEwMCUsIDI1JSlcIlxuICApO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgXCItLWZpbGwtY29sb3JcIixcbiAgICBcImhzbGEoMTIwLCAwJSwgMjUlLCAwLjEpXCJcbiAgKTtcblxuICBoYW5kbGVVZ2x5VGhlbWUoKTtcbn07XG5cbmNvbnN0IGhhbmRsZURhcmtUaGVtZSA9ICgpID0+IHtcbiAgY29uc3QgaXNEYXJrID1cbiAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzO1xuXG4gIGNvbnN0IGNsID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3Q7XG4gIGlzRGFyayA/IGNsLmFkZChcImRhcmtcIikgOiBjbC5hZGQoXCJsaWdodFwiKTtcblxuICB3aW5kb3dcbiAgICAubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY29sb3JTY2hlbWUgPSBlLm1hdGNoZXMgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29sb3JTY2hlbWU6IFwiLCBjb2xvclNjaGVtZSk7XG5cbiAgICAgIGNsLnJlbW92ZShcImRhcmtcIik7XG4gICAgICBjbC5yZW1vdmUoXCJsaWdodFwiKTtcbiAgICAgIGlmIChjb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIpIHtcbiAgICAgICAgY2wuYWRkKFwiZGFya1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsLmFkZChcImxpZ2h0XCIpO1xuICAgICAgfVxuICAgIH0pO1xufTtcblxuKHdpbmRvdyBhcyBhbnkpLnRvZ2dsZVVnbHlUaGVtZSA9ICgpID0+IHtcbiAgbGV0IHRoZW1lTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGhlbWVcIik7XG4gIHRoZW1lTmFtZSA9IHRoZW1lTmFtZSAhPT0gXCJ1Z2x5XCIgPyBcInVnbHlcIiA6IFwiZGVmYXVsdFwiO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRoZW1lXCIsIHRoZW1lTmFtZSk7XG5cbiAgY29uc29sZS5sb2coXCJ1cGRhdGUgdGhlbWUgdG8gXCIgKyB0aGVtZU5hbWUpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ1Z2x5XCIpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJkZWZhdWx0XCIpO1xuXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGVtZU5hbWUpO1xuXG4gIHVwZGF0ZUJ1dHRvblRoZW1lKCk7XG59O1xuXG5jb25zdCBoYW5kbGVVZ2x5VGhlbWUgPSAoKSA9PiB7XG4gIGxldCB0aGVtZU5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRoZW1lXCIpO1xuICB0aGVtZU5hbWUgPSB0aGVtZU5hbWUgIT09IFwidWdseVwiID8gXCJkZWZhdWx0XCIgOiBcInVnbHlcIjtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoZW1lTmFtZSk7XG5cbiAgdXBkYXRlQnV0dG9uVGhlbWUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUJ1dHRvblRoZW1lID0gKCkgPT4ge1xuICBsZXQgdGhlbWVOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aGVtZVwiKTtcbiAgY29uc3QgbGFiZWwgPVxuICAgIHRoZW1lTmFtZSA9PT0gXCJ1Z2x5XCIgPyBcIlJlbWV0dHJlIGwnZXN0aMOpdGlxdWVcIiA6IFwiRW5sZXZlciBsJ2VzdGjDqXRpcXVlXCI7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24udG9nZ2xlLXRoZW1lXCIpO1xuICBpZiAoYnV0dG9uKSB7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGxhYmVsO1xuICB9XG5cbiAgY29uc3QgZGl2ID0gcXVlcnlTZWxlY3RvcihcImhlYWRlciBkaXYudWdseS10aGVtZVwiKTtcblxuICBkaXYuaW5uZXJIVE1MID1cbiAgICB0aGVtZU5hbWUgIT09IFwidWdseVwiXG4gICAgICA/IFwiXCJcbiAgICAgIDogYFxuPGJ1dHRvbiBvbkNsaWNrPVwid2luZG93LnRvZ2dsZVVnbHlUaGVtZSgpXCI+IFxuICBSZW1ldHRyZSBsJ2VzdGjDqXRpcXVlXG48L2J1dHRvbj5cbiAgICBgO1xufTtcbiIsImltcG9ydCBcIi4vc2Nzcy9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuL1NWR1Rvb2xcIjtcblxuaW1wb3J0IHsgaW5pdFRoZW1lIH0gZnJvbSBcIi4vdGhlbWVcIjtcblxuaW5pdFRoZW1lKCk7XG5cbmNvbnN0IHN2Z1Rvb2wgPSBuZXcgU1ZHVG9vbCgpO1xuc3ZnVG9vbC5pbml0U3ZnKCk7XG4iXSwibmFtZXMiOlsibm9vcCIsImRpc3BhdGNoIiwiaSIsIm4iLCJfIiwidCIsIkRpc3BhdGNoIiwicGFyc2VUeXBlbmFtZXMiLCJ0eXBlbmFtZXMiLCJ0eXBlcyIsIm5hbWUiLCJ0eXBlbmFtZSIsImNhbGxiYWNrIiwiVCIsImdldCIsInNldCIsImNvcHkiLCJ0eXBlIiwidGhhdCIsImFyZ3MiLCJjIiwieGh0bWwiLCJuYW1lc3BhY2VzIiwibmFtZXNwYWNlIiwicHJlZml4IiwiY3JlYXRvckluaGVyaXQiLCJkb2N1bWVudCIsInVyaSIsImNyZWF0b3JGaXhlZCIsImZ1bGxuYW1lIiwiY3JlYXRvciIsIm5vbmUiLCJzZWxlY3RvciIsInNlbGVjdGlvbl9zZWxlY3QiLCJzZWxlY3QiLCJncm91cHMiLCJtIiwic3ViZ3JvdXBzIiwiaiIsImdyb3VwIiwic3ViZ3JvdXAiLCJub2RlIiwic3Vibm9kZSIsIlNlbGVjdGlvbiIsImFycmF5IiwieCIsImVtcHR5Iiwic2VsZWN0b3JBbGwiLCJhcnJheUFsbCIsInNlbGVjdGlvbl9zZWxlY3RBbGwiLCJwYXJlbnRzIiwibWF0Y2hlciIsImNoaWxkTWF0Y2hlciIsImZpbmQiLCJjaGlsZEZpbmQiLCJtYXRjaCIsImNoaWxkRmlyc3QiLCJzZWxlY3Rpb25fc2VsZWN0Q2hpbGQiLCJmaWx0ZXIiLCJjaGlsZHJlbiIsImNoaWxkcmVuRmlsdGVyIiwic2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIiwic2VsZWN0aW9uX2ZpbHRlciIsInNwYXJzZSIsInVwZGF0ZSIsInNlbGVjdGlvbl9lbnRlciIsIkVudGVyTm9kZSIsInBhcmVudCIsImRhdHVtIiwiY2hpbGQiLCJuZXh0IiwiY29uc3RhbnQkMSIsImJpbmRJbmRleCIsImVudGVyIiwiZXhpdCIsImRhdGEiLCJncm91cExlbmd0aCIsImRhdGFMZW5ndGgiLCJiaW5kS2V5Iiwia2V5Iiwibm9kZUJ5S2V5VmFsdWUiLCJrZXlWYWx1ZXMiLCJrZXlWYWx1ZSIsInNlbGVjdGlvbl9kYXRhIiwidmFsdWUiLCJiaW5kIiwiY29uc3RhbnQiLCJhcnJheWxpa2UiLCJlbnRlckdyb3VwIiwidXBkYXRlR3JvdXAiLCJleGl0R3JvdXAiLCJpMCIsImkxIiwicHJldmlvdXMiLCJzZWxlY3Rpb25fZXhpdCIsInNlbGVjdGlvbl9qb2luIiwib25lbnRlciIsIm9udXBkYXRlIiwib25leGl0Iiwic2VsZWN0aW9uX21lcmdlIiwiY29udGV4dCIsInNlbGVjdGlvbiIsImdyb3VwczAiLCJncm91cHMxIiwibTAiLCJtMSIsIm1lcmdlcyIsImdyb3VwMCIsImdyb3VwMSIsIm1lcmdlIiwic2VsZWN0aW9uX29yZGVyIiwic2VsZWN0aW9uX3NvcnQiLCJjb21wYXJlIiwiYXNjZW5kaW5nIiwiY29tcGFyZU5vZGUiLCJhIiwiYiIsInNvcnRncm91cHMiLCJzb3J0Z3JvdXAiLCJzZWxlY3Rpb25fY2FsbCIsInNlbGVjdGlvbl9ub2RlcyIsInNlbGVjdGlvbl9ub2RlIiwic2VsZWN0aW9uX3NpemUiLCJzaXplIiwic2VsZWN0aW9uX2VtcHR5Iiwic2VsZWN0aW9uX2VhY2giLCJhdHRyUmVtb3ZlIiwiYXR0clJlbW92ZU5TIiwiYXR0ckNvbnN0YW50IiwiYXR0ckNvbnN0YW50TlMiLCJhdHRyRnVuY3Rpb24iLCJ2IiwiYXR0ckZ1bmN0aW9uTlMiLCJzZWxlY3Rpb25fYXR0ciIsImRlZmF1bHRWaWV3Iiwic3R5bGVSZW1vdmUiLCJzdHlsZUNvbnN0YW50IiwicHJpb3JpdHkiLCJzdHlsZUZ1bmN0aW9uIiwic2VsZWN0aW9uX3N0eWxlIiwic3R5bGVWYWx1ZSIsInByb3BlcnR5UmVtb3ZlIiwicHJvcGVydHlDb25zdGFudCIsInByb3BlcnR5RnVuY3Rpb24iLCJzZWxlY3Rpb25fcHJvcGVydHkiLCJjbGFzc0FycmF5Iiwic3RyaW5nIiwiY2xhc3NMaXN0IiwiQ2xhc3NMaXN0IiwiY2xhc3NlZEFkZCIsIm5hbWVzIiwibGlzdCIsImNsYXNzZWRSZW1vdmUiLCJjbGFzc2VkVHJ1ZSIsImNsYXNzZWRGYWxzZSIsImNsYXNzZWRGdW5jdGlvbiIsInNlbGVjdGlvbl9jbGFzc2VkIiwidGV4dFJlbW92ZSIsInRleHRDb25zdGFudCIsInRleHRGdW5jdGlvbiIsInNlbGVjdGlvbl90ZXh0IiwiaHRtbFJlbW92ZSIsImh0bWxDb25zdGFudCIsImh0bWxGdW5jdGlvbiIsInNlbGVjdGlvbl9odG1sIiwicmFpc2UiLCJzZWxlY3Rpb25fcmFpc2UiLCJsb3dlciIsInNlbGVjdGlvbl9sb3dlciIsInNlbGVjdGlvbl9hcHBlbmQiLCJjcmVhdGUiLCJjb25zdGFudE51bGwiLCJzZWxlY3Rpb25faW5zZXJ0IiwiYmVmb3JlIiwicmVtb3ZlIiwic2VsZWN0aW9uX3JlbW92ZSIsInNlbGVjdGlvbl9jbG9uZVNoYWxsb3ciLCJjbG9uZSIsInNlbGVjdGlvbl9jbG9uZURlZXAiLCJzZWxlY3Rpb25fY2xvbmUiLCJkZWVwIiwic2VsZWN0aW9uX2RhdHVtIiwiY29udGV4dExpc3RlbmVyIiwibGlzdGVuZXIiLCJldmVudCIsIm9uUmVtb3ZlIiwib24iLCJvbkFkZCIsIm9wdGlvbnMiLCJvIiwic2VsZWN0aW9uX29uIiwiZGlzcGF0Y2hFdmVudCIsInBhcmFtcyIsIndpbmRvdyIsImRpc3BhdGNoQ29uc3RhbnQiLCJkaXNwYXRjaEZ1bmN0aW9uIiwic2VsZWN0aW9uX2Rpc3BhdGNoIiwic2VsZWN0aW9uX2l0ZXJhdG9yIiwicm9vdCIsInNlbGVjdGlvbl9zZWxlY3Rpb24iLCJkZWZpbmUiLCJjb25zdHJ1Y3RvciIsImZhY3RvcnkiLCJwcm90b3R5cGUiLCJleHRlbmQiLCJkZWZpbml0aW9uIiwiQ29sb3IiLCJkYXJrZXIiLCJicmlnaHRlciIsInJlSSIsInJlTiIsInJlUCIsInJlSGV4IiwicmVSZ2JJbnRlZ2VyIiwicmVSZ2JQZXJjZW50IiwicmVSZ2JhSW50ZWdlciIsInJlUmdiYVBlcmNlbnQiLCJyZUhzbFBlcmNlbnQiLCJyZUhzbGFQZXJjZW50IiwibmFtZWQiLCJjb2xvciIsImNoYW5uZWxzIiwiY29sb3JfZm9ybWF0SGV4IiwiY29sb3JfZm9ybWF0SGV4OCIsImNvbG9yX2Zvcm1hdEhzbCIsImNvbG9yX2Zvcm1hdFJnYiIsImhzbENvbnZlcnQiLCJmb3JtYXQiLCJsIiwicmdibiIsIlJnYiIsInJnYmEiLCJoc2xhIiwiciIsImciLCJyZ2JDb252ZXJ0IiwicmdiIiwib3BhY2l0eSIsImsiLCJjbGFtcGkiLCJjbGFtcGEiLCJyZ2JfZm9ybWF0SGV4IiwicmdiX2Zvcm1hdEhleDgiLCJyZ2JfZm9ybWF0UmdiIiwiaGV4IiwiaCIsInMiLCJIc2wiLCJtaW4iLCJtYXgiLCJoc2wiLCJtMiIsImhzbDJyZ2IiLCJjbGFtcGgiLCJjbGFtcHQiLCJsaW5lYXIiLCJkIiwiZXhwb25lbnRpYWwiLCJ5IiwiZ2FtbWEiLCJub2dhbW1hIiwiaW50ZXJwb2xhdGVSZ2IiLCJyZ2JHYW1tYSIsInN0YXJ0IiwiZW5kIiwiY29sb3JSZ2IiLCJpbnRlcnBvbGF0ZU51bWJlciIsInJlQSIsInJlQiIsInplcm8iLCJvbmUiLCJpbnRlcnBvbGF0ZVN0cmluZyIsImJpIiwiYW0iLCJibSIsImJzIiwicSIsIm51bWJlciIsImRlZ3JlZXMiLCJpZGVudGl0eSIsImRlY29tcG9zZSIsImUiLCJmIiwic2NhbGVYIiwic2NhbGVZIiwic2tld1giLCJzdmdOb2RlIiwicGFyc2VDc3MiLCJwYXJzZVN2ZyIsImludGVycG9sYXRlVHJhbnNmb3JtIiwicGFyc2UiLCJweENvbW1hIiwicHhQYXJlbiIsImRlZ1BhcmVuIiwicG9wIiwidHJhbnNsYXRlIiwieGEiLCJ5YSIsInhiIiwieWIiLCJyb3RhdGUiLCJzY2FsZSIsImludGVycG9sYXRlVHJhbnNmb3JtQ3NzIiwiaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmciLCJmcmFtZSIsInRpbWVvdXQiLCJpbnRlcnZhbCIsInBva2VEZWxheSIsInRhc2tIZWFkIiwidGFza1RhaWwiLCJjbG9ja0xhc3QiLCJjbG9ja05vdyIsImNsb2NrU2tldyIsImNsb2NrIiwic2V0RnJhbWUiLCJub3ciLCJjbGVhck5vdyIsIlRpbWVyIiwidGltZXIiLCJkZWxheSIsInRpbWUiLCJzbGVlcCIsInRpbWVyRmx1c2giLCJ3YWtlIiwibmFwIiwicG9rZSIsInQwIiwidDEiLCJ0MiIsImVsYXBzZWQiLCJlbXB0eU9uIiwiZW1wdHlUd2VlbiIsIkNSRUFURUQiLCJTQ0hFRFVMRUQiLCJTVEFSVElORyIsIlNUQVJURUQiLCJSVU5OSU5HIiwiRU5ESU5HIiwiRU5ERUQiLCJzY2hlZHVsZSIsImlkIiwiaW5kZXgiLCJ0aW1pbmciLCJzY2hlZHVsZXMiLCJpbml0Iiwic2VsZiIsInR3ZWVuIiwic3RvcCIsInRpY2siLCJpbnRlcnJ1cHQiLCJhY3RpdmUiLCJzZWxlY3Rpb25faW50ZXJydXB0IiwidHdlZW5SZW1vdmUiLCJ0d2VlbjAiLCJ0d2VlbjEiLCJ0d2VlbkZ1bmN0aW9uIiwidHJhbnNpdGlvbl90d2VlbiIsInR3ZWVuVmFsdWUiLCJ0cmFuc2l0aW9uIiwiaW50ZXJwb2xhdGUiLCJ2YWx1ZTEiLCJzdHJpbmcwMCIsInN0cmluZzEiLCJpbnRlcnBvbGF0ZTAiLCJzdHJpbmcwIiwic3RyaW5nMTAiLCJ0cmFuc2l0aW9uX2F0dHIiLCJhdHRySW50ZXJwb2xhdGUiLCJhdHRySW50ZXJwb2xhdGVOUyIsImF0dHJUd2Vlbk5TIiwiYXR0clR3ZWVuIiwidHJhbnNpdGlvbl9hdHRyVHdlZW4iLCJkZWxheUZ1bmN0aW9uIiwiZGVsYXlDb25zdGFudCIsInRyYW5zaXRpb25fZGVsYXkiLCJkdXJhdGlvbkZ1bmN0aW9uIiwiZHVyYXRpb25Db25zdGFudCIsInRyYW5zaXRpb25fZHVyYXRpb24iLCJlYXNlQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2Vhc2UiLCJlYXNlVmFyeWluZyIsInRyYW5zaXRpb25fZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2ZpbHRlciIsIlRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uX21lcmdlIiwib25GdW5jdGlvbiIsIm9uMCIsIm9uMSIsInNpdCIsInRyYW5zaXRpb25fb24iLCJyZW1vdmVGdW5jdGlvbiIsInRyYW5zaXRpb25fcmVtb3ZlIiwidHJhbnNpdGlvbl9zZWxlY3QiLCJ0cmFuc2l0aW9uX3NlbGVjdEFsbCIsImluaGVyaXQiLCJ0cmFuc2l0aW9uX3NlbGVjdGlvbiIsInN0eWxlTnVsbCIsInN0eWxlIiwic3R5bGVNYXliZVJlbW92ZSIsImxpc3RlbmVyMCIsInRyYW5zaXRpb25fc3R5bGUiLCJzdHlsZUludGVycG9sYXRlIiwic3R5bGVUd2VlbiIsInRyYW5zaXRpb25fc3R5bGVUd2VlbiIsInRyYW5zaXRpb25fdGV4dCIsInRleHRJbnRlcnBvbGF0ZSIsInRleHRUd2VlbiIsInRyYW5zaXRpb25fdGV4dFR3ZWVuIiwidHJhbnNpdGlvbl90cmFuc2l0aW9uIiwiaWQwIiwiaWQxIiwibmV3SWQiLCJ0cmFuc2l0aW9uX2VuZCIsInJlc29sdmUiLCJyZWplY3QiLCJjYW5jZWwiLCJzZWxlY3Rpb25fcHJvdG90eXBlIiwiY3ViaWNJbk91dCIsImRlZmF1bHRUaW1pbmciLCJlYXNlQ3ViaWNJbk91dCIsInNlbGVjdGlvbl90cmFuc2l0aW9uIiwiVHJhbnNmb3JtIiwicG9pbnQiLCJsb2NhdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJlbHQiLCJmaXR0cyIsImJpZ1RhcmdldDEiLCJiaWdUYXJnZXQyIiwic21hbGxUYXJnZXQiLCJwdXJwb3NlIiwiaGljayIsImcxIiwiZzIiLCJnMyIsImc0IiwiZzUiLCJnNiIsImpha29iIiwiYXBwMSIsImFwcDIiLCJ5b3VyQXBwIiwiZ3JhZGllbnQiLCJnZXN0YWx0IiwicHJveGltaXR5Iiwib2Zmc2V0Iiwic2ltaWxhcml0eSIsIm15Q2xhc3MiLCJjb21tb25SZWdpb24iLCJzaW1wbGljaXR5IiwibWlsbGVyIiwidGVzbGVyIiwicG9zdGVsIiwiemVpZ2FybmlrIiwidm9uUmVzdG9yZmYiLCJwb2ludHMiLCJzeW1ldHJpZSIsInNlcmlhbFBvc2l0aW9uIiwiY3NzQ2xhc3MiLCJwYXJldG8iLCJwZWFrRW5kIiwiY29uZmlnIiwidmFsdWVzIiwiYWxsIiwiU1ZHVG9vbCIsIl9fcHVibGljRmllbGQiLCJjb250YWluZXIiLCJlbHROYW1lIiwiaW5pdGlhbEF0dHJpYnV0ZXMiLCJmaW5hbEF0dHJpYnV0ZXMiLCJvcHRzIiwiZDMuc2VsZWN0IiwiZDMuZWFzZUxpbmVhciIsInV4bGF3SW1hZ2VOYW1lIiwidXhsYXdDbGFzc05hbWUiLCJzdmdOYW1lIiwiY3giLCJjeSIsIndpZHRoIiwiaGVpZ2h0IiwiaW50ZW5zaXR5IiwiaW5pdFRoZW1lIiwiaGFuZGxlRGFya1RoZW1lIiwiaGFuZGxlVWdseVRoZW1lIiwiaXNEYXJrIiwiY2wiLCJjb2xvclNjaGVtZSIsInRoZW1lTmFtZSIsInVwZGF0ZUJ1dHRvblRoZW1lIiwibGFiZWwiLCJidXR0b24iLCJkaXYiLCJzdmdUb29sIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxLQUFPLEVBQUMsT0FBTyxNQUFNO0FBQUEsRUFBRTtBQUUzQixTQUFTQyxLQUFXO0FBQ2xCLFdBQVNDLElBQUksR0FBR0MsSUFBSSxVQUFVLFFBQVFDLElBQUksQ0FBQSxHQUFJQyxHQUFHSCxJQUFJQyxHQUFHLEVBQUVELEdBQUc7QUFDM0QsUUFBSSxFQUFFRyxJ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QUNWLFNBQVM7QUFBQSxFQUNULE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUNWLFVBQVU7QUFBQSxFQUNWLGVBQWU7QUFBQSxFQUNmLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLFlBQVk7QUFBQSxFQUNaLFlBQVk7QUFBQSxFQUNaLFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLE9BQU87QUFBQSxFQUNQLFVBQVU7QUFBQSxFQUNWLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFBQSxFQUNYLGNBQWM7QUFBQSxFQUNkLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLHNCQUFzQjtBQUFBLEVBQ3RCLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxFQUNkLGdCQUFnQjtBQUFBLEVBQ2hCLGdCQUFnQjtBQUFBLEVBQ2hCLGdCQUFnQjtBQUFBLEVBQ2hCLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGdCQUFnQjtBQUFBLEVBQ2hCLGlCQUFpQjtBQUFBLEVBQ2pCLG1CQUFtQjtBQUFBLEVBQ25CLGlCQUFpQjtBQUFBLEVBQ2pCLGlCQUFpQjtBQUFBLEVBQ2pCLGNBQWM7QUFBQSxFQUNkLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFBQSxFQUNYLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxFQUNaLFFBQVE7QUFBQSxFQUNSLGVBQWU7QUFBQSxFQUNmLEtBQUs7QUFBQSxFQUNMLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLFFBQVE7QUFBQSxFQUNSLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFdBQVc7QUFB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
