var ye = Object.defineProperty;
var me = (t, e, n) => e in t ? ye(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var G = (t, e, n) => (me(t, typeof e != "symbol" ? e + "" : e, n), n);
var _e = { value: () => {
} };
function Xt() {
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
function ve(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
J.prototype = Xt.prototype = {
  constructor: J,
  on: function(t, e) {
    var n = this._, r = ve(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; )
        if ((i = (t = r[s]).type) && (i = we(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type)
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
      for (var n = new Array(i), r = 0, i, s; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r)
      s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i)
      r[i].value.apply(e, n);
  }
};
function we(t, e) {
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
var ut = "http://www.w3.org/1999/xhtml";
const Nt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ut,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function st(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Nt.hasOwnProperty(e) ? { space: Nt[e], local: t } : t;
}
function xe(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ut && e.documentElement.namespaceURI === ut ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function be(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ot(t) {
  var e = st(t);
  return (e.local ? be : xe)(e);
}
function Ee() {
}
function mt(t) {
  return t == null ? Ee : function() {
    return this.querySelector(t);
  };
}
function Se(t) {
  typeof t != "function" && (t = mt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), l, c, u = 0; u < o; ++u)
      (l = s[u]) && (c = t.call(l, l.__data__, u, s)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new _(r, this._parents);
}
function Ce(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ne() {
  return [];
}
function Lt(t) {
  return t == null ? Ne : function() {
    return this.querySelectorAll(t);
  };
}
function ke(t) {
  return function() {
    return Ce(t.apply(this, arguments));
  };
}
function Ae(t) {
  typeof t == "function" ? t = ke(t) : t = Lt(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && (r.push(t.call(l, l.__data__, c, o)), i.push(l));
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
var $e = Array.prototype.find;
function Ge(t) {
  return function() {
    return $e.call(this.children, t);
  };
}
function Re() {
  return this.firstElementChild;
}
function Te(t) {
  return this.select(t == null ? Re : Ge(typeof t == "function" ? t : zt(t)));
}
var Ve = Array.prototype.filter;
function Me() {
  return Array.from(this.children);
}
function Fe(t) {
  return function() {
    return Ve.call(this.children, t);
  };
}
function De(t) {
  return this.selectAll(t == null ? Me : Fe(typeof t == "function" ? t : zt(t)));
}
function Ie(t) {
  typeof t != "function" && (t = Yt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], l, c = 0; c < o; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && a.push(l);
  return new _(r, this._parents);
}
function Bt(t) {
  return new Array(t.length);
}
function Pe() {
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
function qe(t, e, n, r, i, s) {
  for (var o = 0, a, l = e.length, c = s.length; o < c; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new j(t, s[o]);
  for (; o < l; ++o)
    (a = e[o]) && (i[o] = a);
}
function Xe(t, e, n, r, i, s, o) {
  var a, l, c = /* @__PURE__ */ new Map(), u = e.length, f = s.length, h = new Array(u), g;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (h[a] = g = o.call(l, l.__data__, a, e) + "", c.has(g) ? i[a] = l : c.set(g, l));
  for (a = 0; a < f; ++a)
    g = o.call(t, s[a], a, s) + "", (l = c.get(g)) ? (r[a] = l, l.__data__ = s[a], c.delete(g)) : n[a] = new j(t, s[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && c.get(h[a]) === l && (i[a] = l);
}
function Oe(t) {
  return t.__data__;
}
function Le(t, e) {
  if (!arguments.length)
    return Array.from(this, Oe);
  var n = e ? Xe : qe, r = this._parents, i = this._groups;
  typeof t != "function" && (t = He(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), l = new Array(s), c = 0; c < s; ++c) {
    var u = r[c], f = i[c], h = f.length, g = Ye(t.call(u, u && u.__data__, c, r)), d = g.length, y = a[c] = new Array(d), N = o[c] = new Array(d), de = l[c] = new Array(h);
    n(u, f, y, N, de, g, e);
    for (var M = 0, z = 0, Et, St; M < d; ++M)
      if (Et = y[M]) {
        for (M >= z && (z = M + 1); !(St = N[z]) && ++z < d; )
          ;
        Et._next = St || null;
      }
  }
  return o = new _(o, r), o._enter = a, o._exit = l, o;
}
function Ye(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ze() {
  return new _(this._exit || this._groups.map(Bt), this._parents);
}
function Be(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Ue(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), l = 0; l < o; ++l)
    for (var c = n[l], u = r[l], f = c.length, h = a[l] = new Array(f), g, d = 0; d < f; ++d)
      (g = c[d] || u[d]) && (h[d] = g);
  for (; l < i; ++l)
    a[l] = n[l];
  return new _(a, this._parents);
}
function Ke() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function We(t) {
  t || (t = Je);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, l = i[s] = new Array(a), c, u = 0; u < a; ++u)
      (c = o[u]) && (l[u] = c);
    l.sort(e);
  }
  return new _(i, this._parents).order();
}
function Je(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Qe() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ze() {
  return Array.from(this);
}
function je() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o)
        return o;
    }
  return null;
}
function tn() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function en() {
  return !this.node();
}
function nn(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function rn(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function sn(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function on(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function an(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ln(t, e) {
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
  var n = st(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? sn : rn : typeof e == "function" ? n.local ? cn : ln : n.local ? an : on)(n, e));
}
function Ut(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function fn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function hn(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function gn(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function pn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? fn : typeof e == "function" ? gn : hn)(t, e, n ?? "")) : T(this.node(), t);
}
function T(t, e) {
  return t.style.getPropertyValue(e) || Ut(t).getComputedStyle(t, null).getPropertyValue(e);
}
function dn(t) {
  return function() {
    delete this[t];
  };
}
function yn(t, e) {
  return function() {
    this[t] = e;
  };
}
function mn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function _n(t, e) {
  return arguments.length > 1 ? this.each((e == null ? dn : typeof e == "function" ? mn : yn)(t, e)) : this.node()[t];
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
function vn(t) {
  return function() {
    Jt(this, t);
  };
}
function wn(t) {
  return function() {
    Qt(this, t);
  };
}
function xn(t, e) {
  return function() {
    (e.apply(this, arguments) ? Jt : Qt)(this, t);
  };
}
function bn(t, e) {
  var n = Kt(t + "");
  if (arguments.length < 2) {
    for (var r = _t(this.node()), i = -1, s = n.length; ++i < s; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? xn : e ? vn : wn)(n, e));
}
function En() {
  this.textContent = "";
}
function Sn(t) {
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
function Nn(t) {
  return arguments.length ? this.each(t == null ? En : (typeof t == "function" ? Cn : Sn)(t)) : this.node().textContent;
}
function kn() {
  this.innerHTML = "";
}
function An(t) {
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
function Gn(t) {
  return arguments.length ? this.each(t == null ? kn : (typeof t == "function" ? $n : An)(t)) : this.node().innerHTML;
}
function Rn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Tn() {
  return this.each(Rn);
}
function Vn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mn() {
  return this.each(Vn);
}
function Fn(t) {
  var e = typeof t == "function" ? t : Ot(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Dn() {
  return null;
}
function In(t, e) {
  var n = typeof t == "function" ? t : Ot(t), r = e == null ? Dn : typeof e == "function" ? e : mt(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Pn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Hn() {
  return this.each(Pn);
}
function qn() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function On(t) {
  return this.select(t ? Xn : qn);
}
function Ln(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Yn(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function zn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Bn(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Un(t, e, n) {
  return function() {
    var r = this.__on, i, s = Yn(e);
    if (r) {
      for (var o = 0, a = r.length; o < a; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Kn(t, e, n) {
  var r = zn(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (i = 0, u = a[l]; i < s; ++i)
          if ((o = r[i]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? Un : Bn, i = 0; i < s; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Zt(t, e, n) {
  var r = Ut(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Wn(t, e) {
  return function() {
    return Zt(this, t, e);
  };
}
function Jn(t, e) {
  return function() {
    return Zt(this, t, e.apply(this, arguments));
  };
}
function Qn(t, e) {
  return this.each((typeof e == "function" ? Jn : Wn)(t, e));
}
function* Zn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var jt = [null];
function _(t, e) {
  this._groups = t, this._parents = e;
}
function L() {
  return new _([[document.documentElement]], jt);
}
function jn() {
  return this;
}
_.prototype = L.prototype = {
  constructor: _,
  select: Se,
  selectAll: Ae,
  selectChild: Te,
  selectChildren: De,
  filter: Ie,
  data: Le,
  enter: Pe,
  exit: ze,
  join: Be,
  merge: Ue,
  selection: jn,
  order: Ke,
  sort: We,
  call: Qe,
  nodes: Ze,
  node: je,
  size: tn,
  empty: en,
  each: nn,
  attr: un,
  style: pn,
  property: _n,
  classed: bn,
  text: Nn,
  html: Gn,
  raise: Tn,
  lower: Mn,
  append: Fn,
  insert: In,
  remove: Hn,
  clone: On,
  datum: Ln,
  on: Kn,
  dispatch: Qn,
  [Symbol.iterator]: Zn
};
function tr(t) {
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
var H = 0.7, tt = 1 / H, R = "\\s*([+-]?\\d+)\\s*", q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", x = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", er = /^#([0-9a-f]{3,8})$/, nr = new RegExp(`^rgb\\(${R},${R},${R}\\)$`), rr = new RegExp(`^rgb\\(${x},${x},${x}\\)$`), ir = new RegExp(`^rgba\\(${R},${R},${R},${q}\\)$`), sr = new RegExp(`^rgba\\(${x},${x},${x},${q}\\)$`), or = new RegExp(`^hsl\\(${q},${x},${x}\\)$`), ar = new RegExp(`^hsla\\(${q},${x},${x},${q}\\)$`), kt = {
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
vt(Y, X, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: At,
  // Deprecated! Use color.formatHex.
  formatHex: At,
  formatHex8: lr,
  formatHsl: cr,
  formatRgb: $t,
  toString: $t
});
function At() {
  return this.rgb().formatHex();
}
function lr() {
  return this.rgb().formatHex8();
}
function cr() {
  return ee(this).formatHsl();
}
function $t() {
  return this.rgb().formatRgb();
}
function X(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = er.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Gt(e) : n === 3 ? new m(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? B(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? B(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = nr.exec(t)) ? new m(e[1], e[2], e[3], 1) : (e = rr.exec(t)) ? new m(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ir.exec(t)) ? B(e[1], e[2], e[3], e[4]) : (e = sr.exec(t)) ? B(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = or.exec(t)) ? Vt(e[1], e[2] / 100, e[3] / 100, 1) : (e = ar.exec(t)) ? Vt(e[1], e[2] / 100, e[3] / 100, e[4]) : kt.hasOwnProperty(t) ? Gt(kt[t]) : t === "transparent" ? new m(NaN, NaN, NaN, 0) : null;
}
function Gt(t) {
  return new m(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function B(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new m(t, e, n, r);
}
function ur(t) {
  return t instanceof Y || (t = X(t)), t ? (t = t.rgb(), new m(t.r, t.g, t.b, t.opacity)) : new m();
}
function ft(t, e, n, r) {
  return arguments.length === 1 ? ur(t) : new m(t, e, n, r ?? 1);
}
function m(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
vt(m, ft, te(Y, {
  brighter(t) {
    return t = t == null ? tt : Math.pow(tt, t), new m(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new m(this.r * t, this.g * t, this.b * t, this.opacity);
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
  formatHex8: fr,
  formatRgb: Tt,
  toString: Tt
}));
function Rt() {
  return `#${k(this.r)}${k(this.g)}${k(this.b)}`;
}
function fr() {
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
  if (t instanceof Y || (t = X(t)), !t)
    return new v();
  if (t instanceof v)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, l = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= l < 0.5 ? s + i : 2 - s - i, o *= 60) : a = l > 0 && l < 1 ? 0 : o, new v(o, a, l, t.opacity);
}
function hr(t, e, n, r) {
  return arguments.length === 1 ? ee(t) : new v(t, e, n, r ?? 1);
}
function v(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
vt(v, hr, te(Y, {
  brighter(t) {
    return t = t == null ? tt : Math.pow(tt, t), new v(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? H : Math.pow(H, t), new v(this.h, this.s, this.l * t, this.opacity);
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
function gr(t, e) {
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
  return (t = +t) == 1 ? re : function(e, n) {
    return n - e ? pr(e, n, t) : ne(isNaN(e) ? n : e);
  };
}
function re(t, e) {
  var n = e - t;
  return n ? gr(t, n) : ne(isNaN(t) ? e : t);
}
const Ft = function t(e) {
  var n = dr(e);
  function r(i, s) {
    var o = n((i = ft(i)).r, (s = ft(s)).r), a = n(i.g, s.g), l = n(i.b, s.b), c = re(i.opacity, s.opacity);
    return function(u) {
      return i.r = o(u), i.g = a(u), i.b = l(u), i.opacity = c(u), i + "";
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
function yr(t) {
  return function() {
    return t;
  };
}
function mr(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _r(t, e) {
  var n = ht.lastIndex = ct.lastIndex = 0, r, i, s, o = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = ht.exec(t)) && (i = ct.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, l.push({ i: o, x: C(r, i) })), n = ct.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? l[0] ? mr(l[0].x) : yr(e) : (e = l.length, function(c) {
    for (var u = 0, f; u < e; ++u)
      a[(f = l[u]).i] = f.x(c);
    return a.join("");
  });
}
var Dt = 180 / Math.PI, gt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ie(t, e, n, r, i, s) {
  var o, a, l;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (l = t * n + e * r) && (n -= t * l, r -= e * l), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, l /= a), t * r < e * n && (t = -t, e = -e, l = -l, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * Dt,
    skewX: Math.atan(l) * Dt,
    scaleX: o,
    scaleY: a
  };
}
var K;
function vr(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? gt : ie(e.a, e.b, e.c, e.d, e.e, e.f);
}
function wr(t) {
  return t == null || (K || (K = document.createElementNS("http://www.w3.org/2000/svg", "g")), K.setAttribute("transform", t), !(t = K.transform.baseVal.consolidate())) ? gt : (t = t.matrix, ie(t.a, t.b, t.c, t.d, t.e, t.f));
}
function se(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, u, f, h, g, d) {
    if (c !== f || u !== h) {
      var y = g.push("translate(", null, e, null, n);
      d.push({ i: y - 4, x: C(c, f) }, { i: y - 2, x: C(u, h) });
    } else
      (f || h) && g.push("translate(" + f + e + h + n);
  }
  function o(c, u, f, h) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: C(c, u) })) : u && f.push(i(f) + "rotate(" + u + r);
  }
  function a(c, u, f, h) {
    c !== u ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: C(c, u) }) : u && f.push(i(f) + "skewX(" + u + r);
  }
  function l(c, u, f, h, g, d) {
    if (c !== f || u !== h) {
      var y = g.push(i(g) + "scale(", null, ",", null, ")");
      d.push({ i: y - 4, x: C(c, f) }, { i: y - 2, x: C(u, h) });
    } else
      (f !== 1 || h !== 1) && g.push(i(g) + "scale(" + f + "," + h + ")");
  }
  return function(c, u) {
    var f = [], h = [];
    return c = t(c), u = t(u), s(c.translateX, c.translateY, u.translateX, u.translateY, f, h), o(c.rotate, u.rotate, f, h), a(c.skewX, u.skewX, f, h), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, f, h), c = u = null, function(g) {
      for (var d = -1, y = h.length, N; ++d < y; )
        f[(N = h[d]).i] = N.x(g);
      return f.join("");
    };
  };
}
var xr = se(vr, "px, ", "px)", "deg)"), br = se(wr, ", ", ")", ")"), V = 0, D = 0, F = 0, oe = 1e3, nt, I, rt = 0, $ = 0, ot = 0, O = typeof performance == "object" && performance.now ? performance : Date, ae = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function wt() {
  return $ || (ae(Er), $ = O.now() + ot);
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
    n = (n == null ? wt() : +n) + (e == null ? 0 : +e), !this._next && I !== this && (I ? I._next = this : nt = this, I = this), this._call = t, this._time = n, pt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, pt());
  }
};
function le(t, e, n) {
  var r = new it();
  return r.restart(t, e, n), r;
}
function Sr() {
  wt(), ++V;
  for (var t = nt, e; t; )
    (e = $ - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --V;
}
function It() {
  $ = (rt = O.now()) + ot, V = D = 0;
  try {
    Sr();
  } finally {
    V = 0, Nr(), $ = 0;
  }
}
function Cr() {
  var t = O.now(), e = t - rt;
  e > oe && (ot -= e, rt = t);
}
function Nr() {
  for (var t, e = nt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : nt = n);
  I = t, pt(r);
}
function pt(t) {
  if (!V) {
    D && (D = clearTimeout(D));
    var e = t - $;
    e > 24 ? (t < 1 / 0 && (D = setTimeout(It, t - O.now() - ot)), F && (F = clearInterval(F))) : (F || (rt = O.now(), F = setInterval(Cr, oe)), V = 1, ae(It));
  }
}
function Pt(t, e, n) {
  var r = new it();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var kr = Xt("start", "end", "cancel", "interrupt"), Ar = [], ce = 0, Ht = 1, dt = 2, Q = 3, qt = 4, yt = 5, Z = 6;
function at(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (n in o)
    return;
  $r(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: kr,
    tween: Ar,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
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
function $r(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = le(s, 0, n.time);
  function s(c) {
    n.state = Ht, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var u, f, h, g;
    if (n.state !== Ht)
      return l();
    for (u in r)
      if (g = r[u], g.name === n.name) {
        if (g.state === Q)
          return Pt(o);
        g.state === qt ? (g.state = Z, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[u]) : +u < e && (g.state = Z, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[u]);
      }
    if (Pt(function() {
      n.state === Q && (n.state = qt, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = dt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === dt) {
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
function Gr(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > dt && r.state < yt, r.state = Z, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Rr(t) {
  return this.each(function() {
    Gr(this, t);
  });
}
function Tr(t, e) {
  var n, r;
  return function() {
    var i = b(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, a = r.length; o < a; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Vr(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var s = b(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var a = { name: e, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = a;
          break;
        }
      l === c && i.push(a);
    }
    s.tween = i;
  };
}
function Mr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = w(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Tr : Vr)(n, t, e));
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
  return (typeof e == "number" ? C : e instanceof X ? Ft : (n = X(e)) ? (e = n, Ft) : _r)(t, e);
}
function Fr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Dr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ir(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Pr(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Hr(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), l = a + "", o === l ? null : o === r && l === i ? s : (i = l, s = e(r = o, a)));
  };
}
function qr(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), l = a + "", o === l ? null : o === r && l === i ? s : (i = l, s = e(r = o, a)));
  };
}
function Xr(t, e) {
  var n = st(t), r = n === "transform" ? br : ue;
  return this.attrTween(t, typeof e == "function" ? (n.local ? qr : Hr)(n, r, bt(this, "attr." + t, e)) : e == null ? (n.local ? Dr : Fr)(n) : (n.local ? Pr : Ir)(n, r, e));
}
function Or(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Lr(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Yr(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Lr(t, s)), n;
  }
  return i._value = e, i;
}
function zr(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Or(t, s)), n;
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
  var r = st(t);
  return this.tween(n, (r.local ? Yr : zr)(r, e));
}
function Ur(t, e) {
  return function() {
    xt(this, t).delay = +e.apply(this, arguments);
  };
}
function Kr(t, e) {
  return e = +e, function() {
    xt(this, t).delay = e;
  };
}
function Wr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ur : Kr)(e, t)) : w(this.node(), e).delay;
}
function Jr(t, e) {
  return function() {
    b(this, t).duration = +e.apply(this, arguments);
  };
}
function Qr(t, e) {
  return e = +e, function() {
    b(this, t).duration = e;
  };
}
function Zr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Jr : Qr)(e, t)) : w(this.node(), e).duration;
}
function jr(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    b(this, t).ease = e;
  };
}
function ti(t) {
  var e = this._id;
  return arguments.length ? this.each(jr(e, t)) : w(this.node(), e).ease;
}
function ei(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    b(this, t).ease = n;
  };
}
function ni(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ei(this._id, t));
}
function ri(t) {
  typeof t != "function" && (t = Yt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], l, c = 0; c < o; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && a.push(l);
  return new S(r, this._parents, this._name, this._id);
}
function ii(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), a = 0; a < s; ++a)
    for (var l = e[a], c = n[a], u = l.length, f = o[a] = new Array(u), h, g = 0; g < u; ++g)
      (h = l[g] || c[g]) && (f[g] = h);
  for (; a < r; ++a)
    o[a] = e[a];
  return new S(o, this._parents, this._name, this._id);
}
function si(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function oi(t, e, n) {
  var r, i, s = si(e) ? xt : b;
  return function() {
    var o = s(this, t), a = o.on;
    a !== r && (i = (r = a).copy()).on(e, n), o.on = i;
  };
}
function ai(t, e) {
  var n = this._id;
  return arguments.length < 2 ? w(this.node(), n).on.on(t) : this.each(oi(n, t, e));
}
function li(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function ci() {
  return this.on("end.remove", li(this._id));
}
function ui(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = mt(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = r[o], l = a.length, c = s[o] = new Array(l), u, f, h = 0; h < l; ++h)
      (u = a[h]) && (f = t.call(u, u.__data__, h, a)) && ("__data__" in u && (f.__data__ = u.__data__), c[h] = f, at(c[h], e, n, h, c, w(u, n)));
  return new S(s, this._parents, e, n);
}
function fi(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Lt(t));
  for (var r = this._groups, i = r.length, s = [], o = [], a = 0; a < i; ++a)
    for (var l = r[a], c = l.length, u, f = 0; f < c; ++f)
      if (u = l[f]) {
        for (var h = t.call(u, u.__data__, f, l), g, d = w(u, n), y = 0, N = h.length; y < N; ++y)
          (g = h[y]) && at(g, e, n, y, h, d);
        s.push(h), o.push(u);
      }
  return new S(s, o, e, n);
}
var hi = L.prototype.constructor;
function gi() {
  return new hi(this._groups, this._parents);
}
function pi(t, e) {
  var n, r, i;
  return function() {
    var s = T(this, t), o = (this.style.removeProperty(t), T(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function fe(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function di(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = T(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function yi(t, e, n) {
  var r, i, s;
  return function() {
    var o = T(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), T(this, t))), o === l ? null : o === r && l === i ? s : (i = l, s = e(r = o, a));
  };
}
function mi(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, a;
  return function() {
    var l = b(this, t), c = l.on, u = l.value[s] == null ? a || (a = fe(e)) : void 0;
    (c !== n || i !== u) && (r = (n = c).copy()).on(o, i = u), l.on = r;
  };
}
function _i(t, e, n) {
  var r = (t += "") == "transform" ? xr : ue;
  return e == null ? this.styleTween(t, pi(t, r)).on("end.style." + t, fe(t)) : typeof e == "function" ? this.styleTween(t, yi(t, r, bt(this, "style." + t, e))).each(mi(this._id, t)) : this.styleTween(t, di(t, r, e), n).on("end.style." + t, null);
}
function vi(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function wi(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && vi(t, o, n)), r;
  }
  return s._value = e, s;
}
function xi(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, wi(t, e, n ?? ""));
}
function bi(t) {
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
function Si(t) {
  return this.tween("text", typeof t == "function" ? Ei(bt(this, "text", t)) : bi(t == null ? "" : t + ""));
}
function Ci(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ni(t) {
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
  return this.tween(e, Ni(t));
}
function Ai() {
  for (var t = this._name, e = this._id, n = he(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, l, c = 0; c < a; ++c)
      if (l = o[c]) {
        var u = w(l, e);
        at(l, t, n, c, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new S(r, this._parents, t, n);
}
function $i() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, l = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var c = b(this, r), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), i === 0 && s();
  });
}
var Gi = 0;
function S(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function he() {
  return ++Gi;
}
var E = L.prototype;
S.prototype = {
  constructor: S,
  select: ui,
  selectAll: fi,
  selectChild: E.selectChild,
  selectChildren: E.selectChildren,
  filter: ri,
  merge: ii,
  selection: gi,
  transition: Ai,
  call: E.call,
  nodes: E.nodes,
  node: E.node,
  size: E.size,
  empty: E.empty,
  each: E.each,
  on: ai,
  attr: Xr,
  attrTween: Br,
  style: _i,
  styleTween: xi,
  text: Si,
  textTween: ki,
  remove: ci,
  tween: Mr,
  delay: Wr,
  duration: Zr,
  ease: ti,
  easeVarying: ni,
  end: $i,
  [Symbol.iterator]: E[Symbol.iterator]
};
const Ri = (t) => +t;
function Ti(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Vi = {
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
function Fi(t) {
  var e, n;
  t instanceof S ? (e = t._id, t = t._name) : (e = he(), (n = Vi).time = wt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && at(l, t, e, c, o, n || Mi(l, e));
  return new S(r, this._parents, t, e);
}
L.prototype.interrupt = Rr;
L.prototype.transition = Fi;
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
const p = (t, e) => {
  const n = document.querySelector(t);
  if (n === null)
    throw new Error("Cannot find selector " + t);
  if (e !== void 0 && !(n instanceof e))
    throw new Error(`Selector ${t} not of type ${e}`);
  return n;
}, Di = (t) => {
  const e = p("svg.fitts g.big-target1", SVGGElement);
  t.createCircle(e, 40, 50, 35), t.createCircle(e, 40, 50, 25), t.createCircle(e, 40, 50, 15), t.createCircle(e, 40, 50, 5);
  const n = p("svg.fitts g.big-target2", SVGGElement);
  t.createCircle(n, 40, 50, 35), t.createCircle(n, 40, 50, 25), t.createCircle(n, 40, 50, 15), t.createCircle(n, 40, 50, 5);
  const r = p("svg.fitts g.small-target", SVGGElement);
  t.createCircle(r, 40, 50, 5);
}, Ii = (t) => {
  const e = p("svg.purpose g.target", SVGGElement);
  t.createCircle(e, 150, 50, 40), t.createCircle(e, 150, 50, 30), t.createCircle(e, 150, 50, 20), t.createCircle(e, 150, 50, 10), t.createCircle(e, 150, 50, 1);
}, Pi = (t) => {
  const e = p("svg.hick g.choice-01", SVGGElement);
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
  const n = p("svg.hick g.choice-02", SVGGElement);
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
  const r = p("svg.hick g.choice-03", SVGGElement);
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
  const i = p("svg.hick g.choice-04", SVGGElement);
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
  const s = p("svg.hick g.choice-05", SVGGElement);
  t.createForm(
    s,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,0 0,40 40,20" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
  const o = p("svg.hick g.choice-06", SVGGElement);
  t.createForm(
    o,
    "polygon",
    { points: "0,0 0,0 0,0 0,0" },
    { points: "0,40 40,40 20,0" },
    {
      duration: 300,
      delay: t.getDelay()
    }
  );
}, Hi = (t) => {
  const e = p("svg.jakob g.app-1", SVGGElement);
  t.createCircle(e, 40, 50, 35);
  const n = p("svg.jakob g.app-2", SVGGElement);
  t.createCircle(n, 40, 50, 35);
  const r = p("svg.jakob g.your-app", SVGGElement);
  t.createCircle(r, 40, 50, 35);
}, qi = (t) => {
  const e = p("svg.gradient g", SVGGElement);
  t.createRect(e, 5, 30, 40, 40, 1), t.createRect(e, 50, 30, 40, 40, 2), t.createRect(e, 95, 30, 40, 40, 3), t.createRect(e, 140, 30, 40, 40, 4), t.createRect(e, 185, 30, 40, 40, 5), t.createRect(e, 230, 30, 40, 40, 6);
}, Xi = (t) => {
  const e = p("svg.gestalt g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, Oi = (t) => {
  const e = p("svg.proximity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? 8 : 0;
      t.createCircle(e, n * 20 + 100 + i, r * 20 + 20 - i, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
    }
}, Li = (t) => {
  const e = p("svg.similarity g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n > 1 && r < 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, Yi = (t) => {
  const e = p("svg.commonRegion g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++)
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: "full",
        delay: 0,
        duration: 300
      });
}, zi = (t) => {
  const e = p("svg.simplicity g", SVGGElement);
  t.createRect(e, 100 + 32, 12, 57, 37, 2), t.createRect(e, 100 - 8, 12, 97, 77, 2);
}, Bi = (t) => {
  const e = p("svg.miller g", SVGGElement);
  t.createCircle(e, 130, 20, 5, { class: "full" }), t.createCircle(e, 150, 20, 5, { class: "full" }), t.createCircle(e, 170, 20, 5, { class: "full" }), t.createCircle(e, 170, 40, 5, { class: "full" }), t.createCircle(e, 170, 60, 5, { class: "full" }), t.createCircle(e, 170, 80, 5, { class: "full" });
}, Ui = (t) => {
  const e = p("svg.tesler g", SVGGElement);
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 20, 5, {
      class: n >= 3 ? "empty" : "full"
    });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 50, 5, { class: n % 2 ? "empty" : "full" });
  for (let n = 0; n < 6; n++)
    t.createCircle(e, 100 + n * 20, 80, 5, { class: n < 3 ? "empty" : "full" });
}, Ki = (t) => {
  const e = p("svg.postel g", SVGGElement);
  t.createCircle(e, 80, 50, 35, { class: "full" }), t.createCircle(e, 220, 50, 35, { class: "empty" });
}, Wi = (t) => {
  const e = p("svg.zeigarnik g", SVGGElement);
  for (let n = 1; n < 5; n++)
    t.createRect(e, 50, n * 15, 200, 10, 6, "emptyrect");
  t.createRect(e, 50, 5 * 15, 150, 10, 6, "fullrect");
}, Ji = (t) => {
  const e = p("svg.vonRestorff g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n === 2 && r === 2 ? "xxx" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i,
        delay: 0,
        duration: 300
      });
    }
}, W = "20,10, 20,20 10,30, 20,40 20,50, 10,50 10,60 20,60 20,70 20,80 10,90", Qi = (t) => {
  const e = p(".symetrie svg g", SVGGElement);
  e.innerHTML = `
<g class="p1" transform="translate(60)"></g>
<g class="p2" transform="translate(80)"></g>
<g class="p3" transform="translate(180)"></g>
<g class="p4" transform="translate(230) scale(-1, 1)"></g>
`;
  const n = p(".symetrie svg g.p1", SVGGElement);
  t.createPolyline(n, W, "empty");
  const r = p(".symetrie svg g.p2", SVGGElement);
  t.createPolyline(r, W, "empty");
  const i = p(".symetrie svg g.p3", SVGGElement);
  t.createPolyline(i, W, "empty");
  const s = p(".symetrie svg g.p4", SVGGElement);
  t.createPolyline(s, W, "empty");
}, Zi = (t) => {
  const e = p(".serialPosition svg g", SVGGElement);
  for (let n = 0; n < 7; n++) {
    const r = n === 0 || n === 6 ? "full" : "empty";
    t.createCircle(e, n * 40 + 30, 50, 20, {
      class: r,
      delay: 0,
      duration: 300
    });
  }
}, ji = (t) => {
  const e = p(".pareto svg g", SVGGElement);
  t.createRect(e, 50, 40, 50, 20, 6, "empty"), t.createRect(e, 150, 10, 100, 80, 6, "empty");
}, ts = (t) => {
  const e = p(".peakEnd svg g", SVGGElement);
  for (let n = 0; n < 5; n++)
    for (let r = 0; r < 4; r++) {
      const i = n === 1 && r === 1 || n === 4 && r === 3 ? "empty" : "full";
      t.createCircle(e, n * 20 + 100, r * 20 + 20, 5, {
        class: i
      });
    }
}, ge = {
  fitts: [Di],
  purpose: [Ii],
  hick: [Pi],
  jakob: [Hi],
  gradient: [qi],
  gestalt: [Xi],
  proximity: [Oi],
  similarity: [Li],
  commonRegion: [Yi],
  simplicity: [zi],
  miller: [Bi],
  tesler: [Ui],
  postel: [Ki],
  zeigarnik: [Wi],
  vonRestorff: [Ji],
  symetrie: [Qi],
  serialPosition: [Zi],
  pareto: [ji],
  peakEnd: [ts]
}, pe = /* @__PURE__ */ new Set();
for (const t of Object.values(ge))
  for (const e of t)
    pe.add(e);
const es = [...pe];
class ns {
  constructor() {
    G(this, "delayCounter", 0);
    G(this, "delayIncrement", 100);
    G(this, "useTransition", !1);
    G(this, "svgName");
    G(this, "createForm", (e, n, r, i, s) => {
      const o = {
        duration: 2e3,
        delay: 1e3,
        class: "",
        ...s
      };
      this.useTransition || (o.delay = 0, o.duration = 0);
      const a = tr(e).append(n);
      for (const [c, u] of Object.entries(r))
        a.attr(c, u);
      o.class && a.attr("class", o.class);
      const l = a.transition().duration(o.duration).delay(o.delay).ease(Ri);
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
    const e = this.svgName ? ge[this.svgName] : es;
    if (e !== void 0)
      for (const n of e)
        n(this);
  }
  getDelay() {
    return this.delayCounter += this.delayIncrement, this.delayCounter;
  }
  createCircle(e, n, r, i, s) {
    const o = {
      duration: 300,
      delay: this.getDelay(),
      ...s
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
      o
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
  createRect(e, n, r, i, s, o = 6, a = "empty") {
    return this.createForm(
      e,
      "rect",
      { x: n, y: r, width: i, height: 0, opacity: o * (1 / 6) },
      { height: s },
      {
        duration: 300,
        delay: this.getDelay(),
        class: a
      }
    );
  }
}
const rs = () => {
  is(), document.documentElement.style.setProperty(
    "--primary-color",
    "hsl(120, 100%, 25%)"
  ), document.documentElement.style.setProperty(
    "--fill-color",
    "hsla(120, 0%, 25%, 0.1)"
  );
}, is = () => {
  const t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, e = document.body.classList;
  t ? e.add("dark") : e.add("light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (n) => {
    const r = n.matches ? "dark" : "light";
    console.log("colorScheme: ", r), e.remove("dark"), e.remove("light"), r === "dark" ? e.add("dark") : e.add("light");
  });
};
rs();
const ss = new ns();
ss.initSvg();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9tYXRjaGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkcmVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2V4aXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vam9pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vcmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbm9kZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VtcHR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5zZXJ0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3JlbW92ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXR1bS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9vbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pdGVyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vZGVjb21wb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vaW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZGVsYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kdXJhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlVmFyeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vc3JjL21pc2MudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9maXR0cy50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3B1cnBvc2UudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9oaWNrLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvamFrb2IudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9ncmFkaWVudC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL2dlc3RhbHQudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9wcm94aW1pdHkudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zaW1pbGFyaXR5LnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3MvY29tbW9uUmVnaW9uLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc2ltcGxpY2l0eS50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL21pbGxlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Rlc2xlci50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3Bvc3RlbC50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3plaWdhcm5pay50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3ZvblJlc3RvcmZmLnRzIiwiLi4vLi4vLi4vc3JjL3N2Z3Mvc3ltZXRyaWUudHMiLCIuLi8uLi8uLi9zcmMvc3Zncy9zZXJpYWxQb3NpdGlvbi50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3BhcmV0by50cyIsIi4uLy4uLy4uL3NyYy9zdmdzL3BlYWtFbmQudHMiLCIuLi8uLi8uLi9zcmMvc3ZnQ29uZmlnLnRzIiwiLi4vLi4vLi4vc3JjL1NWR1Rvb2wudHMiLCIuLi8uLi8uLi9zcmMvdGhlbWUudHMiLCIuLi8uLi8uLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbm9vcCA9IHt2YWx1ZTogKCkgPT4ge319O1xuXG5mdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBfID0ge30sIHQ7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoISh0ID0gYXJndW1lbnRzW2ldICsgXCJcIikgfHwgKHQgaW4gXykgfHwgL1tcXHMuXS8udGVzdCh0KSkgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0eXBlOiBcIiArIHQpO1xuICAgIF9bdF0gPSBbXTtcbiAgfVxuICByZXR1cm4gbmV3IERpc3BhdGNoKF8pO1xufVxuXG5mdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gIHRoaXMuXyA9IF87XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIGlmICh0ICYmICF0eXBlcy5oYXNPd25Qcm9wZXJ0eSh0KSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHQpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5EaXNwYXRjaC5wcm90b3R5cGUgPSBkaXNwYXRjaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgb246IGZ1bmN0aW9uKHR5cGVuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBfID0gdGhpcy5fLFxuICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgdCxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAvLyBJZiBubyBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZXR1cm4gdGhlIGNhbGxiYWNrIG9mIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSBudWxsIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJlbW92ZSBjYWxsYmFja3Mgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgY2FsbGJhY2s6IFwiICsgY2FsbGJhY2spO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgY2FsbGJhY2spO1xuICAgICAgZWxzZSBpZiAoY2FsbGJhY2sgPT0gbnVsbCkgZm9yICh0IGluIF8pIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3B5ID0ge30sIF8gPSB0aGlzLl87XG4gICAgZm9yICh2YXIgdCBpbiBfKSBjb3B5W3RdID0gX1t0XS5zbGljZSgpO1xuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uKHR5cGUsIHRoYXQpIHtcbiAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbih0eXBlLCB0aGF0LCBhcmdzKSB7XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoLCBjOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKChjID0gdHlwZVtpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldCh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgdHlwZVtpXSA9IG5vb3AsIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpLmNvbmNhdCh0eXBlLnNsaWNlKGkgKyAxKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHR5cGUucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IGNhbGxiYWNrfSk7XG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaDtcbiIsImV4cG9ydCB2YXIgeGh0bWwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcbiIsImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4vbmFtZXNwYWNlLmpzXCI7XG5pbXBvcnQge3hodG1sfSBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0b3JJbmhlcml0KG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCxcbiAgICAgICAgdXJpID0gdGhpcy5uYW1lc3BhY2VVUkk7XG4gICAgcmV0dXJuIHVyaSA9PT0geGh0bWwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0geGh0bWxcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0b3JGaXhlZChmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59XG4iLCJmdW5jdGlvbiBub25lKCkge31cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBub25lIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCIvLyBHaXZlbiBzb21ldGhpbmcgYXJyYXkgbGlrZSAob3IgbnVsbCksIHJldHVybnMgc29tZXRoaW5nIHRoYXQgaXMgc3RyaWN0bHkgYW5cbi8vIGFycmF5LiBUaGlzIGlzIHVzZWQgdG8gZW5zdXJlIHRoYXQgYXJyYXktbGlrZSBvYmplY3RzIHBhc3NlZCB0byBkMy5zZWxlY3RBbGxcbi8vIG9yIHNlbGVjdGlvbi5zZWxlY3RBbGwgYXJlIGNvbnZlcnRlZCBpbnRvIHByb3BlciBhcnJheXMgd2hlbiBjcmVhdGluZyBhXG4vLyBzZWxlY3Rpb247IHdlIGRvbuKAmXQgZXZlciB3YW50IHRvIGNyZWF0ZSBhIHNlbGVjdGlvbiBiYWNrZWQgYnkgYSBsaXZlXG4vLyBIVE1MQ29sbGVjdGlvbiBvciBOb2RlTGlzdC4gSG93ZXZlciwgbm90ZSB0aGF0IHNlbGVjdGlvbi5zZWxlY3RBbGwgd2lsbCB1c2UgYVxuLy8gc3RhdGljIE5vZGVMaXN0IGFzIGEgZ3JvdXAsIHNpbmNlIGl0IHNhZmVseSBkZXJpdmVkIGZyb20gcXVlcnlTZWxlY3RvckFsbC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbCA/IFtdIDogQXJyYXkuaXNBcnJheSh4KSA/IHggOiBBcnJheS5mcm9tKHgpO1xufVxuIiwiZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgYXJyYXkgZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsLmpzXCI7XG5cbmZ1bmN0aW9uIGFycmF5QWxsKHNlbGVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFycmF5KHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IGFycmF5QWxsKHNlbGVjdCk7XG4gIGVsc2Ugc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTWF0Y2hlcihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuXG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbmQgPSBBcnJheS5wcm90b3R5cGUuZmluZDtcblxuZnVuY3Rpb24gY2hpbGRGaW5kKG1hdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmluZC5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hpbGRGaXJzdCgpIHtcbiAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChtYXRjaCA9PSBudWxsID8gY2hpbGRGaXJzdFxuICAgICAgOiBjaGlsZEZpbmQodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmlsdGVyID0gQXJyYXkucHJvdG90eXBlLmZpbHRlcjtcblxuZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkZpbHRlcihtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsKG1hdGNoID09IG51bGwgPyBjaGlsZHJlblxuICAgICAgOiBjaGlsZHJlbkZpbHRlcih0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2hlciBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHVwZGF0ZS5sZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtFbnRlck5vZGV9IGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4uL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGJpbmRJbmRleChwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG5vZGUsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZml0IGludG8gdXBkYXRlLlxuICAvLyBQdXQgYW55IG51bGwgbm9kZXMgaW50byBlbnRlci5cbiAgLy8gUHV0IGFueSByZW1haW5pbmcgZGF0YSBpbnRvIGVudGVyLlxuICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGRvbuKAmXQgZml0IGludG8gZXhpdC5cbiAgZm9yICg7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRLZXkocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSwga2V5KSB7XG4gIHZhciBpLFxuICAgICAgbm9kZSxcbiAgICAgIG5vZGVCeUtleVZhbHVlID0gbmV3IE1hcCxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAga2V5VmFsdWVzID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKSxcbiAgICAgIGtleVZhbHVlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBub2RlLlxuICAvLyBJZiBtdWx0aXBsZSBub2RlcyBoYXZlIHRoZSBzYW1lIGtleSwgdGhlIGR1cGxpY2F0ZXMgYXJlIGFkZGVkIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAga2V5VmFsdWVzW2ldID0ga2V5VmFsdWUgPSBrZXkuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkgKyBcIlwiO1xuICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHtcbiAgICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBkYXR1bS5cbiAgLy8gSWYgdGhlcmUgYSBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSwgam9pbiBhbmQgYWRkIGl0IHRvIHVwZGF0ZS5cbiAgLy8gSWYgdGhlcmUgaXMgbm90IChvciB0aGUga2V5IGlzIGEgZHVwbGljYXRlKSwgYWRkIGl0IHRvIGVudGVyLlxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAga2V5VmFsdWUgPSBrZXkuY2FsbChwYXJlbnQsIGRhdGFbaV0sIGksIGRhdGEpICsgXCJcIjtcbiAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZSkpIHtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIG5vZGVCeUtleVZhbHVlLmRlbGV0ZShrZXlWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBhbnkgcmVtYWluaW5nIG5vZGVzIHRoYXQgd2VyZSBub3QgYm91bmQgdG8gZGF0YSB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAobm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlc1tpXSkgPT09IG5vZGUpKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0dW0obm9kZSkge1xuICByZXR1cm4gbm9kZS5fX2RhdGFfXztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBBcnJheS5mcm9tKHRoaXMsIGRhdHVtKTtcblxuICB2YXIgYmluZCA9IGtleSA/IGJpbmRLZXkgOiBiaW5kSW5kZXgsXG4gICAgICBwYXJlbnRzID0gdGhpcy5fcGFyZW50cyxcbiAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHZhbHVlID0gY29uc3RhbnQodmFsdWUpO1xuXG4gIGZvciAodmFyIG0gPSBncm91cHMubGVuZ3RoLCB1cGRhdGUgPSBuZXcgQXJyYXkobSksIGVudGVyID0gbmV3IEFycmF5KG0pLCBleGl0ID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2pdLFxuICAgICAgICBncm91cCA9IGdyb3Vwc1tqXSxcbiAgICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICAgIGRhdGEgPSBhcnJheWxpa2UodmFsdWUuY2FsbChwYXJlbnQsIHBhcmVudCAmJiBwYXJlbnQuX19kYXRhX18sIGosIHBhcmVudHMpKSxcbiAgICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAgICBlbnRlckdyb3VwID0gZW50ZXJbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIHVwZGF0ZUdyb3VwID0gdXBkYXRlW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICBleGl0R3JvdXAgPSBleGl0W2pdID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKTtcblxuICAgIGJpbmQocGFyZW50LCBncm91cCwgZW50ZXJHcm91cCwgdXBkYXRlR3JvdXAsIGV4aXRHcm91cCwgZGF0YSwga2V5KTtcblxuICAgIC8vIE5vdyBjb25uZWN0IHRoZSBlbnRlciBub2RlcyB0byB0aGVpciBmb2xsb3dpbmcgdXBkYXRlIG5vZGUsIHN1Y2ggdGhhdFxuICAgIC8vIGFwcGVuZENoaWxkIGNhbiBpbnNlcnQgdGhlIG1hdGVyaWFsaXplZCBlbnRlciBub2RlIGJlZm9yZSB0aGlzIG5vZGUsXG4gICAgLy8gcmF0aGVyIHRoYW4gYXQgdGhlIGVuZCBvZiB0aGUgcGFyZW50IG5vZGUuXG4gICAgZm9yICh2YXIgaTAgPSAwLCBpMSA9IDAsIHByZXZpb3VzLCBuZXh0OyBpMCA8IGRhdGFMZW5ndGg7ICsraTApIHtcbiAgICAgIGlmIChwcmV2aW91cyA9IGVudGVyR3JvdXBbaTBdKSB7XG4gICAgICAgIGlmIChpMCA+PSBpMSkgaTEgPSBpMCArIDE7XG4gICAgICAgIHdoaWxlICghKG5leHQgPSB1cGRhdGVHcm91cFtpMV0pICYmICsraTEgPCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgcHJldmlvdXMuX25leHQgPSBuZXh0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlID0gbmV3IFNlbGVjdGlvbih1cGRhdGUsIHBhcmVudHMpO1xuICB1cGRhdGUuX2VudGVyID0gZW50ZXI7XG4gIHVwZGF0ZS5fZXhpdCA9IGV4aXQ7XG4gIHJldHVybiB1cGRhdGU7XG59XG5cbi8vIEdpdmVuIHNvbWUgZGF0YSwgdGhpcyByZXR1cm5zIGFuIGFycmF5LWxpa2UgdmlldyBvZiBpdDogYW4gb2JqZWN0IHRoYXRcbi8vIGV4cG9zZXMgYSBsZW5ndGggcHJvcGVydHkgYW5kIGFsbG93cyBudW1lcmljIGluZGV4aW5nLiBOb3RlIHRoYXQgdW5saWtlXG4vLyBzZWxlY3RBbGwsIHRoaXMgaXNu4oCZdCB3b3JyaWVkIGFib3V0IOKAnGxpdmXigJ0gY29sbGVjdGlvbnMgYmVjYXVzZSB0aGUgcmVzdWx0aW5nXG4vLyBhcnJheSB3aWxsIG9ubHkgYmUgdXNlZCBicmllZmx5IHdoaWxlIGRhdGEgaXMgYmVpbmcgYm91bmQuIChJdCBpcyBwb3NzaWJsZSB0b1xuLy8gY2F1c2UgdGhlIGRhdGEgdG8gY2hhbmdlIHdoaWxlIGl0ZXJhdGluZyBieSB1c2luZyBhIGtleSBmdW5jdGlvbiwgYnV0IHBsZWFzZVxuLy8gZG9u4oCZdDsgd2XigJlkIHJhdGhlciBhdm9pZCBhIGdyYXR1aXRvdXMgY29weS4pXG5mdW5jdGlvbiBhcnJheWxpa2UoZGF0YSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBkYXRhXG4gICAgPyBkYXRhIC8vIEFycmF5LCBUeXBlZEFycmF5LCBOb2RlTGlzdCwgYXJyYXktbGlrZVxuICAgIDogQXJyYXkuZnJvbShkYXRhKTsgLy8gTWFwLCBTZXQsIGl0ZXJhYmxlLCBzdHJpbmcsIG9yIGFueXRoaW5nIGVsc2Vcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2V4aXQgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9uZW50ZXIsIG9udXBkYXRlLCBvbmV4aXQpIHtcbiAgdmFyIGVudGVyID0gdGhpcy5lbnRlcigpLCB1cGRhdGUgPSB0aGlzLCBleGl0ID0gdGhpcy5leGl0KCk7XG4gIGlmICh0eXBlb2Ygb25lbnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZW50ZXIgPSBvbmVudGVyKGVudGVyKTtcbiAgICBpZiAoZW50ZXIpIGVudGVyID0gZW50ZXIuc2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgZW50ZXIgPSBlbnRlci5hcHBlbmQob25lbnRlciArIFwiXCIpO1xuICB9XG4gIGlmIChvbnVwZGF0ZSAhPSBudWxsKSB7XG4gICAgdXBkYXRlID0gb251cGRhdGUodXBkYXRlKTtcbiAgICBpZiAodXBkYXRlKSB1cGRhdGUgPSB1cGRhdGUuc2VsZWN0aW9uKCk7XG4gIH1cbiAgaWYgKG9uZXhpdCA9PSBudWxsKSBleGl0LnJlbW92ZSgpOyBlbHNlIG9uZXhpdChleGl0KTtcbiAgcmV0dXJuIGVudGVyICYmIHVwZGF0ZSA/IGVudGVyLm1lcmdlKHVwZGF0ZSkub3JkZXIoKSA6IHVwZGF0ZTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHZhciBzZWxlY3Rpb24gPSBjb250ZXh0LnNlbGVjdGlvbiA/IGNvbnRleHQuc2VsZWN0aW9uKCkgOiBjb250ZXh0O1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSBzZWxlY3Rpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IC0xLCBtID0gZ3JvdXBzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGlmIChuZXh0ICYmIG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24obmV4dCkgXiA0KSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb21wYXJlKSB7XG4gIGlmICghY29tcGFyZSkgY29tcGFyZSA9IGFzY2VuZGluZztcblxuICBmdW5jdGlvbiBjb21wYXJlTm9kZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGNvbXBhcmUoYS5fX2RhdGFfXywgYi5fX2RhdGFfXykgOiAhYSAtICFiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc29ydGdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc29ydGdyb3VwID0gc29ydGdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc29ydGdyb3VwW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ydGdyb3VwLnNvcnQoY29tcGFyZU5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc29ydGdyb3VwcywgdGhpcy5fcGFyZW50cykub3JkZXIoKTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgYXJndW1lbnRzWzBdID0gdGhpcztcbiAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIG5vZGUgPSBncm91cFtpXTtcbiAgICAgIGlmIChub2RlKSByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBsZXQgc2l6ZSA9IDA7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzKSArK3NpemU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuIHNpemU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLm5vZGUoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi4vbmFtZXNwYWNlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHYpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdik7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgIHJldHVybiBmdWxsbmFtZS5sb2NhbFxuICAgICAgICA/IG5vZGUuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKVxuICAgICAgICA6IG5vZGUuZ2V0QXR0cmlidXRlKGZ1bGxuYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KSkpKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gKG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIC8vIG5vZGUgaXMgYSBOb2RlXG4gICAgICB8fCAobm9kZS5kb2N1bWVudCAmJiBub2RlKSAvLyBub2RlIGlzIGEgV2luZG93XG4gICAgICB8fCBub2RlLmRlZmF1bHRWaWV3OyAvLyBub2RlIGlzIGEgRG9jdW1lbnRcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbHVlLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdiwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgPyBzdHlsZVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IHN0eWxlRnVuY3Rpb25cbiAgICAgICAgICAgIDogc3R5bGVDb25zdGFudCkobmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKVxuICAgICAgOiBzdHlsZVZhbHVlKHRoaXMubm9kZSgpLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVmFsdWUobm9kZSwgbmFtZSkge1xuICByZXR1cm4gbm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpXG4gICAgICB8fCBkZWZhdWx0Vmlldyhub2RlKS5nZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG59XG4iLCJmdW5jdGlvbiBwcm9wZXJ0eVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1tuYW1lXSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgZWxzZSB0aGlzW25hbWVdID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gcHJvcGVydHlSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gcHJvcGVydHlGdW5jdGlvblxuICAgICAgICAgIDogcHJvcGVydHlDb25zdGFudCkobmFtZSwgdmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKVtuYW1lXTtcbn1cbiIsImZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufVxuIiwiZnVuY3Rpb24gdGV4dFJlbW92ZSgpIHtcbiAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyB0ZXh0UmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0ZXh0RnVuY3Rpb25cbiAgICAgICAgICA6IHRleHRDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbn1cbiIsImZ1bmN0aW9uIGh0bWxSZW1vdmUoKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaHRtbENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBodG1sRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gaHRtbFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gaHRtbEZ1bmN0aW9uXG4gICAgICAgICAgOiBodG1sQ29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xufVxuIiwiZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJhaXNlKTtcbn1cbiIsImZ1bmN0aW9uIGxvd2VyKCkge1xuICBpZiAodGhpcy5wcmV2aW91c1NpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChsb3dlcik7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyZW1vdmUpO1xufVxuIiwiZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lU2hhbGxvdygpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUoZmFsc2UpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVEZWVwKCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVlcCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZGVlcCA/IHNlbGVjdGlvbl9jbG9uZURlZXAgOiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCJmdW5jdGlvbiBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdGhpcy5fX2RhdGFfXyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uUmVtb3ZlKHR5cGVuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb247XG4gICAgaWYgKCFvbikgcmV0dXJuO1xuICAgIGZvciAodmFyIGogPSAwLCBpID0gLTEsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGlmIChvID0gb25bal0sICghdHlwZW5hbWUudHlwZSB8fCBvLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUpICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25bKytpXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgrK2kpIG9uLmxlbmd0aCA9IGk7XG4gICAgZWxzZSBkZWxldGUgdGhpcy5fX29uO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbkFkZCh0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbiwgbywgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIodmFsdWUpO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8ub3B0aW9ucyA9IG9wdGlvbnMpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBvcHRpb25zOiBvcHRpb25zfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGVuYW1lcyA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiksIGksIG4gPSB0eXBlbmFtZXMubGVuZ3RoLCB0O1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBvbiA9IHRoaXMubm9kZSgpLl9fb247XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgZm9yIChpID0gMCwgbyA9IG9uW2pdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICgodCA9IHR5cGVuYW1lc1tpXSkudHlwZSA9PT0gby50eXBlICYmIHQubmFtZSA9PT0gby5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb24gPSB2YWx1ZSA/IG9uQWRkIDogb25SZW1vdmU7XG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHRoaXMuZWFjaChvbih0eXBlbmFtZXNbaV0sIHZhbHVlLCBvcHRpb25zKSk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3cuanNcIjtcblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlLCB0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlZmF1bHRWaWV3KG5vZGUpLFxuICAgICAgZXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5cbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnQgPSBuZXcgZXZlbnQodHlwZSwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGlmIChwYXJhbXMpIGV2ZW50LmluaXRFdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUpLCBldmVudC5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIGVsc2UgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaENvbnN0YW50KHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hGdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBkaXNwYXRjaEZ1bmN0aW9uXG4gICAgICA6IGRpc3BhdGNoQ29uc3RhbnQpKHR5cGUsIHBhcmFtcykpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgeWllbGQgbm9kZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzZWxlY3Rpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkIGZyb20gXCIuL3NlbGVjdENoaWxkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIGZyb20gXCIuL3NlbGVjdENoaWxkcmVuLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0YSBmcm9tIFwiLi9kYXRhLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VudGVyIGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2V4aXQgZnJvbSBcIi4vZXhpdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9qb2luIGZyb20gXCIuL2pvaW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb3JkZXIgZnJvbSBcIi4vb3JkZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc29ydCBmcm9tIFwiLi9zb3J0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NhbGwgZnJvbSBcIi4vY2FsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlcyBmcm9tIFwiLi9ub2Rlcy5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlIGZyb20gXCIuL25vZGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2l6ZSBmcm9tIFwiLi9zaXplLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VtcHR5IGZyb20gXCIuL2VtcHR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VhY2ggZnJvbSBcIi4vZWFjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcHJvcGVydHkgZnJvbSBcIi4vcHJvcGVydHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xhc3NlZCBmcm9tIFwiLi9jbGFzc2VkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9odG1sIGZyb20gXCIuL2h0bWwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmFpc2UgZnJvbSBcIi4vcmFpc2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbG93ZXIgZnJvbSBcIi4vbG93ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXBwZW5kIGZyb20gXCIuL2FwcGVuZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnNlcnQgZnJvbSBcIi4vaW5zZXJ0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xvbmUgZnJvbSBcIi4vY2xvbmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0dW0gZnJvbSBcIi4vZGF0dW0uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGlzcGF0Y2ggZnJvbSBcIi4vZGlzcGF0Y2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faXRlcmF0b3IgZnJvbSBcIi4vaXRlcmF0b3IuanNcIjtcblxuZXhwb3J0IHZhciByb290ID0gW251bGxdO1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0aW9uKGdyb3VwcywgcGFyZW50cykge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XV0sIHJvb3QpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fc2VsZWN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuU2VsZWN0aW9uLnByb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBTZWxlY3Rpb24sXG4gIHNlbGVjdDogc2VsZWN0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiBzZWxlY3Rpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3NlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHNlbGVjdGlvbl9maWx0ZXIsXG4gIGRhdGE6IHNlbGVjdGlvbl9kYXRhLFxuICBlbnRlcjogc2VsZWN0aW9uX2VudGVyLFxuICBleGl0OiBzZWxlY3Rpb25fZXhpdCxcbiAgam9pbjogc2VsZWN0aW9uX2pvaW4sXG4gIG1lcmdlOiBzZWxlY3Rpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogc2VsZWN0aW9uX3NlbGVjdGlvbixcbiAgb3JkZXI6IHNlbGVjdGlvbl9vcmRlcixcbiAgc29ydDogc2VsZWN0aW9uX3NvcnQsXG4gIGNhbGw6IHNlbGVjdGlvbl9jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX25vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fbm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3NpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9lYWNoLFxuICBhdHRyOiBzZWxlY3Rpb25fYXR0cixcbiAgc3R5bGU6IHNlbGVjdGlvbl9zdHlsZSxcbiAgcHJvcGVydHk6IHNlbGVjdGlvbl9wcm9wZXJ0eSxcbiAgY2xhc3NlZDogc2VsZWN0aW9uX2NsYXNzZWQsXG4gIHRleHQ6IHNlbGVjdGlvbl90ZXh0LFxuICBodG1sOiBzZWxlY3Rpb25faHRtbCxcbiAgcmFpc2U6IHNlbGVjdGlvbl9yYWlzZSxcbiAgbG93ZXI6IHNlbGVjdGlvbl9sb3dlcixcbiAgYXBwZW5kOiBzZWxlY3Rpb25fYXBwZW5kLFxuICBpbnNlcnQ6IHNlbGVjdGlvbl9pbnNlcnQsXG4gIHJlbW92ZTogc2VsZWN0aW9uX3JlbW92ZSxcbiAgY2xvbmU6IHNlbGVjdGlvbl9jbG9uZSxcbiAgZGF0dW06IHNlbGVjdGlvbl9kYXR1bSxcbiAgb246IHNlbGVjdGlvbl9vbixcbiAgZGlzcGF0Y2g6IHNlbGVjdGlvbl9kaXNwYXRjaCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9pdGVyYXRvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW9uO1xuIiwiaW1wb3J0IHtTZWxlY3Rpb24sIHJvb3R9IGZyb20gXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiXG4gICAgICA/IG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKV1dLCBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XSlcbiAgICAgIDogbmV3IFNlbGVjdGlvbihbW3NlbGVjdG9yXV0sIHJvb3QpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uc3RydWN0b3IsIGZhY3RvcnksIHByb3RvdHlwZSkge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBmYWN0b3J5LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgcHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQocGFyZW50LCBkZWZpbml0aW9uKSB7XG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuICBmb3IgKHZhciBrZXkgaW4gZGVmaW5pdGlvbikgcHJvdG90eXBlW2tleV0gPSBkZWZpbml0aW9uW2tleV07XG4gIHJldHVybiBwcm90b3R5cGU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KVxcXFxzKlwiLFxuICAgIHJlUCA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9XFxcXCkkYCksXG4gICAgcmVSZ2JQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlUmdiYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbFxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZUhzbGFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbGFcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5KGNoYW5uZWxzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IHRoaXMuY29uc3RydWN0b3IsIHRoaXMsIGNoYW5uZWxzKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiBjb2xvcl9mb3JtYXRIZXg4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXg4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IFJnYihjbGFtcGkodGhpcy5yKSwgY2xhbXBpKHRoaXMuZyksIGNsYW1waSh0aGlzLmIpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogcmdiX2Zvcm1hdEhleDgsXG4gIGZvcm1hdFJnYjogcmdiX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IHJnYl9mb3JtYXRSZ2Jcbn0pKTtcblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfSR7aGV4KChpc05hTih0aGlzLm9wYWNpdHkpID8gMSA6IHRoaXMub3BhY2l0eSkgKiAyNTUpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgcmV0dXJuIGAke2EgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIn0ke2NsYW1waSh0aGlzLnIpfSwgJHtjbGFtcGkodGhpcy5nKX0sICR7Y2xhbXBpKHRoaXMuYil9JHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbn1cblxuZnVuY3Rpb24gY2xhbXBhKG9wYWNpdHkpIHtcbiAgcmV0dXJuIGlzTmFOKG9wYWNpdHkpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG9wYWNpdHkpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXBpKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodmFsdWUpIHx8IDApKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gY2xhbXBpKHZhbHVlKTtcbiAgcmV0dXJuICh2YWx1ZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIHZhbHVlLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gaHNsYShoLCBzLCBsLCBhKSB7XG4gIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgZWxzZSBpZiAobCA8PSAwIHx8IGwgPj0gMSkgaCA9IHMgPSBOYU47XG4gIGVsc2UgaWYgKHMgPD0gMCkgaCA9IE5hTjtcbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBuZXcgSHNsKG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBvO1xuICBvID0gby5yZ2IoKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICBoID0gTmFOLFxuICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChzKSB7XG4gICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgZWxzZSBpZiAoZyA9PT0gbWF4KSBoID0gKGIgLSByKSAvIHMgKyAyO1xuICAgIGVsc2UgaCA9IChyIC0gZykgLyBzICsgNDtcbiAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgIGggKj0gNjA7XG4gIH0gZWxzZSB7XG4gICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gIH1cbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5mdW5jdGlvbiBIc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5zID0gK3M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKEhzbCwgaHNsLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICBzID0gaXNOYU4oaCkgfHwgaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMsXG4gICAgICAgIGwgPSB0aGlzLmwsXG4gICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgIG0xID0gMiAqIGwgLSBtMjtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCA8IDEyMCA/IGggKyAyNDAgOiBoIC0gMTIwLCBtMSwgbTIpLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBIc2woY2xhbXBoKHRoaXMuaCksIGNsYW1wdCh0aGlzLnMpLCBjbGFtcHQodGhpcy5sKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsKCkge1xuICAgIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgICByZXR1cm4gYCR7YSA9PT0gMSA/IFwiaHNsKFwiIDogXCJoc2xhKFwifSR7Y2xhbXBoKHRoaXMuaCl9LCAke2NsYW1wdCh0aGlzLnMpICogMTAwfSUsICR7Y2xhbXB0KHRoaXMubCkgKiAxMDB9JSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG4gIH1cbn0pKTtcblxuZnVuY3Rpb24gY2xhbXBoKHZhbHVlKSB7XG4gIHZhbHVlID0gKHZhbHVlIHx8IDApICUgMzYwO1xuICByZXR1cm4gdmFsdWUgPCAwID8gdmFsdWUgKyAzNjAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2xhbXB0KHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSB8fCAwKSk7XG59XG5cbi8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbmZ1bmN0aW9uIGhzbDJyZ2IoaCwgbTEsIG0yKSB7XG4gIHJldHVybiAoaCA8IDYwID8gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjBcbiAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICA6IGggPCAyNDAgPyBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwXG4gICAgICA6IG0xKSAqIDI1NTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHggPT4gKCkgPT4geDtcbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBsaW5lYXIoYSwgZCkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICsgdCAqIGQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4cG9uZW50aWFsKGEsIGIsIHkpIHtcbiAgcmV0dXJuIGEgPSBNYXRoLnBvdyhhLCB5KSwgYiA9IE1hdGgucG93KGIsIHkpIC0gYSwgeSA9IDEgLyB5LCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KGEgKyB0ICogYiwgeSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodWUoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkID4gMTgwIHx8IGQgPCAtMTgwID8gZCAtIDM2MCAqIE1hdGgucm91bmQoZCAvIDM2MCkgOiBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtbWEoeSkge1xuICByZXR1cm4gKHkgPSAreSkgPT09IDEgPyBub2dhbW1hIDogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiIC0gYSA/IGV4cG9uZW50aWFsKGEsIGIsIHkpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vZ2FtbWEoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuIiwiaW1wb3J0IHtyZ2IgYXMgY29sb3JSZ2J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGJhc2lzIGZyb20gXCIuL2Jhc2lzLmpzXCI7XG5pbXBvcnQgYmFzaXNDbG9zZWQgZnJvbSBcIi4vYmFzaXNDbG9zZWQuanNcIjtcbmltcG9ydCBub2dhbW1hLCB7Z2FtbWF9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiByZ2JHYW1tYSh5KSB7XG4gIHZhciBjb2xvciA9IGdhbW1hKHkpO1xuXG4gIGZ1bmN0aW9uIHJnYihzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSBjb2xvcigoc3RhcnQgPSBjb2xvclJnYihzdGFydCkpLnIsIChlbmQgPSBjb2xvclJnYihlbmQpKS5yKSxcbiAgICAgICAgZyA9IGNvbG9yKHN0YXJ0LmcsIGVuZC5nKSxcbiAgICAgICAgYiA9IGNvbG9yKHN0YXJ0LmIsIGVuZC5iKSxcbiAgICAgICAgb3BhY2l0eSA9IG5vZ2FtbWEoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5yID0gcih0KTtcbiAgICAgIHN0YXJ0LmcgPSBnKHQpO1xuICAgICAgc3RhcnQuYiA9IGIodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxuXG4gIHJnYi5nYW1tYSA9IHJnYkdhbW1hO1xuXG4gIHJldHVybiByZ2I7XG59KSgxKTtcblxuZnVuY3Rpb24gcmdiU3BsaW5lKHNwbGluZSkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIG4gPSBjb2xvcnMubGVuZ3RoLFxuICAgICAgICByID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBnID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBiID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBpLCBjb2xvcjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb2xvciA9IGNvbG9yUmdiKGNvbG9yc1tpXSk7XG4gICAgICByW2ldID0gY29sb3IuciB8fCAwO1xuICAgICAgZ1tpXSA9IGNvbG9yLmcgfHwgMDtcbiAgICAgIGJbaV0gPSBjb2xvci5iIHx8IDA7XG4gICAgfVxuICAgIHIgPSBzcGxpbmUocik7XG4gICAgZyA9IHNwbGluZShnKTtcbiAgICBiID0gc3BsaW5lKGIpO1xuICAgIGNvbG9yLm9wYWNpdHkgPSAxO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBjb2xvci5yID0gcih0KTtcbiAgICAgIGNvbG9yLmcgPSBnKHQpO1xuICAgICAgY29sb3IuYiA9IGIodCk7XG4gICAgICByZXR1cm4gY29sb3IgKyBcIlwiO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgcmdiQmFzaXMgPSByZ2JTcGxpbmUoYmFzaXMpO1xuZXhwb3J0IHZhciByZ2JCYXNpc0Nsb3NlZCA9IHJnYlNwbGluZShiYXNpc0Nsb3NlZCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHJlQSA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZyxcbiAgICByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcblxuZnVuY3Rpb24gemVybyhiKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25lKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYih0KSArIFwiXCI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGJpID0gcmVBLmxhc3RJbmRleCA9IHJlQi5sYXN0SW5kZXggPSAwLCAvLyBzY2FuIGluZGV4IGZvciBuZXh0IG51bWJlciBpbiBiXG4gICAgICBhbSwgLy8gY3VycmVudCBtYXRjaCBpbiBhXG4gICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICBicywgLy8gc3RyaW5nIHByZWNlZGluZyBjdXJyZW50IG51bWJlciBpbiBiLCBpZiBhbnlcbiAgICAgIGkgPSAtMSwgLy8gaW5kZXggaW4gc1xuICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcblxuICAvLyBDb2VyY2UgaW5wdXRzIHRvIHN0cmluZ3MuXG4gIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gIC8vIEludGVycG9sYXRlIHBhaXJzIG9mIG51bWJlcnMgaW4gYSAmIGIuXG4gIHdoaWxlICgoYW0gPSByZUEuZXhlYyhhKSlcbiAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgIGlmICgoYnMgPSBibS5pbmRleCkgPiBiaSkgeyAvLyBhIHN0cmluZyBwcmVjZWRlcyB0aGUgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYnMgPSBiLnNsaWNlKGJpLCBicyk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBibTsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYm07XG4gICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgIHNbKytpXSA9IG51bGw7XG4gICAgICBxLnB1c2goe2k6IGksIHg6IG51bWJlcihhbSwgYm0pfSk7XG4gICAgfVxuICAgIGJpID0gcmVCLmxhc3RJbmRleDtcbiAgfVxuXG4gIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gIGlmIChiaSA8IGIubGVuZ3RoKSB7XG4gICAgYnMgPSBiLnNsaWNlKGJpKTtcbiAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICBlbHNlIHNbKytpXSA9IGJzO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgZWFjaCBvZiB0aGUgbnVtYmVycyBhbmQgcmVqb2luIHRoZSBzdHJpbmcuXG4gIHJldHVybiBzLmxlbmd0aCA8IDIgPyAocVswXVxuICAgICAgPyBvbmUocVswXS54KVxuICAgICAgOiB6ZXJvKGIpKVxuICAgICAgOiAoYiA9IHEubGVuZ3RoLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgICAgICB9KTtcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IGRlY29tcG9zZSwge2lkZW50aXR5fSBmcm9tIFwiLi9kZWNvbXBvc2UuanNcIjtcblxudmFyIHN2Z05vZGU7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgY29uc3QgbSA9IG5ldyAodHlwZW9mIERPTU1hdHJpeCA9PT0gXCJmdW5jdGlvblwiID8gRE9NTWF0cml4IDogV2ViS2l0Q1NTTWF0cml4KSh2YWx1ZSArIFwiXCIpO1xuICByZXR1cm4gbS5pc0lkZW50aXR5ID8gaWRlbnRpdHkgOiBkZWNvbXBvc2UobS5hLCBtLmIsIG0uYywgbS5kLCBtLmUsIG0uZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZeKAmXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW7igJl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwodW5kZWZpbmVkLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1RpbWVyfSBmcm9tIFwiLi90aW1lci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIGRlbGF5ID0gZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXk7XG4gIHQucmVzdGFydChlbGFwc2VkID0+IHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuIiwiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge3RpbWVyLCB0aW1lb3V0fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGVtcHR5T24gPSBkaXNwYXRjaChcInN0YXJ0XCIsIFwiZW5kXCIsIFwiY2FuY2VsXCIsIFwiaW50ZXJydXB0XCIpO1xudmFyIGVtcHR5VHdlZW4gPSBbXTtcblxuZXhwb3J0IHZhciBDUkVBVEVEID0gMDtcbmV4cG9ydCB2YXIgU0NIRURVTEVEID0gMTtcbmV4cG9ydCB2YXIgU1RBUlRJTkcgPSAyO1xuZXhwb3J0IHZhciBTVEFSVEVEID0gMztcbmV4cG9ydCB2YXIgUlVOTklORyA9IDQ7XG5leHBvcnQgdmFyIEVORElORyA9IDU7XG5leHBvcnQgdmFyIEVOREVEID0gNjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSwgaWQsIGluZGV4LCBncm91cCwgdGltaW5nKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZXMpIG5vZGUuX190cmFuc2l0aW9uID0ge307XG4gIGVsc2UgaWYgKGlkIGluIHNjaGVkdWxlcykgcmV0dXJuO1xuICBjcmVhdGUobm9kZSwgaWQsIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGluZGV4OiBpbmRleCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIGdyb3VwOiBncm91cCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIG9uOiBlbXB0eU9uLFxuICAgIHR3ZWVuOiBlbXB0eVR3ZWVuLFxuICAgIHRpbWU6IHRpbWluZy50aW1lLFxuICAgIGRlbGF5OiB0aW1pbmcuZGVsYXksXG4gICAgZHVyYXRpb246IHRpbWluZy5kdXJhdGlvbixcbiAgICBlYXNlOiB0aW1pbmcuZWFzZSxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBzdGF0ZTogQ1JFQVRFRFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gQ1JFQVRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgc2NoZWR1bGVkXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gU1RBUlRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgcnVubmluZ1wiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlIHx8ICEoc2NoZWR1bGUgPSBzY2hlZHVsZVtpZF0pKSB0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2l0aW9uIG5vdCBmb3VuZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUobm9kZSwgaWQsIHNlbGYpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgdHdlZW47XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2VsZiB0aW1lciB3aGVuIHRoZSB0cmFuc2l0aW9uIGlzIGNyZWF0ZWQuXG4gIC8vIE5vdGUgdGhlIGFjdHVhbCBkZWxheSBpcyBub3Qga25vd24gdW50aWwgdGhlIGZpcnN0IGNhbGxiYWNrIVxuICBzY2hlZHVsZXNbaWRdID0gc2VsZjtcbiAgc2VsZi50aW1lciA9IHRpbWVyKHNjaGVkdWxlLCAwLCBzZWxmLnRpbWUpO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlKGVsYXBzZWQpIHtcbiAgICBzZWxmLnN0YXRlID0gU0NIRURVTEVEO1xuICAgIHNlbGYudGltZXIucmVzdGFydChzdGFydCwgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcblxuICAgIC8vIElmIHRoZSBlbGFwc2VkIGRlbGF5IGlzIGxlc3MgdGhhbiBvdXIgZmlyc3Qgc2xlZXAsIHN0YXJ0IGltbWVkaWF0ZWx5LlxuICAgIGlmIChzZWxmLmRlbGF5IDw9IGVsYXBzZWQpIHN0YXJ0KGVsYXBzZWQgLSBzZWxmLmRlbGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGVsYXBzZWQpIHtcbiAgICB2YXIgaSwgaiwgbiwgbztcblxuICAgIC8vIElmIHRoZSBzdGF0ZSBpcyBub3QgU0NIRURVTEVELCB0aGVuIHdlIHByZXZpb3VzbHkgZXJyb3JlZCBvbiBzdGFydC5cbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU0NIRURVTEVEKSByZXR1cm4gc3RvcCgpO1xuXG4gICAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgICAgbyA9IHNjaGVkdWxlc1tpXTtcbiAgICAgIGlmIChvLm5hbWUgIT09IHNlbGYubmFtZSkgY29udGludWU7XG5cbiAgICAgIC8vIFdoaWxlIHRoaXMgZWxlbWVudCBhbHJlYWR5IGhhcyBhIHN0YXJ0aW5nIHRyYW5zaXRpb24gZHVyaW5nIHRoaXMgZnJhbWUsXG4gICAgICAvLyBkZWZlciBzdGFydGluZyBhbiBpbnRlcnJ1cHRpbmcgdHJhbnNpdGlvbiB1bnRpbCB0aGF0IHRyYW5zaXRpb24gaGFzIGFcbiAgICAgIC8vIGNoYW5jZSB0byB0aWNrIChhbmQgcG9zc2libHkgZW5kKTsgc2VlIGQzL2QzLXRyYW5zaXRpb24jNTQhXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gU1RBUlRFRCkgcmV0dXJuIHRpbWVvdXQoc3RhcnQpO1xuXG4gICAgICAvLyBJbnRlcnJ1cHQgdGhlIGFjdGl2ZSB0cmFuc2l0aW9uLCBpZiBhbnkuXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gUlVOTklORykge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJpbnRlcnJ1cHRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbCBhbnkgcHJlLWVtcHRlZCB0cmFuc2l0aW9ucy5cbiAgICAgIGVsc2UgaWYgKCtpIDwgaWQpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmVyIHRoZSBmaXJzdCB0aWNrIHRvIGVuZCBvZiB0aGUgY3VycmVudCBmcmFtZTsgc2VlIGQzL2QzIzE1NzYuXG4gICAgLy8gTm90ZSB0aGUgdHJhbnNpdGlvbiBtYXkgYmUgY2FuY2VsZWQgYWZ0ZXIgc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3QgdGljayFcbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBzY2hlZHVsZWQgYmVmb3JlIHRoZSBzdGFydCBldmVudDsgc2VlIGQzL2QzLXRyYW5zaXRpb24jMTYhXG4gICAgLy8gQXNzdW1pbmcgdGhpcyBpcyBzdWNjZXNzZnVsLCBzdWJzZXF1ZW50IGNhbGxiYWNrcyBnbyBzdHJhaWdodCB0byB0aWNrLlxuICAgIHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gU1RBUlRFRCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gUlVOTklORztcbiAgICAgICAgc2VsZi50aW1lci5yZXN0YXJ0KHRpY2ssIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG4gICAgICAgIHRpY2soZWxhcHNlZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgc3RhcnQgZXZlbnQuXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgdGhlIHR3ZWVuIGFyZSBpbml0aWFsaXplZC5cbiAgICBzZWxmLnN0YXRlID0gU1RBUlRJTkc7XG4gICAgc2VsZi5vbi5jYWxsKFwic3RhcnRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNUQVJUSU5HKSByZXR1cm47IC8vIGludGVycnVwdGVkXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJURUQ7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0d2VlbiwgZGVsZXRpbmcgbnVsbCB0d2Vlbi5cbiAgICB0d2VlbiA9IG5ldyBBcnJheShuID0gc2VsZi50d2Vlbi5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGogPSAtMTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG8gPSBzZWxmLnR3ZWVuW2ldLnZhbHVlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCkpIHtcbiAgICAgICAgdHdlZW5bKytqXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIHR3ZWVuLmxlbmd0aCA9IGogKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gdGljayhlbGFwc2VkKSB7XG4gICAgdmFyIHQgPSBlbGFwc2VkIDwgc2VsZi5kdXJhdGlvbiA/IHNlbGYuZWFzZS5jYWxsKG51bGwsIGVsYXBzZWQgLyBzZWxmLmR1cmF0aW9uKSA6IChzZWxmLnRpbWVyLnJlc3RhcnQoc3RvcCksIHNlbGYuc3RhdGUgPSBFTkRJTkcsIDEpLFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSB0d2Vlbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgdHdlZW5baV0uY2FsbChub2RlLCB0KTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZW5kIGV2ZW50LlxuICAgIGlmIChzZWxmLnN0YXRlID09PSBFTkRJTkcpIHtcbiAgICAgIHNlbGYub24uY2FsbChcImVuZFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHNlbGYuc3RhdGUgPSBFTkRFRDtcbiAgICBzZWxmLnRpbWVyLnN0b3AoKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2lkXTtcbiAgICBmb3IgKHZhciBpIGluIHNjaGVkdWxlcykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQVJUSU5HLCBFTkRJTkcsIEVOREVEfSBmcm9tIFwiLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBhY3RpdmUsXG4gICAgICBlbXB0eSA9IHRydWUsXG4gICAgICBpO1xuXG4gIGlmICghc2NoZWR1bGVzKSByZXR1cm47XG5cbiAgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcblxuICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgaWYgKChzY2hlZHVsZSA9IHNjaGVkdWxlc1tpXSkubmFtZSAhPT0gbmFtZSkgeyBlbXB0eSA9IGZhbHNlOyBjb250aW51ZTsgfVxuICAgIGFjdGl2ZSA9IHNjaGVkdWxlLnN0YXRlID4gU1RBUlRJTkcgJiYgc2NoZWR1bGUuc3RhdGUgPCBFTkRJTkc7XG4gICAgc2NoZWR1bGUuc3RhdGUgPSBFTkRFRDtcbiAgICBzY2hlZHVsZS50aW1lci5zdG9wKCk7XG4gICAgc2NoZWR1bGUub24uY2FsbChhY3RpdmUgPyBcImludGVycnVwdFwiIDogXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2NoZWR1bGUuaW5kZXgsIHNjaGVkdWxlLmdyb3VwKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICB9XG5cbiAgaWYgKGVtcHR5KSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG59XG4iLCJpbXBvcnQgaW50ZXJydXB0IGZyb20gXCIuLi9pbnRlcnJ1cHQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGludGVycnVwdCh0aGlzLCBuYW1lKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiB0d2VlblJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gdHdlZW4wID0gdHdlZW47XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xID0gdHdlZW4xLnNsaWNlKCk7XG4gICAgICAgICAgdHdlZW4xLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0d2VlbkZ1bmN0aW9uKGlkLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9ICh0d2VlbjAgPSB0d2Vlbikuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIHQgPSB7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSwgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMVtpXSA9IHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBuKSB0d2VlbjEucHVzaCh0KTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgbmFtZSArPSBcIlwiO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciB0d2VlbiA9IGdldCh0aGlzLm5vZGUoKSwgaWQpLnR3ZWVuO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4ubGVuZ3RoLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKHQgPSB0d2VlbltpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsID8gdHdlZW5SZW1vdmUgOiB0d2VlbkZ1bmN0aW9uKShpZCwgbmFtZSwgdmFsdWUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWVuVmFsdWUodHJhbnNpdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdHJhbnNpdGlvbi5faWQ7XG5cbiAgdHJhbnNpdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCk7XG4gICAgKHNjaGVkdWxlLnZhbHVlIHx8IChzY2hlZHVsZS52YWx1ZSA9IHt9KSlbbmFtZV0gPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBnZXQobm9kZSwgaWQpLnZhbHVlW25hbWVdO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJnYiwgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBjO1xuICByZXR1cm4gKHR5cGVvZiBiID09PSBcIm51bWJlclwiID8gaW50ZXJwb2xhdGVOdW1iZXJcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gaW50ZXJwb2xhdGVSZ2JcbiAgICAgIDogKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIGludGVycG9sYXRlUmdiKVxuICAgICAgOiBpbnRlcnBvbGF0ZVN0cmluZykoYSwgYik7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtU3ZnIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKSwgaSA9IGZ1bGxuYW1lID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHRoaXMuYXR0clR3ZWVuKG5hbWUsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKShmdWxsbmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcImF0dHIuXCIgKyBuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHZhbHVlID09IG51bGwgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKShmdWxsbmFtZSlcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKGZ1bGxuYW1lLCBpLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlKG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW5OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2VlbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGtleSA9IFwiYXR0ci5cIiArIG5hbWU7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIChmdWxsbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkZWxheUZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVsYXlDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkZWxheUZ1bmN0aW9uXG4gICAgICAgICAgOiBkZWxheUNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kZWxheTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGR1cmF0aW9uRnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGR1cmF0aW9uQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkdXJhdGlvbkZ1bmN0aW9uXG4gICAgICAgICAgOiBkdXJhdGlvbkNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kdXJhdGlvbjtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKGVhc2VDb25zdGFudChpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5lYXNlO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VWYXJ5aW5nKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgdiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLmVhY2goZWFzZVZhcnlpbmcodGhpcy5faWQsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge21hdGNoZXJ9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICBpZiAodHJhbnNpdGlvbi5faWQgIT09IHRoaXMuX2lkKSB0aHJvdyBuZXcgRXJyb3I7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHRyYW5zaXRpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlRnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9fdHJhbnNpdGlvbikgaWYgKCtpICE9PSBpZCkgcmV0dXJuO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9uKFwiZW5kLnJlbW92ZVwiLCByZW1vdmVGdW5jdGlvbih0aGlzLl9pZCkpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgICAgc2NoZWR1bGUoc3ViZ3JvdXBbaV0sIG5hbWUsIGlkLCBpLCBzdWJncm91cCwgZ2V0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG52YXIgU2VsZWN0aW9uID0gc2VsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2dyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtQ3NzIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c3R5bGV9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlTnVsbChuYW1lLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHN0cmluZzEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCBzdHJpbmcxMCA9IHN0cmluZzEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHZhbHVlMSA9IHZhbHVlKHRoaXMpLFxuICAgICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHN0cmluZzEgPSB2YWx1ZTEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVNYXliZVJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgb24wLCBvbjEsIGxpc3RlbmVyMCwga2V5ID0gXCJzdHlsZS5cIiArIG5hbWUsIGV2ZW50ID0gXCJlbmQuXCIgKyBrZXksIHJlbW92ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub24sXG4gICAgICAgIGxpc3RlbmVyID0gc2NoZWR1bGUudmFsdWVba2V5XSA9PSBudWxsID8gcmVtb3ZlIHx8IChyZW1vdmUgPSBzdHlsZVJlbW92ZShuYW1lKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjAgfHwgbGlzdGVuZXIwICE9PSBsaXN0ZW5lcikgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihldmVudCwgbGlzdGVuZXIwID0gbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgaSA9IChuYW1lICs9IFwiXCIpID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZU51bGwobmFtZSwgaSkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBzdHlsZVJlbW92ZShuYW1lKSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVGdW5jdGlvbihuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwic3R5bGUuXCIgKyBuYW1lLCB2YWx1ZSkpKVxuICAgICAgLmVhY2goc3R5bGVNYXliZVJlbW92ZSh0aGlzLl9pZCwgbmFtZSkpXG4gICAgOiB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUNvbnN0YW50KG5hbWUsIGksIHZhbHVlKSwgcHJpb3JpdHkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBudWxsKTtcbn1cbiIsImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsImltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlMSA9IHZhbHVlKHRoaXMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTEgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLnR3ZWVuKFwidGV4dFwiLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB0ZXh0RnVuY3Rpb24odHdlZW5WYWx1ZSh0aGlzLCBcInRleHRcIiwgdmFsdWUpKVxuICAgICAgOiB0ZXh0Q29uc3RhbnQodmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCIpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRJbnRlcnBvbGF0ZShpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IGkuY2FsbCh0aGlzLCB0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dFR3ZWVuKHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgdGV4dEludGVycG9sYXRlKGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJ0ZXh0XCI7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCB0ZXh0VHdlZW4odmFsdWUpKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgb24wLCBvbjEsIHRoYXQgPSB0aGlzLCBpZCA9IHRoYXQuX2lkLCBzaXplID0gdGhhdC5zaXplKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgY2FuY2VsID0ge3ZhbHVlOiByZWplY3R9LFxuICAgICAgICBlbmQgPSB7dmFsdWU6IGZ1bmN0aW9uKCkgeyBpZiAoLS1zaXplID09PSAwKSByZXNvbHZlKCk7IH19O1xuXG4gICAgdGhhdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgICAgaWYgKG9uICE9PSBvbjApIHtcbiAgICAgICAgb24xID0gKG9uMCA9IG9uKS5jb3B5KCk7XG4gICAgICAgIG9uMS5fLmNhbmNlbC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmludGVycnVwdC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmVuZC5wdXNoKGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIHNlbGVjdGlvbiB3YXMgZW1wdHksIHJlc29sdmUgZW5kIGltbWVkaWF0ZWx5XG4gICAgaWYgKHNpemUgPT09IDApIHJlc29sdmUoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyVHdlZW4gZnJvbSBcIi4vYXR0clR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kZWxheSBmcm9tIFwiLi9kZWxheS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZHVyYXRpb24gZnJvbSBcIi4vZHVyYXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2UgZnJvbSBcIi4vZWFzZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcgZnJvbSBcIi4vZWFzZVZhcnlpbmcuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlVHdlZW4gZnJvbSBcIi4vc3R5bGVUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0VHdlZW4gZnJvbSBcIi4vdGV4dFR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3R3ZWVuIGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lbmQgZnJvbSBcIi4vZW5kLmpzXCI7XG5cbnZhciBpZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2l0aW9uKGdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIHRoaXMuX2lkID0gaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0aW9uKCkudHJhbnNpdGlvbihuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0lkKCkge1xuICByZXR1cm4gKytpZDtcbn1cblxudmFyIHNlbGVjdGlvbl9wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZSA9IHRyYW5zaXRpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVHJhbnNpdGlvbixcbiAgc2VsZWN0OiB0cmFuc2l0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiB0cmFuc2l0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHRyYW5zaXRpb25fZmlsdGVyLFxuICBtZXJnZTogdHJhbnNpdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiB0cmFuc2l0aW9uX3NlbGVjdGlvbixcbiAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbl90cmFuc2l0aW9uLFxuICBjYWxsOiBzZWxlY3Rpb25fcHJvdG90eXBlLmNhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9wcm90b3R5cGUuZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9wcm90b3R5cGUuZWFjaCxcbiAgb246IHRyYW5zaXRpb25fb24sXG4gIGF0dHI6IHRyYW5zaXRpb25fYXR0cixcbiAgYXR0clR3ZWVuOiB0cmFuc2l0aW9uX2F0dHJUd2VlbixcbiAgc3R5bGU6IHRyYW5zaXRpb25fc3R5bGUsXG4gIHN0eWxlVHdlZW46IHRyYW5zaXRpb25fc3R5bGVUd2VlbixcbiAgdGV4dDogdHJhbnNpdGlvbl90ZXh0LFxuICB0ZXh0VHdlZW46IHRyYW5zaXRpb25fdGV4dFR3ZWVuLFxuICByZW1vdmU6IHRyYW5zaXRpb25fcmVtb3ZlLFxuICB0d2VlbjogdHJhbnNpdGlvbl90d2VlbixcbiAgZGVsYXk6IHRyYW5zaXRpb25fZGVsYXksXG4gIGR1cmF0aW9uOiB0cmFuc2l0aW9uX2R1cmF0aW9uLFxuICBlYXNlOiB0cmFuc2l0aW9uX2Vhc2UsXG4gIGVhc2VWYXJ5aW5nOiB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nLFxuICBlbmQ6IHRyYW5zaXRpb25fZW5kLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX3Byb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdXG59O1xuIiwiZXhwb3J0IGNvbnN0IGxpbmVhciA9IHQgPT4gK3Q7XG4iLCJleHBvcnQgZnVuY3Rpb24gY3ViaWNJbih0KSB7XG4gIHJldHVybiB0ICogdCAqIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY091dCh0KSB7XG4gIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY0luT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gdCAqIHQgKiB0IDogKHQgLT0gMikgKiB0ICogdCArIDIpIC8gMjtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUgZnJvbSBcIi4uL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7ZWFzZUN1YmljSW5PdXR9IGZyb20gXCJkMy1lYXNlXCI7XG5pbXBvcnQge25vd30gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBkZWZhdWx0VGltaW5nID0ge1xuICB0aW1lOiBudWxsLCAvLyBTZXQgb24gdXNlLlxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDI1MCxcbiAgZWFzZTogZWFzZUN1YmljSW5PdXRcbn07XG5cbmZ1bmN0aW9uIGluaGVyaXQobm9kZSwgaWQpIHtcbiAgdmFyIHRpbWluZztcbiAgd2hpbGUgKCEodGltaW5nID0gbm9kZS5fX3RyYW5zaXRpb24pIHx8ICEodGltaW5nID0gdGltaW5nW2lkXSkpIHtcbiAgICBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmFuc2l0aW9uICR7aWR9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGltaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBpZCxcbiAgICAgIHRpbWluZztcblxuICBpZiAobmFtZSBpbnN0YW5jZW9mIFRyYW5zaXRpb24pIHtcbiAgICBpZCA9IG5hbWUuX2lkLCBuYW1lID0gbmFtZS5fbmFtZTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IG5ld0lkKCksICh0aW1pbmcgPSBkZWZhdWx0VGltaW5nKS50aW1lID0gbm93KCksIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZCwgaSwgZ3JvdXAsIHRpbWluZyB8fCBpbmhlcml0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBzZWxlY3Rpb25faW50ZXJydXB0IGZyb20gXCIuL2ludGVycnVwdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcblxuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBzZWxlY3Rpb25faW50ZXJydXB0O1xuc2VsZWN0aW9uLnByb3RvdHlwZS50cmFuc2l0aW9uID0gc2VsZWN0aW9uX3RyYW5zaXRpb247XG4iLCJleHBvcnQgZnVuY3Rpb24gVHJhbnNmb3JtKGssIHgsIHkpIHtcbiAgdGhpcy5rID0gaztcbiAgdGhpcy54ID0geDtcbiAgdGhpcy55ID0geTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zZm9ybSxcbiAgc2NhbGU6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gayA9PT0gMSA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuayAqIGssIHRoaXMueCwgdGhpcy55KTtcbiAgfSxcbiAgdHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHggPT09IDAgJiB5ID09PSAwID8gdGhpcyA6IG5ldyBUcmFuc2Zvcm0odGhpcy5rLCB0aGlzLnggKyB0aGlzLmsgKiB4LCB0aGlzLnkgKyB0aGlzLmsgKiB5KTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIFtwb2ludFswXSAqIHRoaXMuayArIHRoaXMueCwgcG9pbnRbMV0gKiB0aGlzLmsgKyB0aGlzLnldO1xuICB9LFxuICBhcHBseVg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCAqIHRoaXMuayArIHRoaXMueDtcbiAgfSxcbiAgYXBwbHlZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLmsgKyB0aGlzLnk7XG4gIH0sXG4gIGludmVydDogZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICByZXR1cm4gWyhsb2NhdGlvblswXSAtIHRoaXMueCkgLyB0aGlzLmssIChsb2NhdGlvblsxXSAtIHRoaXMueSkgLyB0aGlzLmtdO1xuICB9LFxuICBpbnZlcnRYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4IC0gdGhpcy54KSAvIHRoaXMuaztcbiAgfSxcbiAgaW52ZXJ0WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiAoeSAtIHRoaXMueSkgLyB0aGlzLms7XG4gIH0sXG4gIHJlc2NhbGVYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHguY29weSgpLmRvbWFpbih4LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WCwgdGhpcykubWFwKHguaW52ZXJ0LCB4KSk7XG4gIH0sXG4gIHJlc2NhbGVZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkuY29weSgpLmRvbWFpbih5LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WSwgdGhpcykubWFwKHkuaW52ZXJ0LCB5KSk7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnggKyBcIixcIiArIHRoaXMueSArIFwiKSBzY2FsZShcIiArIHRoaXMuayArIFwiKVwiO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0gbmV3IFRyYW5zZm9ybSgxLCAwLCAwKTtcblxudHJhbnNmb3JtLnByb3RvdHlwZSA9IFRyYW5zZm9ybS5wcm90b3R5cGU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlKSB7XG4gIHdoaWxlICghbm9kZS5fX3pvb20pIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHJldHVybiBub2RlLl9fem9vbTtcbn1cbiIsImV4cG9ydCBjb25zdCBzdmducyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSA8VCBleHRlbmRzIEVsZW1lbnQ+KFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICB0eXBlPzogbmV3ICgpID0+IFRcbik6IFQgPT4ge1xuICBjb25zdCBlbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgaWYgKGVsdCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIHNlbGVjdG9yIFwiICsgc2VsZWN0b3IpO1xuICB9XG4gIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgIShlbHQgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgU2VsZWN0b3IgJHtzZWxlY3Rvcn0gbm90IG9mIHR5cGUgJHt0eXBlfWApO1xuICB9XG4gIHJldHVybiBlbHQgYXMgVDtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgZml0dHMgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBiaWdUYXJnZXQxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLmJpZy10YXJnZXQxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCAzNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDQwLCA1MCwgMjUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCA0MCwgNTAsIDE1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgNDAsIDUwLCA1KTtcbiAgY29uc3QgYmlnVGFyZ2V0MiA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuZml0dHMgZy5iaWctdGFyZ2V0MlwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgMzUpO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQyLCA0MCwgNTAsIDI1KTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MiwgNDAsIDUwLCAxNSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDIsIDQwLCA1MCwgNSk7XG4gIGNvbnN0IHNtYWxsVGFyZ2V0ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5maXR0cyBnLnNtYWxsLXRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHNtYWxsVGFyZ2V0LCA0MCwgNTAsIDUpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwdXJwb3NlID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgYmlnVGFyZ2V0MSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucHVycG9zZSBnLnRhcmdldFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDQwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMzApO1xuICB0LmNyZWF0ZUNpcmNsZShiaWdUYXJnZXQxLCAxNTAsIDUwLCAyMCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGJpZ1RhcmdldDEsIDE1MCwgNTAsIDEwKTtcbiAgdC5jcmVhdGVDaXJjbGUoYmlnVGFyZ2V0MSwgMTUwLCA1MCwgMSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGhpY2sgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnMSA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wMVwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMSxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDQwIDQwLDQwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGcyID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTAyXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGcyLFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnMyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wM1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnMyxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsNDAgNDAsNDAgNDAsMFwiIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIGRlbGF5OiB0LmdldERlbGF5KCksXG4gICAgfVxuICApO1xuICBjb25zdCBnNCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuaGljayBnLmNob2ljZS0wNFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlRm9ybShcbiAgICBnNCxcbiAgICBcInBvbHlnb25cIixcbiAgICB7IHBvaW50czogXCIwLDAgMCwwIDAsMCAwLDBcIiB9LFxuICAgIHsgcG9pbnRzOiBcIjAsMCAyMCw0MCA0MCwwXCIgfSxcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHQuZ2V0RGVsYXkoKSxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGc1ID0gcXVlcnlTZWxlY3RvcihcInN2Zy5oaWNrIGcuY2hvaWNlLTA1XCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVGb3JtKFxuICAgIGc1LFxuICAgIFwicG9seWdvblwiLFxuICAgIHsgcG9pbnRzOiBcIjAsMCAwLDAgMCwwIDAsMFwiIH0sXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsNDAgNDAsMjBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZzYgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmhpY2sgZy5jaG9pY2UtMDZcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUZvcm0oXG4gICAgZzYsXG4gICAgXCJwb2x5Z29uXCIsXG4gICAgeyBwb2ludHM6IFwiMCwwIDAsMCAwLDAgMCwwXCIgfSxcbiAgICB7IHBvaW50czogXCIwLDQwIDQwLDQwIDIwLDBcIiB9LFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBkZWxheTogdC5nZXREZWxheSgpLFxuICAgIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgamFrb2IgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBhcHAxID0gcXVlcnlTZWxlY3RvcihcInN2Zy5qYWtvYiBnLmFwcC0xXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVDaXJjbGUoYXBwMSwgNDAsIDUwLCAzNSk7XG4gIGNvbnN0IGFwcDIgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmpha29iIGcuYXBwLTJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZUNpcmNsZShhcHAyLCA0MCwgNTAsIDM1KTtcbiAgY29uc3QgeW91ckFwcCA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuamFrb2IgZy55b3VyLWFwcFwiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKHlvdXJBcHAsIDQwLCA1MCwgMzUpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBncmFkaWVudCA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLmdyYWRpZW50IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVJlY3QoZywgNSwgMzAsIDQwLCA0MCwgMSk7XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgMzAsIDQwLCA0MCwgMik7XG4gIHQuY3JlYXRlUmVjdChnLCA5NSwgMzAsIDQwLCA0MCwgMyk7XG4gIHQuY3JlYXRlUmVjdChnLCAxNDAsIDMwLCA0MCwgNDAsIDQpO1xuICB0LmNyZWF0ZVJlY3QoZywgMTg1LCAzMCwgNDAsIDQwLCA1KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDIzMCwgMzAsIDQwLCA0MCwgNik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IGdlc3RhbHQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5nZXN0YWx0IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAsIHkgKiAyMCArIDIwLCA1LCB7XG4gICAgICAgIGNsYXNzOiBcImZ1bGxcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5leHBvcnQgY29uc3QgcHJveGltaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcucHJveGltaXR5IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSB4ID4gMSAmJiB5IDwgMiA/IDggOiAwO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwICsgb2Zmc2V0LCB5ICogMjAgKyAyMCAtIG9mZnNldCwgNSwge1xuICAgICAgICBjbGFzczogXCJmdWxsXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHNpbWlsYXJpdHkgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5zaW1pbGFyaXR5IGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBteUNsYXNzID0geCA+IDEgJiYgeSA8IDIgPyBcInh4eFwiIDogXCJmdWxsXCI7XG4gICAgICB0LmNyZWF0ZUNpcmNsZShnLCB4ICogMjAgKyAxMDAsIHkgKiAyMCArIDIwLCA1LCB7XG4gICAgICAgIGNsYXNzOiBteUNsYXNzLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBjb21tb25SZWdpb24gPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5jb21tb25SZWdpb24gZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCAxMDAgKyAzMiwgMTIsIDU3LCAzNywgMik7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgIHQuY3JlYXRlQ2lyY2xlKGcsIHggKiAyMCArIDEwMCwgeSAqIDIwICsgMjAsIDUsIHtcbiAgICAgICAgY2xhc3M6IFwiZnVsbFwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBzaW1wbGljaXR5ID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCJzdmcuc2ltcGxpY2l0eSBnXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVSZWN0KGcsIDEwMCArIDMyLCAxMiwgNTcsIDM3LCAyKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDEwMCAtIDgsIDEyLCA5NywgNzcsIDIpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBtaWxsZXIgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5taWxsZXIgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDEzMCwgMjAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxNTAsIDIwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTcwLCAyMCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDE3MCwgNDAsIDUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAxNzAsIDYwLCA1LCB7IGNsYXNzOiBcImZ1bGxcIiB9KTtcbiAgdC5jcmVhdGVDaXJjbGUoZywgMTcwLCA4MCwgNSwgeyBjbGFzczogXCJmdWxsXCIgfSk7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHRlc2xlciA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnRlc2xlciBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICB0LmNyZWF0ZUNpcmNsZShnLCAxMDAgKyBpICogMjAsIDIwLCA1LCB7XG4gICAgICBjbGFzczogaSA+PSAzID8gXCJlbXB0eVwiIDogXCJmdWxsXCIsXG4gICAgfSk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICB0LmNyZWF0ZUNpcmNsZShnLCAxMDAgKyBpICogMjAsIDUwLCA1LCB7IGNsYXNzOiBpICUgMiA/IFwiZW1wdHlcIiA6IFwiZnVsbFwiIH0pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgMTAwICsgaSAqIDIwLCA4MCwgNSwgeyBjbGFzczogaSA8IDMgPyBcImVtcHR5XCIgOiBcImZ1bGxcIiB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCBwb3N0ZWwgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy5wb3N0ZWwgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlQ2lyY2xlKGcsIDgwLCA1MCwgMzUsIHsgY2xhc3M6IFwiZnVsbFwiIH0pO1xuICB0LmNyZWF0ZUNpcmNsZShnLCAyMjAsIDUwLCAzNSwgeyBjbGFzczogXCJlbXB0eVwiIH0pO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCB6ZWlnYXJuaWsgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcInN2Zy56ZWlnYXJuaWsgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgdC5jcmVhdGVSZWN0KGcsIDUwLCBpICogMTUsIDIwMCwgMTAsIDYsIFwiZW1wdHlyZWN0XCIpO1xuICB9XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgNSAqIDE1LCAxNTAsIDEwLCA2LCBcImZ1bGxyZWN0XCIpO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5U2VsZWN0b3IgfSBmcm9tIFwiLi4vbWlzY1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuLi9TVkdUb29sXCI7XG5cbmV4cG9ydCBjb25zdCB2b25SZXN0b3JmZiA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwic3ZnLnZvblJlc3RvcmZmIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICBjb25zdCBteUNsYXNzID0geCA9PT0gMiAmJiB5ID09PSAyID8gXCJ4eHhcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogbXlDbGFzcyxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBxdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4uL21pc2NcIjtcbmltcG9ydCB7IFNWR1Rvb2wgfSBmcm9tIFwiLi4vU1ZHVG9vbFwiO1xuXG5jb25zdCBwb2ludHMgPVxuICBcIjIwLDEwLCAyMCwyMCAxMCwzMCwgMjAsNDAgMjAsNTAsIDEwLDUwIDEwLDYwIDIwLDYwIDIwLDcwIDIwLDgwIDEwLDkwXCI7XG5cbmV4cG9ydCBjb25zdCBzeW1ldHJpZSA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZy5pbm5lckhUTUwgPSBgXG48ZyBjbGFzcz1cInAxXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDYwKVwiPjwvZz5cbjxnIGNsYXNzPVwicDJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoODApXCI+PC9nPlxuPGcgY2xhc3M9XCJwM1wiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgxODApXCI+PC9nPlxuPGcgY2xhc3M9XCJwNFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyMzApIHNjYWxlKC0xLCAxKVwiPjwvZz5cbmA7XG5cbiAgY29uc3QgZzEgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnLnAxXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVQb2x5bGluZShnMSwgcG9pbnRzLCBcImVtcHR5XCIpO1xuICBjb25zdCBnMiA9IHF1ZXJ5U2VsZWN0b3IoXCIuc3ltZXRyaWUgc3ZnIGcucDJcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVBvbHlsaW5lKGcyLCBwb2ludHMsIFwiZW1wdHlcIik7XG5cbiAgY29uc3QgZzMgPSBxdWVyeVNlbGVjdG9yKFwiLnN5bWV0cmllIHN2ZyBnLnAzXCIsIFNWR0dFbGVtZW50KTtcbiAgdC5jcmVhdGVQb2x5bGluZShnMywgcG9pbnRzLCBcImVtcHR5XCIpO1xuICBjb25zdCBnNCA9IHF1ZXJ5U2VsZWN0b3IoXCIuc3ltZXRyaWUgc3ZnIGcucDRcIiwgU1ZHR0VsZW1lbnQpO1xuICB0LmNyZWF0ZVBvbHlsaW5lKGc0LCBwb2ludHMsIFwiZW1wdHlcIik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHNlcmlhbFBvc2l0aW9uID0gKHQ6IFNWR1Rvb2wpID0+IHtcbiAgY29uc3QgZyA9IHF1ZXJ5U2VsZWN0b3IoXCIuc2VyaWFsUG9zaXRpb24gc3ZnIGdcIiwgU1ZHR0VsZW1lbnQpO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDc7IHgrKykge1xuICAgIGNvbnN0IGNzc0NsYXNzID0geCA9PT0gMCB8fCB4ID09PSA2ID8gXCJmdWxsXCIgOiBcImVtcHR5XCI7XG4gICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDQwICsgMzAsIDUwLCAyMCwge1xuICAgICAgY2xhc3M6IGNzc0NsYXNzLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHBhcmV0byA9ICh0OiBTVkdUb29sKSA9PiB7XG4gIGNvbnN0IGcgPSBxdWVyeVNlbGVjdG9yKFwiLnBhcmV0byBzdmcgZ1wiLCBTVkdHRWxlbWVudCk7XG4gIHQuY3JlYXRlUmVjdChnLCA1MCwgNDAsIDUwLCAyMCwgNiwgXCJlbXB0eVwiKTtcbiAgdC5jcmVhdGVSZWN0KGcsIDE1MCwgMTAsIDEwMCwgODAsIDYsIFwiZW1wdHlcIik7XG59O1xuIiwiaW1wb3J0IHsgcXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9taXNjXCI7XG5pbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4uL1NWR1Rvb2xcIjtcblxuZXhwb3J0IGNvbnN0IHBlYWtFbmQgPSAodDogU1ZHVG9vbCkgPT4ge1xuICBjb25zdCBnID0gcXVlcnlTZWxlY3RvcihcIi5wZWFrRW5kIHN2ZyBnXCIsIFNWR0dFbGVtZW50KTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgY29uc3QgY3NzQ2xhc3MgPVxuICAgICAgICAoeCA9PT0gMSAmJiB5ID09PSAxKSB8fCAoeCA9PT0gNCAmJiB5ID09PSAzKSA/IFwiZW1wdHlcIiA6IFwiZnVsbFwiO1xuICAgICAgdC5jcmVhdGVDaXJjbGUoZywgeCAqIDIwICsgMTAwLCB5ICogMjAgKyAyMCwgNSwge1xuICAgICAgICBjbGFzczogY3NzQ2xhc3MsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBTVkdUb29sIH0gZnJvbSBcIi4vU1ZHVG9vbFwiO1xuaW1wb3J0IHsgZml0dHMgfSBmcm9tIFwiLi9zdmdzL2ZpdHRzXCI7XG5pbXBvcnQgeyBwdXJwb3NlIH0gZnJvbSBcIi4vc3Zncy9wdXJwb3NlXCI7XG5pbXBvcnQgeyBoaWNrIH0gZnJvbSBcIi4vc3Zncy9oaWNrXCI7XG5pbXBvcnQgeyBqYWtvYiB9IGZyb20gXCIuL3N2Z3MvamFrb2JcIjtcbmltcG9ydCB7IGdyYWRpZW50IH0gZnJvbSBcIi4vc3Zncy9ncmFkaWVudFwiO1xuaW1wb3J0IHsgZ2VzdGFsdCB9IGZyb20gXCIuL3N2Z3MvZ2VzdGFsdFwiO1xuaW1wb3J0IHsgcHJveGltaXR5IH0gZnJvbSBcIi4vc3Zncy9wcm94aW1pdHlcIjtcbmltcG9ydCB7IHNpbWlsYXJpdHkgfSBmcm9tIFwiLi9zdmdzL3NpbWlsYXJpdHlcIjtcbmltcG9ydCB7IGNvbW1vblJlZ2lvbiB9IGZyb20gXCIuL3N2Z3MvY29tbW9uUmVnaW9uXCI7XG5pbXBvcnQgeyBzaW1wbGljaXR5IH0gZnJvbSBcIi4vc3Zncy9zaW1wbGljaXR5XCI7XG5pbXBvcnQgeyBtaWxsZXIgfSBmcm9tIFwiLi9zdmdzL21pbGxlclwiO1xuaW1wb3J0IHsgdGVzbGVyIH0gZnJvbSBcIi4vc3Zncy90ZXNsZXJcIjtcbmltcG9ydCB7IHBvc3RlbCB9IGZyb20gXCIuL3N2Z3MvcG9zdGVsXCI7XG5pbXBvcnQgeyB6ZWlnYXJuaWsgfSBmcm9tIFwiLi9zdmdzL3plaWdhcm5pa1wiO1xuaW1wb3J0IHsgdm9uUmVzdG9yZmYgfSBmcm9tIFwiLi9zdmdzL3ZvblJlc3RvcmZmXCI7XG5pbXBvcnQgeyBzeW1ldHJpZSB9IGZyb20gXCIuL3N2Z3Mvc3ltZXRyaWVcIjtcbmltcG9ydCB7IHNlcmlhbFBvc2l0aW9uIH0gZnJvbSBcIi4vc3Zncy9zZXJpYWxQb3NpdGlvblwiO1xuaW1wb3J0IHsgcGFyZXRvIH0gZnJvbSBcIi4vc3Zncy9wYXJldG9cIjtcbmltcG9ydCB7IHBlYWtFbmQgfSBmcm9tIFwiLi9zdmdzL3BlYWtFbmRcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiAoKHQ6IFNWR1Rvb2wpID0+IHZvaWQpW10gfSA9IHtcbiAgZml0dHM6IFtmaXR0c10sXG4gIHB1cnBvc2U6IFtwdXJwb3NlXSxcbiAgaGljazogW2hpY2tdLFxuICBqYWtvYjogW2pha29iXSxcbiAgZ3JhZGllbnQ6IFtncmFkaWVudF0sXG4gIGdlc3RhbHQ6IFtnZXN0YWx0XSxcbiAgcHJveGltaXR5OiBbcHJveGltaXR5XSxcbiAgc2ltaWxhcml0eTogW3NpbWlsYXJpdHldLFxuICBjb21tb25SZWdpb246IFtjb21tb25SZWdpb25dLFxuICBzaW1wbGljaXR5OiBbc2ltcGxpY2l0eV0sXG4gIG1pbGxlcjogW21pbGxlcl0sXG4gIHRlc2xlcjogW3Rlc2xlcl0sXG4gIHBvc3RlbDogW3Bvc3RlbF0sXG4gIHplaWdhcm5pazogW3plaWdhcm5pa10sXG4gIHZvblJlc3RvcmZmOiBbdm9uUmVzdG9yZmZdLFxuICBzeW1ldHJpZTogW3N5bWV0cmllXSxcbiAgc2VyaWFsUG9zaXRpb246IFtzZXJpYWxQb3NpdGlvbl0sXG4gIHBhcmV0bzogW3BhcmV0b10sXG4gIHBlYWtFbmQ6IFtwZWFrRW5kXSxcbn07XG5cbmNvbnN0IHNldCA9IG5ldyBTZXQ8KHQ6IFNWR1Rvb2wpID0+IHZvaWQ+KCk7XG5mb3IgKGNvbnN0IHZhbHVlcyBvZiBPYmplY3QudmFsdWVzKGNvbmZpZykpIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICBzZXQuYWRkKHZhbHVlKTtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IGFsbCA9IFsuLi5zZXRdO1xuIiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2ludGVyZmFjZXMvVHJhbnNpdGlvbk9wdGlvbnNcIjtcbmltcG9ydCB7IGNvbmZpZywgYWxsIH0gZnJvbSBcIi4vc3ZnQ29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBTVkdUb29sIHtcbiAgZGVsYXlDb3VudGVyID0gMDtcbiAgZGVsYXlJbmNyZW1lbnQgPSAxMDA7XG4gIHVzZVRyYW5zaXRpb24gPSBmYWxzZTtcblxuICBzdmdOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdFN2Z05hbWUoKTtcbiAgfVxuXG4gIGluaXRTdmdOYW1lKCkge1xuICAgIGNvbnN0IHV4bGF3SW1hZ2VOYW1lID0gKHdpbmRvdyBhcyBhbnkpW1widXhsYXdJbWFnZU5hbWVcIl07XG4gICAgY29uc3QgdXhsYXdDbGFzc05hbWUgPSAod2luZG93IGFzIGFueSlbXCJ1eGxhd0NsYXNzTmFtZVwiXTtcbiAgICBjb25zdCBzdmdOYW1lID1cbiAgICAgIHV4bGF3SW1hZ2VOYW1lID09PSBcImRlZmF1bHRcIiA/IHV4bGF3Q2xhc3NOYW1lIDogdXhsYXdJbWFnZU5hbWU7XG4gICAgaWYgKHN2Z05hbWUpIHtcbiAgICAgIHRoaXMuc3ZnTmFtZSA9IHN2Z05hbWU7XG4gICAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVzZVRyYW5zaXRpb24gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXRTdmcoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3ZnTmFtZSA/IGNvbmZpZ1t0aGlzLnN2Z05hbWVdIDogYWxsO1xuICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBmIG9mIGxpc3QpIHtcbiAgICAgIGYodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVsYXkoKSB7XG4gICAgdGhpcy5kZWxheUNvdW50ZXIgKz0gdGhpcy5kZWxheUluY3JlbWVudDtcbiAgICByZXR1cm4gdGhpcy5kZWxheUNvdW50ZXI7XG4gIH1cblxuICBjcmVhdGVDaXJjbGUoXG4gICAgZ3JvdXA6IFNWR0dFbGVtZW50LFxuICAgIGN4OiBudW1iZXIsXG4gICAgY3k6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFBhcnRpYWw8VHJhbnNpdGlvbk9wdGlvbnM+XG4gICkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3JtKFxuICAgICAgZ3JvdXAsXG4gICAgICBcImNpcmNsZVwiLFxuICAgICAge1xuICAgICAgICBjeCxcbiAgICAgICAgY3ksXG4gICAgICAgIHI6IDAsXG4gICAgICB9LFxuICAgICAgeyByIH0sXG4gICAgICBvcHRzXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVBvbHlnb24oZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWdvblwiLFxuICAgICAgeyBwb2ludHM6IFwiXCIgfSxcbiAgICAgIHsgcG9pbnRzOiBwb2ludHMgfSxcbiAgICAgIHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGVsYXk6IHRoaXMuZ2V0RGVsYXkoKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUG9seWxpbmUoZ3JvdXA6IFNWR0dFbGVtZW50LCBwb2ludHM6IHN0cmluZywgY3NzQ2xhc3MgPSBcImZ1bGxcIikge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZvcm0oXG4gICAgICBncm91cCxcbiAgICAgIFwicG9seWxpbmVcIixcbiAgICAgIHsgcG9pbnRzOiBcIlwiIH0sXG4gICAgICB7IHBvaW50czogcG9pbnRzIH0sXG4gICAgICB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRlbGF5OiB0aGlzLmdldERlbGF5KCksXG4gICAgICAgIGNsYXNzOiBjc3NDbGFzcyxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUmVjdChcbiAgICBncm91cDogU1ZHR0VsZW1lbnQsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGludGVuc2l0eSA9IDYsXG4gICAgY3NzQ2xhc3MgPSBcImVtcHR5XCJcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRm9ybShcbiAgICAgIGdyb3VwLFxuICAgICAgXCJyZWN0XCIsXG4gICAgICB7IHgsIHksIHdpZHRoLCBoZWlnaHQ6IDAsIG9wYWNpdHk6IGludGVuc2l0eSAqICgxLjAgLyA2KSB9LFxuICAgICAgeyBoZWlnaHQ6IGhlaWdodCB9LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkZWxheTogdGhpcy5nZXREZWxheSgpLFxuICAgICAgICBjbGFzczogY3NzQ2xhc3MsXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZUZvcm0gPSA8VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgc3RyaW5nIH0+KFxuICAgIGNvbnRhaW5lcjogU1ZHR0VsZW1lbnQsXG4gICAgZWx0TmFtZTogc3RyaW5nLFxuICAgIGluaXRpYWxBdHRyaWJ1dGVzOiBULFxuICAgIGZpbmFsQXR0cmlidXRlczogUGFydGlhbDxUPixcbiAgICBvcHRpb25zPzogUGFydGlhbDxUcmFuc2l0aW9uT3B0aW9ucz5cbiAgKSA9PiB7XG4gICAgY29uc3Qgb3B0czogVHJhbnNpdGlvbk9wdGlvbnMgPSB7XG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIGRlbGF5OiAxMDAwLFxuICAgICAgY2xhc3M6IFwiXCIsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgaWYgKCF0aGlzLnVzZVRyYW5zaXRpb24pIHtcbiAgICAgIG9wdHMuZGVsYXkgPSAwO1xuICAgICAgb3B0cy5kdXJhdGlvbiA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGVsdCA9IGQzLnNlbGVjdChjb250YWluZXIpLmFwcGVuZChlbHROYW1lKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGluaXRpYWxBdHRyaWJ1dGVzKSkge1xuICAgICAgZWx0LmF0dHIoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChvcHRzLmNsYXNzKSB7XG4gICAgICBlbHQuYXR0cihcImNsYXNzXCIsIG9wdHMuY2xhc3MpO1xuICAgIH1cblxuICAgIGNvbnN0IHQgPSBlbHRcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbihvcHRzLmR1cmF0aW9uKVxuICAgICAgLmRlbGF5KG9wdHMuZGVsYXkpXG4gICAgICAuZWFzZShkMy5lYXNlTGluZWFyKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbmFsQXR0cmlidXRlcykpIHtcbiAgICAgIHQuYXR0cihrZXksIHZhbHVlKTtcbiAgICB9XG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgaW5pdFRoZW1lID0gKCkgPT4ge1xuICBoYW5kbGVEYXJrVGhlbWUoKTtcblxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgXCItLXByaW1hcnktY29sb3JcIixcbiAgICBcImhzbCgxMjAsIDEwMCUsIDI1JSlcIlxuICApO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgXCItLWZpbGwtY29sb3JcIixcbiAgICBcImhzbGEoMTIwLCAwJSwgMjUlLCAwLjEpXCJcbiAgKTtcbn07XG5cbmNvbnN0IGhhbmRsZURhcmtUaGVtZSA9ICgpID0+IHtcbiAgY29uc3QgaXNEYXJrID1cbiAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzO1xuXG4gIGNvbnN0IGNsID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3Q7XG4gIGlzRGFyayA/IGNsLmFkZChcImRhcmtcIikgOiBjbC5hZGQoXCJsaWdodFwiKTtcblxuICB3aW5kb3dcbiAgICAubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY29sb3JTY2hlbWUgPSBlLm1hdGNoZXMgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29sb3JTY2hlbWU6IFwiLCBjb2xvclNjaGVtZSk7XG5cbiAgICAgIGNsLnJlbW92ZShcImRhcmtcIik7XG4gICAgICBjbC5yZW1vdmUoXCJsaWdodFwiKTtcbiAgICAgIGlmIChjb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIpIHtcbiAgICAgICAgY2wuYWRkKFwiZGFya1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsLmFkZChcImxpZ2h0XCIpO1xuICAgICAgfVxuICAgIH0pO1xufTtcbiIsImltcG9ydCBcIi4vc2Nzcy9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgU1ZHVG9vbCB9IGZyb20gXCIuL1NWR1Rvb2xcIjtcblxuaW1wb3J0IHsgaW5pdFRoZW1lIH0gZnJvbSBcIi4vdGhlbWVcIjtcblxuaW5pdFRoZW1lKCk7XG5cbmNvbnN0IHN2Z1Rvb2wgPSBuZXcgU1ZHVG9vbCgpO1xuc3ZnVG9vbC5pbml0U3ZnKCk7XG4iXSwibmFtZXMiOlsibm9vcCIsImRpc3BhdGNoIiwiaSIsIm4iLCJfIiwidCIsIkRpc3BhdGNoIiwicGFyc2VUeXBlbmFtZXMiLCJ0eXBlbmFtZXMiLCJ0eXBlcyIsIm5hbWUiLCJ0eXBlbmFtZSIsImNhbGxiYWNrIiwiVCIsImdldCIsInNldCIsImNvcHkiLCJ0eXBlIiwidGhhdCIsImFyZ3MiLCJjIiwieGh0bWwiLCJuYW1lc3BhY2VzIiwibmFtZXNwYWNlIiwicHJlZml4IiwiY3JlYXRvckluaGVyaXQiLCJkb2N1bWVudCIsInVyaSIsImNyZWF0b3JGaXhlZCIsImZ1bGxuYW1lIiwiY3JlYXRvciIsIm5vbmUiLCJzZWxlY3RvciIsInNlbGVjdGlvbl9zZWxlY3QiLCJzZWxlY3QiLCJncm91cHMiLCJtIiwic3ViZ3JvdXBzIiwiaiIsImdyb3VwIiwic3ViZ3JvdXAiLCJub2RlIiwic3Vibm9kZSIsIlNlbGVjdGlvbiIsImFycmF5IiwieCIsImVtcHR5Iiwic2VsZWN0b3JBbGwiLCJhcnJheUFsbCIsInNlbGVjdGlvbl9zZWxlY3RBbGwiLCJwYXJlbnRzIiwibWF0Y2hlciIsImNoaWxkTWF0Y2hlciIsImZpbmQiLCJjaGlsZEZpbmQiLCJtYXRjaCIsImNoaWxkRmlyc3QiLCJzZWxlY3Rpb25fc2VsZWN0Q2hpbGQiLCJmaWx0ZXIiLCJjaGlsZHJlbiIsImNoaWxkcmVuRmlsdGVyIiwic2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIiwic2VsZWN0aW9uX2ZpbHRlciIsInNwYXJzZSIsInVwZGF0ZSIsInNlbGVjdGlvbl9lbnRlciIsIkVudGVyTm9kZSIsInBhcmVudCIsImRhdHVtIiwiY2hpbGQiLCJuZXh0IiwiY29uc3RhbnQkMSIsImJpbmRJbmRleCIsImVudGVyIiwiZXhpdCIsImRhdGEiLCJncm91cExlbmd0aCIsImRhdGFMZW5ndGgiLCJiaW5kS2V5Iiwia2V5Iiwibm9kZUJ5S2V5VmFsdWUiLCJrZXlWYWx1ZXMiLCJrZXlWYWx1ZSIsInNlbGVjdGlvbl9kYXRhIiwidmFsdWUiLCJiaW5kIiwiY29uc3RhbnQiLCJhcnJheWxpa2UiLCJlbnRlckdyb3VwIiwidXBkYXRlR3JvdXAiLCJleGl0R3JvdXAiLCJpMCIsImkxIiwicHJldmlvdXMiLCJzZWxlY3Rpb25fZXhpdCIsInNlbGVjdGlvbl9qb2luIiwib25lbnRlciIsIm9udXBkYXRlIiwib25leGl0Iiwic2VsZWN0aW9uX21lcmdlIiwiY29udGV4dCIsInNlbGVjdGlvbiIsImdyb3VwczAiLCJncm91cHMxIiwibTAiLCJtMSIsIm1lcmdlcyIsImdyb3VwMCIsImdyb3VwMSIsIm1lcmdlIiwic2VsZWN0aW9uX29yZGVyIiwic2VsZWN0aW9uX3NvcnQiLCJjb21wYXJlIiwiYXNjZW5kaW5nIiwiY29tcGFyZU5vZGUiLCJhIiwiYiIsInNvcnRncm91cHMiLCJzb3J0Z3JvdXAiLCJzZWxlY3Rpb25fY2FsbCIsInNlbGVjdGlvbl9ub2RlcyIsInNlbGVjdGlvbl9ub2RlIiwic2VsZWN0aW9uX3NpemUiLCJzaXplIiwic2VsZWN0aW9uX2VtcHR5Iiwic2VsZWN0aW9uX2VhY2giLCJhdHRyUmVtb3ZlIiwiYXR0clJlbW92ZU5TIiwiYXR0ckNvbnN0YW50IiwiYXR0ckNvbnN0YW50TlMiLCJhdHRyRnVuY3Rpb24iLCJ2IiwiYXR0ckZ1bmN0aW9uTlMiLCJzZWxlY3Rpb25fYXR0ciIsImRlZmF1bHRWaWV3Iiwic3R5bGVSZW1vdmUiLCJzdHlsZUNvbnN0YW50IiwicHJpb3JpdHkiLCJzdHlsZUZ1bmN0aW9uIiwic2VsZWN0aW9uX3N0eWxlIiwic3R5bGVWYWx1ZSIsInByb3BlcnR5UmVtb3ZlIiwicHJvcGVydHlDb25zdGFudCIsInByb3BlcnR5RnVuY3Rpb24iLCJzZWxlY3Rpb25fcHJvcGVydHkiLCJjbGFzc0FycmF5Iiwic3RyaW5nIiwiY2xhc3NMaXN0IiwiQ2xhc3NMaXN0IiwiY2xhc3NlZEFkZCIsIm5hbWVzIiwibGlzdCIsImNsYXNzZWRSZW1vdmUiLCJjbGFzc2VkVHJ1ZSIsImNsYXNzZWRGYWxzZSIsImNsYXNzZWRGdW5jdGlvbiIsInNlbGVjdGlvbl9jbGFzc2VkIiwidGV4dFJlbW92ZSIsInRleHRDb25zdGFudCIsInRleHRGdW5jdGlvbiIsInNlbGVjdGlvbl90ZXh0IiwiaHRtbFJlbW92ZSIsImh0bWxDb25zdGFudCIsImh0bWxGdW5jdGlvbiIsInNlbGVjdGlvbl9odG1sIiwicmFpc2UiLCJzZWxlY3Rpb25fcmFpc2UiLCJsb3dlciIsInNlbGVjdGlvbl9sb3dlciIsInNlbGVjdGlvbl9hcHBlbmQiLCJjcmVhdGUiLCJjb25zdGFudE51bGwiLCJzZWxlY3Rpb25faW5zZXJ0IiwiYmVmb3JlIiwicmVtb3ZlIiwic2VsZWN0aW9uX3JlbW92ZSIsInNlbGVjdGlvbl9jbG9uZVNoYWxsb3ciLCJjbG9uZSIsInNlbGVjdGlvbl9jbG9uZURlZXAiLCJzZWxlY3Rpb25fY2xvbmUiLCJkZWVwIiwic2VsZWN0aW9uX2RhdHVtIiwiY29udGV4dExpc3RlbmVyIiwibGlzdGVuZXIiLCJldmVudCIsIm9uUmVtb3ZlIiwib24iLCJvIiwib25BZGQiLCJvcHRpb25zIiwic2VsZWN0aW9uX29uIiwiZGlzcGF0Y2hFdmVudCIsInBhcmFtcyIsIndpbmRvdyIsImRpc3BhdGNoQ29uc3RhbnQiLCJkaXNwYXRjaEZ1bmN0aW9uIiwic2VsZWN0aW9uX2Rpc3BhdGNoIiwic2VsZWN0aW9uX2l0ZXJhdG9yIiwicm9vdCIsInNlbGVjdGlvbl9zZWxlY3Rpb24iLCJkZWZpbmUiLCJjb25zdHJ1Y3RvciIsImZhY3RvcnkiLCJwcm90b3R5cGUiLCJleHRlbmQiLCJkZWZpbml0aW9uIiwiQ29sb3IiLCJkYXJrZXIiLCJicmlnaHRlciIsInJlSSIsInJlTiIsInJlUCIsInJlSGV4IiwicmVSZ2JJbnRlZ2VyIiwicmVSZ2JQZXJjZW50IiwicmVSZ2JhSW50ZWdlciIsInJlUmdiYVBlcmNlbnQiLCJyZUhzbFBlcmNlbnQiLCJyZUhzbGFQZXJjZW50IiwibmFtZWQiLCJjb2xvciIsImNoYW5uZWxzIiwiY29sb3JfZm9ybWF0SGV4IiwiY29sb3JfZm9ybWF0SGV4OCIsImNvbG9yX2Zvcm1hdEhzbCIsImNvbG9yX2Zvcm1hdFJnYiIsImhzbENvbnZlcnQiLCJmb3JtYXQiLCJsIiwicmdibiIsIlJnYiIsInJnYmEiLCJoc2xhIiwiciIsImciLCJyZ2JDb252ZXJ0IiwicmdiIiwib3BhY2l0eSIsImsiLCJjbGFtcGkiLCJjbGFtcGEiLCJyZ2JfZm9ybWF0SGV4IiwicmdiX2Zvcm1hdEhleDgiLCJyZ2JfZm9ybWF0UmdiIiwiaGV4IiwiaCIsInMiLCJIc2wiLCJtaW4iLCJtYXgiLCJoc2wiLCJtMiIsImhzbDJyZ2IiLCJjbGFtcGgiLCJjbGFtcHQiLCJsaW5lYXIiLCJkIiwiZXhwb25lbnRpYWwiLCJ5IiwiZ2FtbWEiLCJub2dhbW1hIiwiaW50ZXJwb2xhdGVSZ2IiLCJyZ2JHYW1tYSIsInN0YXJ0IiwiZW5kIiwiY29sb3JSZ2IiLCJpbnRlcnBvbGF0ZU51bWJlciIsInJlQSIsInJlQiIsInplcm8iLCJvbmUiLCJpbnRlcnBvbGF0ZVN0cmluZyIsImJpIiwiYW0iLCJibSIsImJzIiwicSIsIm51bWJlciIsImRlZ3JlZXMiLCJpZGVudGl0eSIsImRlY29tcG9zZSIsImUiLCJmIiwic2NhbGVYIiwic2NhbGVZIiwic2tld1giLCJzdmdOb2RlIiwicGFyc2VDc3MiLCJwYXJzZVN2ZyIsImludGVycG9sYXRlVHJhbnNmb3JtIiwicGFyc2UiLCJweENvbW1hIiwicHhQYXJlbiIsImRlZ1BhcmVuIiwicG9wIiwidHJhbnNsYXRlIiwieGEiLCJ5YSIsInhiIiwieWIiLCJyb3RhdGUiLCJzY2FsZSIsImludGVycG9sYXRlVHJhbnNmb3JtQ3NzIiwiaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmciLCJmcmFtZSIsInRpbWVvdXQiLCJpbnRlcnZhbCIsInBva2VEZWxheSIsInRhc2tIZWFkIiwidGFza1RhaWwiLCJjbG9ja0xhc3QiLCJjbG9ja05vdyIsImNsb2NrU2tldyIsImNsb2NrIiwic2V0RnJhbWUiLCJub3ciLCJjbGVhck5vdyIsIlRpbWVyIiwidGltZXIiLCJkZWxheSIsInRpbWUiLCJzbGVlcCIsInRpbWVyRmx1c2giLCJ3YWtlIiwibmFwIiwicG9rZSIsInQwIiwidDEiLCJ0MiIsImVsYXBzZWQiLCJlbXB0eU9uIiwiZW1wdHlUd2VlbiIsIkNSRUFURUQiLCJTQ0hFRFVMRUQiLCJTVEFSVElORyIsIlNUQVJURUQiLCJSVU5OSU5HIiwiRU5ESU5HIiwiRU5ERUQiLCJzY2hlZHVsZSIsImlkIiwiaW5kZXgiLCJ0aW1pbmciLCJzY2hlZHVsZXMiLCJpbml0Iiwic2VsZiIsInR3ZWVuIiwic3RvcCIsInRpY2siLCJpbnRlcnJ1cHQiLCJhY3RpdmUiLCJzZWxlY3Rpb25faW50ZXJydXB0IiwidHdlZW5SZW1vdmUiLCJ0d2VlbjAiLCJ0d2VlbjEiLCJ0d2VlbkZ1bmN0aW9uIiwidHJhbnNpdGlvbl90d2VlbiIsInR3ZWVuVmFsdWUiLCJ0cmFuc2l0aW9uIiwiaW50ZXJwb2xhdGUiLCJ2YWx1ZTEiLCJzdHJpbmcwMCIsInN0cmluZzEiLCJpbnRlcnBvbGF0ZTAiLCJzdHJpbmcwIiwic3RyaW5nMTAiLCJ0cmFuc2l0aW9uX2F0dHIiLCJhdHRySW50ZXJwb2xhdGUiLCJhdHRySW50ZXJwb2xhdGVOUyIsImF0dHJUd2Vlbk5TIiwiYXR0clR3ZWVuIiwidHJhbnNpdGlvbl9hdHRyVHdlZW4iLCJkZWxheUZ1bmN0aW9uIiwiZGVsYXlDb25zdGFudCIsInRyYW5zaXRpb25fZGVsYXkiLCJkdXJhdGlvbkZ1bmN0aW9uIiwiZHVyYXRpb25Db25zdGFudCIsInRyYW5zaXRpb25fZHVyYXRpb24iLCJlYXNlQ29uc3RhbnQiLCJ0cmFuc2l0aW9uX2Vhc2UiLCJlYXNlVmFyeWluZyIsInRyYW5zaXRpb25fZWFzZVZhcnlpbmciLCJ0cmFuc2l0aW9uX2ZpbHRlciIsIlRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uX21lcmdlIiwib25GdW5jdGlvbiIsIm9uMCIsIm9uMSIsInNpdCIsInRyYW5zaXRpb25fb24iLCJyZW1vdmVGdW5jdGlvbiIsInRyYW5zaXRpb25fcmVtb3ZlIiwidHJhbnNpdGlvbl9zZWxlY3QiLCJ0cmFuc2l0aW9uX3NlbGVjdEFsbCIsImluaGVyaXQiLCJ0cmFuc2l0aW9uX3NlbGVjdGlvbiIsInN0eWxlTnVsbCIsInN0eWxlIiwic3R5bGVNYXliZVJlbW92ZSIsImxpc3RlbmVyMCIsInRyYW5zaXRpb25fc3R5bGUiLCJzdHlsZUludGVycG9sYXRlIiwic3R5bGVUd2VlbiIsInRyYW5zaXRpb25fc3R5bGVUd2VlbiIsInRyYW5zaXRpb25fdGV4dCIsInRleHRJbnRlcnBvbGF0ZSIsInRleHRUd2VlbiIsInRyYW5zaXRpb25fdGV4dFR3ZWVuIiwidHJhbnNpdGlvbl90cmFuc2l0aW9uIiwiaWQwIiwiaWQxIiwibmV3SWQiLCJ0cmFuc2l0aW9uX2VuZCIsInJlc29sdmUiLCJyZWplY3QiLCJjYW5jZWwiLCJzZWxlY3Rpb25fcHJvdG90eXBlIiwiY3ViaWNJbk91dCIsImRlZmF1bHRUaW1pbmciLCJlYXNlQ3ViaWNJbk91dCIsInNlbGVjdGlvbl90cmFuc2l0aW9uIiwiVHJhbnNmb3JtIiwicG9pbnQiLCJsb2NhdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJlbHQiLCJmaXR0cyIsImJpZ1RhcmdldDEiLCJiaWdUYXJnZXQyIiwic21hbGxUYXJnZXQiLCJwdXJwb3NlIiwiaGljayIsImcxIiwiZzIiLCJnMyIsImc0IiwiZzUiLCJnNiIsImpha29iIiwiYXBwMSIsImFwcDIiLCJ5b3VyQXBwIiwiZ3JhZGllbnQiLCJnZXN0YWx0IiwicHJveGltaXR5Iiwib2Zmc2V0Iiwic2ltaWxhcml0eSIsIm15Q2xhc3MiLCJjb21tb25SZWdpb24iLCJzaW1wbGljaXR5IiwibWlsbGVyIiwidGVzbGVyIiwicG9zdGVsIiwiemVpZ2FybmlrIiwidm9uUmVzdG9yZmYiLCJwb2ludHMiLCJzeW1ldHJpZSIsInNlcmlhbFBvc2l0aW9uIiwiY3NzQ2xhc3MiLCJwYXJldG8iLCJwZWFrRW5kIiwiY29uZmlnIiwidmFsdWVzIiwiYWxsIiwiU1ZHVG9vbCIsIl9fcHVibGljRmllbGQiLCJjb250YWluZXIiLCJlbHROYW1lIiwiaW5pdGlhbEF0dHJpYnV0ZXMiLCJmaW5hbEF0dHJpYnV0ZXMiLCJvcHRzIiwiZDMuc2VsZWN0IiwiZDMuZWFzZUxpbmVhciIsInV4bGF3SW1hZ2VOYW1lIiwidXhsYXdDbGFzc05hbWUiLCJzdmdOYW1lIiwiY3giLCJjeSIsIndpZHRoIiwiaGVpZ2h0IiwiaW50ZW5zaXR5IiwiaW5pdFRoZW1lIiwiaGFuZGxlRGFya1RoZW1lIiwiaXNEYXJrIiwiY2wiLCJjb2xvclNjaGVtZSIsInN2Z1Rvb2wiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLEtBQU8sRUFBQyxPQUFPLE1BQU07QUFBQSxFQUFFO0FBRTNCLFNBQVNDLEtBQVc7QUFDbEIsV0FBU0MsSUFBSSxHQUFHQyxJQUFJLFVBQVUsUUFBUUMsSUFBSSxDQUFBLEdBQUlDLEdBQUdILElBQUlDLEdBQUcsRUFBRUQsR0FBRztBQUMzRCxRQUFJLEVBQUVHLElBQUksVUFBVUgsQ0FBQyxJQUFJLE9BQVFHLEtBQUtELEtBQU0sUUFBUSxLQUFLQyxDQUFDO0FBQUcsWUFBTSxJQUFJLE1BQU0sbUJBQW1CQSxDQUFDO0FBQ2pHLElBQUFELEVBQUVDLENBQUMsSUFBSTtFQUNSO0FBQ0QsU0FBTyxJQUFJQyxFQUFTRixDQUFDO0FBQ3ZCO0FBRUEsU0FBU0UsRUFBU0YsR0FBRztBQUNuQixPQUFLLElBQUlBO0FBQ1g7QUFFQSxTQUFTRyxHQUFlQyxHQUFXQyxHQUFPO0FBQ3hDLFNBQU9ELEVBQVUsT0FBTyxNQUFNLE9BQU8sRUFBRSxJQUFJLFNBQVNILEdBQUc7QUFDckQsUUFBSUssSUFBTyxJQUFJLElBQUlMLEVBQUUsUUFBUSxHQUFHO0FBRWhDLFFBREksS0FBSyxNQUFHSyxJQUFPTCxFQUFFLE1BQU0sSUFBSSxDQUFDLEdBQUdBLElBQUlBLEVBQUUsTUFBTSxHQUFHLENBQUMsSUFDL0NBLEtBQUssQ0FBQ0ksRUFBTSxlQUFlSixDQUFDO0FB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T0EsS0FBT0EsS0FBT0MsT0FBUyxHQUNwRU0sS0FBZ0IsSUFBSSxPQUFPLFdBQVdMLEtBQU9BLEtBQU9BLEtBQU9ELE9BQVMsR0FDcEVPLEtBQWUsSUFBSSxPQUFPLFVBQVVQLEtBQU9DLEtBQU9BLE9BQVMsR0FDM0RPLEtBQWdCLElBQUksT0FBTyxXQUFXUixLQUFPQyxLQUFPQSxLQUFPRCxPQUFTLEdBRXBFUyxLQUFRO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxnQkFBZ0I7QUFBQSxFQUNoQixNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxnQkFBZ0I7QUFBQSxFQUNoQixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQixZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFBQSxFQUN0QixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEs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
