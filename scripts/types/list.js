'use strict';

function List(name,data)
{
  Entry.call(this,name,data);

  this.bref  = `The {(${this.name.capitalize()})} word list.`
  this.unde  = 'Glossary'
  this.index = true;

  this.connections = function(tables)
  {
    let a = []
    for(let id in tables.lexicon){
      let term = tables.lexicon[id];
      if(term.has_tag("list") && term.has_tag(this.name)){
        a.push(term)
      }
    }
    return a;
  }

  this.indexOf = function(target)
  {
    let i = 0;
    for(let id in this.data){
      if(target.toLowerCase() == id.toLowerCase()){
        return parseInt(i)
      }
      i += 1;
    }
    return -1;
  }

  this._from_object = function()
  {
    let html = ''
    for(let id in this.data){
      html += `<ln>{*${id.capitalize()}*}: ${this.data[id]}</ln>`
    }
    return html.to_curlic()
  }

  this.toString = function()
  {
    return `<list>${Array.isArray(this.data) ? new Runic(this.data) : this._from_object()}</list>`.to_curlic();
  }
}