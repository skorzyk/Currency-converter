const Cash = props => (
  <div className="result">
    {props.title}{" "}
    <span className="cash">
      {props.cash <= 0
        ? ""
        : ((props.cash / props.ratio) * props.price).toFixed(2)}
    </span>
  </div>
);

class Exchange extends React.Component {
  state = {
    amount: "",
    product: "gas"
  };

  static defaultProps = {
    currencies: [
      { id: 1, name: "dollar", ratio: 3.6, title: "Wartość w dolarach: " },
      { id: 2, name: "euro", ratio: 4.2, title: "Wartość w euro: " },
      { id: 3, name: "pound", ratio: 4.5, title: "Wartość w funtach: " },
      { id: 4, name: "zloty", ratio: 1, title: "Wartość w złotówkach: " }
    ],
    prices: {
      electricity: 0.51,
      gas: 4.76,
      oranges: 3.79
    }
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: ""
    });
  };

  insertSuffix(select) {
    if (select === "electricity") return <em>kWh</em>;
    else if (select === "gas") return <em>litrów</em>;
    else if (select === "oranges") return <em>kilogramów</em>;
    else return null;
  }

  selectPrice(select) {
    const price = this.props.prices[select];
    return price;
  }
  render() {
    const { amount, product } = this.state;

    const calculators = this.props.currencies.map(current => (
      <Cash
        key={current.id}
        name={current.name}
        ratio={current.ratio}
        title={current.title}
        cash={amount}
        price={this.selectPrice(product)}
      />
    ));
    return (
      <div className="app">
        <label>
          Wybierz produkt:
          <select value={this.state.product} onChange={this.handleSelect}>
            <option value="electricity">prąd</option>
            <option value="gas">benzyna</option>
            <option value="oranges">pomarańcze</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="number"
            placeholder="wprowadź wartość"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          {this.insertSuffix(this.state.product)}
        </label>

        <div className="calc">{calculators}</div>
      </div>
    );
  }
}

ReactDOM.render(<Exchange />, document.getElementById("root"));
